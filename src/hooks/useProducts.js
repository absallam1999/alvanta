import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export const useProducts = (category) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!category) return;

    setLoading(true);
    setError(null);

    try {
      const result = await productService.fetchProducts(category);
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error in useProducts:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    productService.clearCache(category);
    fetchData();
  }, [category, fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export const useProductById = (productId) => {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await productService.fetchProductById(productId);
        setProduct(result.product);
        setCategory(result.category);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return {
    product,
    category,
    loading,
    error,
  };
};

export const useRelatedProducts = (currentProductId, category, limit = 3) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentProductId || !category) {
      setLoading(false);
      return;
    }

    const fetchRelatedProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const normalizedCategory = category.toLowerCase();
        const categoryData =
          await productService.fetchProducts(normalizedCategory);

        if (!categoryData || typeof categoryData !== 'object') {
          setRelatedProducts([]);
          return;
        }

        const featuredProducts = categoryData.featured || [];
        const regularProducts = categoryData.products || [];
        const allProducts = [...featuredProducts, ...regularProducts];

        if (allProducts.length > 0) {
          const filtered = allProducts.filter(
            (product) =>
              product && product.id && product.id !== currentProductId
          );

          if (filtered.length === 0) {
            setRelatedProducts([]);
            return;
          }

          const uniqueProducts = filtered.filter(
            (product, index, self) =>
              index === self.findIndex((p) => p.id === product.id)
          );

          const shuffled = [...uniqueProducts].sort(() => 0.5 - Math.random());
          const limited = shuffled.slice(0, limit);

          setRelatedProducts(limited);
        } else {
          setRelatedProducts([]);
        }
      } catch (err) {
        setError(err.message);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, category, limit]);

  return {
    relatedProducts,
    loading,
    error,
  };
};

export const useAllCategories = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await productService.fetchAllCategories();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

// Preload hook for critical data
export const usePreloadProducts = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    const preload = async () => {
      try {
        await productService.preloadData();
        setIsPreloaded(true);
      } catch (error) {
        console.warn('Preloading failed:', error);
      }
    };

    preload();
  }, []);

  return isPreloaded;
};
