import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

export function RepoDetailPage() {
  const { owner, name } = useParams<{ owner: string; name: string }>()

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
