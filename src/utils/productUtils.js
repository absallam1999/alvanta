// Utility functions for product data
export const productUtils = {
  // Filter products by season
  filterBySeason(products, currentSeason) {
    if (!currentSeason || !products) return products;

    return products.filter((product) => {
      if (!product.seasons) return true;

      const { peak, available, bestMonths } = product.seasons;
      const currentMonth = new Date().getMonth() + 1;

      return (
        peak?.includes(currentSeason) ||
        available?.toLowerCase() === 'year-round' ||
        bestMonths?.includes(currentMonth)
      );
    });
  },

  searchHome(products, query) {
    if (!query || !products || !Array.isArray(products)) {
      return [];
    }

    if (products.length === 0) {
      return [];
    }

    const lowerQuery = query.toLowerCase().trim();

    const results = products.filter((product, index) => {
      if (!product || typeof product !== 'object') {
        return false;
      }

      // Check if product has searchable fields
      const name = product.name || '';
      const description = product.description || '';
      const variety = product.variety || '';
      const category = product.category || '';

      // Search in multiple fields
      const nameMatch = name.toLowerCase().includes(lowerQuery);
      const descMatch = description.toLowerCase().includes(lowerQuery);
      const varietyMatch = variety.toLowerCase().includes(lowerQuery);
      const categoryMatch = category.toLowerCase().includes(lowerQuery);

      const isMatch = nameMatch || descMatch || varietyMatch || categoryMatch;

      return isMatch;
    });

    return results;
  },

  // Search products by name or description
  searchProducts(products, query) {
    if (!query || !products) return products;

    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name?.toLowerCase().includes(lowerQuery) ||
        product.description?.toLowerCase().includes(lowerQuery) ||
        product.variety?.toLowerCase().includes(lowerQuery)
    );
  },

  // Sort products by various criteria
  sortProducts(products, sortBy = 'name') {
    if (!products) return products;

    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name?.localeCompare(b.name);

        case 'season':
          return this.getSeasonPriority(a) - this.getSeasonPriority(b);

        case 'peak-season':
          const aIsPeak =
            this.isInSeason(a) && this.getSeasonStatus(a).type === 'best-month';
          const bIsPeak =
            this.isInSeason(b) && this.getSeasonStatus(b).type === 'best-month';
          if (aIsPeak && !bIsPeak) return -1;
          if (!aIsPeak && bIsPeak) return 1;
          return this.getSeasonPriority(a) - this.getSeasonPriority(b);

        case 'year-round':
          const aIsYearRound =
            a.seasons?.available?.toLowerCase() === 'year-round';
          const bIsYearRound =
            b.seasons?.available?.toLowerCase() === 'year-round';
          if (aIsYearRound && !bIsYearRound) return -1;
          if (!aIsYearRound && bIsYearRound) return 1;
          return a.name?.localeCompare(b.name);

        default:
          return 0;
      }
    });
  },

  // Get season priority for sorting
  getSeasonPriority(product) {
    if (!product.seasons) return 999;

    const currentMonth = new Date().getMonth() + 1;
    const { bestMonths, peak } = product.seasons;

    if (bestMonths?.includes(currentMonth)) return 1;
    if (peak?.some((season) => this.isCurrentSeason(season))) return 2;

    return 3;
  },

  isCurrentSeason(season) {
    const currentMonth = new Date().getMonth() + 1;
    const seasonMap = {
      spring: [3, 4, 5],
      summer: [6, 7, 8],
      fall: [9, 10, 11],
      winter: [12, 1, 2],
    };

    return seasonMap[season.toLowerCase()]?.includes(currentMonth) || false;
  },

  // Get featured products with fallback
  getFeaturedProducts(categoryData) {
    return categoryData?.featured || categoryData?.products?.slice(0, 2) || [];
  },

  // Format price for display
  formatPrice(priceRange, format = 'wholesale') {
    if (!priceRange) return 'Price on request';

    const price = priceRange[format] || priceRange.wholesale;
    return price || 'Contact for pricing';
  },

  // if product is available
  isProductAvailable(product) {
    if (!product.seasons) return true;

    const { available, bestMonths } = product.seasons;
    const currentMonth = new Date().getMonth() + 1;

    return (
      available?.toLowerCase() === 'year-round' ||
      bestMonths?.includes(currentMonth)
    );
  },

  isInSeason(product) {
    if (!product?.seasons) return true;

    const { peak, available, bestMonths } = product.seasons;
    const currentMonth = new Date().getMonth() + 1;

    // Check if available year-round
    if (available?.toLowerCase() === 'year-round') {
      return true;
    }

    if (bestMonths && Array.isArray(bestMonths)) {
      if (bestMonths.includes(currentMonth)) {
        return true;
      }
    }

    // Check peak seasons
    if (peak && Array.isArray(peak)) {
      if (peak.some((season) => this.isCurrentSeason(season))) {
        return true;
      }
    }

    // Check available range
    if (available && typeof available === 'string' && available.includes('-')) {
      return this.isInAvailableRange(available);
    }

    return false;
  },

  // Get current season based on month
  getCurrentSeason() {
    const currentMonth = new Date().getMonth() + 1;

    if (currentMonth >= 3 && currentMonth <= 5) return 'Spring';
    if (currentMonth >= 6 && currentMonth <= 8) return 'Summer';
    if (currentMonth >= 9 && currentMonth <= 11) return 'Fall';
    return 'Winter';
  },

  // Check if a season matches current season
  isCurrentSeason(season) {
    const currentSeason = this.getCurrentSeason();
    return season.toLowerCase() === currentSeason.toLowerCase();
  },

  // Check if current month is within available range (e.g., "August-March")
  isInAvailableRange(availableRange) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const [startMonth, endMonth] = availableRange
      .split('-')
      .map((m) => m.trim());
    const currentMonth = new Date().getMonth();

    const startIndex = monthNames.findIndex((m) =>
      m.toLowerCase().startsWith(startMonth.toLowerCase())
    );
    const endIndex = monthNames.findIndex((m) =>
      m.toLowerCase().startsWith(endMonth.toLowerCase())
    );

    if (startIndex === -1 || endIndex === -1) return false;

    // Handle ranges that cross year boundary (e.g., August-March)
    if (startIndex > endIndex) {
      return currentMonth >= startIndex || currentMonth <= endIndex;
    } else {
      return currentMonth >= startIndex && currentMonth <= endIndex;
    }
  },

  // Get season status with more detailed information
  getSeasonStatus(product) {
    if (!product?.seasons) {
      return { inSeason: true, status: 'Available', type: 'year-round' };
    }

    const { peak, available, bestMonths } = product.seasons;
    const currentMonth = new Date().getMonth() + 1;
    const currentSeason = this.getCurrentSeason();

    // Check availability year-round
    if (available?.toLowerCase() === 'year-round') {
      return { inSeason: true, status: 'Year-Round', type: 'year-round' };
    }

    // Check best months
    if (bestMonths && bestMonths.includes(currentMonth)) {
      return { inSeason: true, status: 'Peak Season', type: 'best-month' };
    }

    // Check peak seasons
    if (peak && peak.some((season) => this.isCurrentSeason(season))) {
      return { inSeason: true, status: 'In Season', type: 'peak-season' };
    }

    // Check available range
    if (available && this.isInAvailableRange(available)) {
      return { inSeason: true, status: 'Available', type: 'available-range' };
    }

    // Not in season
    const nextAvailable = this.getNextAvailableInfo(product);
    return {
      inSeason: false,
      status: 'Out of Season',
      type: 'out-of-season',
      nextAvailable: nextAvailable,
    };
  },

  // Get next available information for out-of-season products
  getNextAvailableInfo(product) {
    if (!product?.seasons) return 'Check availability';

    const { peak, available, bestMonths } = product.seasons;
    const currentMonth = new Date().getMonth() + 1;

    if (available?.toLowerCase() === 'year-round') {
      return 'Available year-round';
    }

    // Find next best month
    if (bestMonths && bestMonths.length > 0) {
      const sortedMonths = [...bestMonths].sort((a, b) => a - b);
      const nextMonth =
        sortedMonths.find((month) => month > currentMonth) || sortedMonths[0];
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return `Available in ${monthNames[nextMonth - 1]}`;
    }

    // Find next peak season
    if (peak && peak.length > 0) {
      const seasonOrder = ['Spring', 'Summer', 'Fall', 'Winter'];
      const currentSeason = this.getCurrentSeason();
      const currentSeasonIndex = seasonOrder.indexOf(currentSeason);

      for (let i = 1; i <= 4; i++) {
        const nextSeasonIndex = (currentSeasonIndex + i) % 4;
        const nextSeason = seasonOrder[nextSeasonIndex];
        if (peak.some((p) => p.toLowerCase() === nextSeason.toLowerCase())) {
          return `Available in ${nextSeason}`;
        }
      }
    }

    // Check available range
    if (available && available.includes('-')) {
      return `Available ${available}`;
    }

    return 'Check availability';
  },

  // Get detailed season information for display
  getSeasonDetails(product) {
    if (!product?.seasons) {
      return {
        status: 'Available',
        description: 'Product is available throughout the year',
        isAvailable: true,
      };
    }

    const { peak, available, bestMonths, harvestMonths } = product.seasons;
    const seasonStatus = this.getSeasonStatus(product);

    let description = '';

    if (seasonStatus.inSeason) {
      if (peak && peak.length > 0) {
        description = `Peak season: ${peak.join(', ')}`;
      } else if (bestMonths && bestMonths.length > 0) {
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        const bestMonthNames = bestMonths.map((month) => monthNames[month - 1]);
        description = `Best quality: ${bestMonthNames.join(', ')}`;
      } else if (available) {
        description = `Available: ${available}`;
      }
    } else {
      description = seasonStatus.nextAvailable || 'Currently out of season';
    }

    return {
      ...seasonStatus,
      description,
      peakSeasons: peak,
      availableMonths: available,
      bestMonths: bestMonths,
      harvestMonths: harvestMonths,
    };
  },
};
