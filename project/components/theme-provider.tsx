"use client"

import * as React from "react"

const ThemeContext = React.createContext({
  theme: null,
  setTheme: (theme: string | null) => {},
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<string | null>(null)

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    setTheme(storedTheme || "light")
  }, [])

  React.useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme)
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

const useTheme = () => React.useContext(ThemeContext)

export { ThemeProvider, useTheme }

