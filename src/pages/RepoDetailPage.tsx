import { useParams, Navigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

export function RepoDetailPage() {
  const { owner, name } = useParams()

  if (!owner || !name) {
    return <Navigate to="/search" replace />
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Repository Detail
      </Typography>
      <Typography color="text.secondary">
        {owner} / {name} — detail view placeholder.
      </Typography>
    </Box>
  )
}
