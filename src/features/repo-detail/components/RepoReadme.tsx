import { Box, Card, Link, Typography } from '@mui/material'
import SubjectIcon from '@mui/icons-material/Subject'
import EditIcon from '@mui/icons-material/Edit'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface RepoReadmeProps {
  readme: string
  readmeUrl: string
}

export function RepoReadme({ readme, readmeUrl }: RepoReadmeProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 2,
        overflow: 'hidden',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SubjectIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography fontWeight="600">README.md</Typography>
        </Box>
        <Link
          href={readmeUrl}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          aria-label="View raw README"
        >
          <EditIcon fontSize="small" />
        </Link>
      </Box>
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          '& h1': { fontSize: '1.5rem', fontWeight: 700, mt: 2, mb: 1 },
          '& h2': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1 },
          '& h3': { fontSize: '1.1rem', fontWeight: 600, mt: 1.5, mb: 0.5 },
          '& p': { mb: 1.5 },
          '& ul': { pl: 3, mb: 1.5 },
          '& ol': { pl: 3, mb: 1.5 },
          '& pre': {
            bgcolor: (t) => (t.palette.mode === 'dark' ? 'grey.800' : 'grey.100'),
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            mb: 1.5,
          },
          '& code': { fontFamily: 'monospace', fontSize: '0.9em' },
          '& pre code': { bgcolor: 'transparent', p: 0 },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
      </Box>
    </Card>
  )
}
