import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

const ThemeContext = createContext();

// Helper function to get system theme
const getSystemTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or system preference
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') {
      return 'system';
    }

    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved;
    }

    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return getSystemTheme();
  });

  // Apply theme to document
  const applyTheme = useCallback((newTheme) => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    const systemTheme = getSystemTheme();

    // Remove all theme classes and attributes
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');

    let actualTheme;

    if (newTheme === 'system') {
      actualTheme = systemTheme;
      setResolvedTheme(systemTheme);
    } else {
      actualTheme = newTheme;
      setResolvedTheme(newTheme);
    }

    // Apply the actual theme
    root.classList.add(actualTheme);
    root.setAttribute('data-theme', actualTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    }
    // Legacy Safari
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [theme, applyTheme]);

  // Set theme with validation
  const setTheme = useCallback((newTheme) => {
    if (['light', 'dark', 'system'].includes(newTheme)) {
      setThemeState(newTheme);
    } else {
      console.warn(
        'Invalid theme: ' + newTheme + '. Must be one of: light, dark, system'
      );
    }
  }, []);

  const value = {
    theme,
    setTheme,
    resolvedTheme,
  };

  // Use React.createElement instead of JSX
  return React.createElement(ThemeContext.Provider, { value: value }, children);
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
