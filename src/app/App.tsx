import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useThemeStore } from '@/core/stores/themeStore'
import { lightTheme, darkTheme } from '@/app/theme'
import { AppRoutes } from '@/app/routes'

export function App() {
  const mode = useThemeStore((s) => s.mode)
  const theme = mode === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}
