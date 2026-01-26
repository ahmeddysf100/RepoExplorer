import { Outlet } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ExploreIcon from '@mui/icons-material/Explore'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useThemeStore } from '@/core/stores/themeStore'

function NavBar() {
  const mode = useThemeStore((s) => s.mode)
  const toggle = useThemeStore((s) => s.toggle)

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        color: 'text.primary',
        bgcolor: (t) =>
          t.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.85)'
            : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1280,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
        }}
      >
        <Link
          component={RouterLink}
          to="/search"
          color="inherit"
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 'auto' }}
        >
          <ExploreIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h6" fontWeight="bold" letterSpacing="-0.02em">
            RepoExplorer
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={toggle}
            aria-label={mode === 'dark' ? 'Light mode' : 'Dark mode'}
            sx={{ color: 'text.secondary' }}
          >
            {mode === 'dark' ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
          <Link
            href="#"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              alignItems: 'center',
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              '&:hover': { color: 'primary.main' },
            }}
          >
            Docs
          </Link>
          <IconButton
            component="a"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            sx={{ color: 'text.secondary' }}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        mt: 10,
        py: 6,
        bgcolor: (t) =>
          t.palette.mode === 'dark' ? 'grey.900' : 'background.paper',
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ExploreIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          <Typography fontWeight="bold" color="text.primary">
            RepoExplorer
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} RepoExplorer. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link href="#" color="text.secondary" variant="body2" underline="hover" sx={{ '&:hover': { color: 'primary.main' } }}>
            Privacy
          </Link>
          <Link href="#" color="text.secondary" variant="body2" underline="hover" sx={{ '&:hover': { color: 'primary.main' } }}>
            Terms
          </Link>
          <Link href="#" color="text.secondary" variant="body2" underline="hover" sx={{ '&:hover': { color: 'primary.main' } }}>
            API Status
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export function AppLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          flex: 1,
          maxWidth: 1280,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: 6,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
