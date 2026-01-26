import { createTheme } from '@mui/material/styles'

const primary = '#2563eb'
const darkPrimary = '#60a5fa'
const backgroundLight = '#f9fafb'
const backgroundDark = '#0f172a'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: primary },
    background: {
      default: backgroundLight,
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  shape: { borderRadius: 8 },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: darkPrimary },
    background: {
      default: backgroundDark,
      paper: '#1e293b',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  shape: { borderRadius: 8 },
})
