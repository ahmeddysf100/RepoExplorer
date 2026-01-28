import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import { AppLayout } from '@/shared/layout/AppLayout'

// Lazy load pages
const SearchPage = lazy(() => import('@/pages/SearchPage'))  
const RepoDetailPage = lazy(() => import('@/pages/RepoDetailPage'))

// Loading fallback component
function PageLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
      <CircularProgress />
    </Box>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/repo/:owner/:name" element={<RepoDetailPage />} />
          <Route path="*" element={<Navigate to="/search" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}