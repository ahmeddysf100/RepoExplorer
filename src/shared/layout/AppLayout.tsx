import { Outlet } from 'react-router-dom'
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'

export function AppLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            component={RouterLink}
            to="/search"
            color="inherit"
            underline="none"
          >
            <Typography variant="h6">RepoExplorer</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
