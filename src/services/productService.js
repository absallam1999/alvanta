// Product data service
class ProductService {
  constructor() {
    this.cache = new Map();
    this.isFetching = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
  }

  // Main method to fetch product data
  async fetchProducts(category) {
    const cacheKey = `products-${category}`;
    const now = Date.now();

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && now - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    // Prevent duplicate requests
    if (this.isFetching.get(cacheKey)) {
      return this.waitForFetch(cacheKey);
    }

    this.isFetching.set(cacheKey, true);

    try {
      const data = await this.fetchFromServer(category);

      // Cache the successful response
      this.cache.set(cacheKey, {
        data,
        timestamp: now,
      });

      return data;
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
      throw error;
    } finally {
      this.isFetching.set(cacheKey, false);
    }
  }

  // Fetch specific product by ID
  async fetchProductById(productId) {
    const categories = ['vegetables', 'fruits', 'crops'];

    // Check cache first
    const cacheKey = `product-${productId}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached.data;
    }

    // Search through categories
    for (const category of categories) {
      try {
        const categoryData = await this.fetchProducts(category);
        const product = this.findProductInCategory(categoryData, productId);

        if (product) {
          // Caching
          this.cache.set(cacheKey, {
            data: { product, category: categoryData.category },
            timestamp: Date.now(),
          });
          return { product, category: categoryData.category };
        }
      } catch (error) {
        console.warn(
          `Error searching ${category} for product ${productId}:`,
          error
        );
      }
    }

    throw new Error(`Product with ID ${productId} not found`);
  }

  // Fetch all categories at once
  async fetchAllCategories() {
    const cacheKey = 'all-categories';
    const now = Date.now();

    const cached = this.cache.get(cacheKey);
    if (cached && now - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const [vegetables, fruits, crops] = await Promise.all([
        this.fetchProducts('vegetables'),
        this.fetchProducts('fruits'),
        this.fetchProducts('crops'),
      ]);

      const data = { vegetables, fruits, crops };

      this.cache.set(cacheKey, {
        data,
        timestamp: now,
      });

      return data;
    } catch (error) {
      console.error('Error fetching all categories:', error);
      throw error;
    }
  }

  // Preload data for better performance
  async preloadData() {
    const categories = ['vegetables', 'fruits', 'crops'];
    const preloadPromises = categories.map((category) =>
      this.fetchProducts(category).catch((error) => {
        console.warn(`Preload failed for ${category}:`, error);
        return null;
      })
    );

    await Promise.all(preloadPromises);
  }

  async fetchFromServer(category) {
    const response = await fetch(`/data/${category}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=300', // 5 minutes
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate data structure
    if (!this.validateProductData(data)) {
      throw new Error(`Invalid data structure for ${category}`);
    }

    return data;
  }

  // Clear cache
  clearCache(category = null) {
    if (category) {
      const keysToDelete = [];
      for (const [key] of this.cache) {
        if (key.includes(category)) {
          keysToDelete.push(key);
        }
      }
      keysToDelete.forEach((key) => this.cache.delete(key));
    } else {
      this.cache.clear();
    }
  }

  validateProductData(data) {
    return (
      data &&
      typeof data === 'object' &&
      data.category &&
      Array.isArray(data.products)
    );
  }

  findProductInCategory(categoryData, productId) {
    // Search in featured products
    if (categoryData.featured) {
      const featuredProduct = categoryData.featured.find(
        (p) => p.id === productId
      );
      if (featuredProduct) return featuredProduct;
    }

    // Search in regular products
    return categoryData.products.find((p) => p.id === productId);
  }

  async waitForFetch(cacheKey) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (!this.isFetching.get(cacheKey)) {
          clearInterval(checkInterval);
          const cached = this.cache.get(cacheKey);
          resolve(cached ? cached.data : null);
        }
      }, 50);
    });
  }
}

// Create singleton instance
export const productService = new ProductService();
