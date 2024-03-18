import React, { ReactNode, createContext, useEffect, useState } from 'react';

type themeType = 'light' | 'dark';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  selectTheme: (theme: themeType) => void;
}

const defaultValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
  selectTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

const getTheme = (): themeType => {
  const theme = localStorage.getItem('theme') as themeType;
  if (!theme) {
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
    return 'light';
  } else {
    document.documentElement.classList.add(theme);
    return theme;
  }
};
interface IProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: IProps) => {
  const [theme, setTheme] = useState<themeType>(getTheme);

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem('theme', theme);
    };

    refreshTheme();
  }, [theme]);

  const toggleTheme = () => {
    const selectedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(selectedTheme);
    document.documentElement.classList.add(selectedTheme);
  };

  const selectTheme = (theme: themeType) => {
    setTheme(theme);
    document.documentElement.classList.add(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, selectTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
