import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/shared/layout/AppLayout'
import { SearchPage } from '@/pages/SearchPage'
import { RepoDetailPage } from '@/pages/RepoDetailPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/repo/:owner/:name" element={<RepoDetailPage />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Route>
    </Routes>
  )
}
