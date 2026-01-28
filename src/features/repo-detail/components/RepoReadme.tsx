import { Box, Card, Link, Typography } from '@mui/material'
import SubjectIcon from '@mui/icons-material/Subject'
import EditIcon from '@mui/icons-material/Edit'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { memo } from 'react'

interface RepoReadmeProps {
  readme: string
  readmeUrl: string
}

export const RepoReadme = memo(function RepoReadme({ readme, readmeUrl }: RepoReadmeProps) {
  // console.log("render repo readme", readmeUrl)
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
          color: 'text.primary',
          fontSize: '16px',
          lineHeight: 1.6,
          '& *:first-of-type': { mt: 0 },
          '& *:last-of-type': { mb: 0 },
          // Headings
          '& h1': {
            fontSize: '2em',
            fontWeight: 600,
            mt: 3,
            mb: 1,
            pb: '0.3em',
            borderBottom: '1px solid',
            borderColor: 'divider',
            lineHeight: 1.25,
          },
          '& h2': {
            fontSize: '1.5em',
            fontWeight: 600,
            mt: 3,
            mb: 1,
            pb: '0.3em',
            borderBottom: '1px solid',
            borderColor: 'divider',
            lineHeight: 1.25,
          },
          '& h3': {
            fontSize: '1.25em',
            fontWeight: 600,
            mt: 2,
            mb: 1,
            lineHeight: 1.25,
          },
          '& h4': {
            fontSize: '1em',
            fontWeight: 600,
            mt: 2,
            mb: 1,
            lineHeight: 1.25,
          },
          '& h5': {
            fontSize: '0.875em',
            fontWeight: 600,
            mt: 2,
            mb: 1,
            lineHeight: 1.25,
          },
          '& h6': {
            fontSize: '0.85em',
            fontWeight: 600,
            mt: 2,
            mb: 1,
            color: 'text.secondary',
            lineHeight: 1.25,
          },
          // Paragraphs
          '& p': {
            mb: 1.6,
            lineHeight: 1.6,
          },
          // Lists
          '& ul, & ol': {
            mb: 1.6,
            pl: 2,
            '& li': {
              mb: 0.5,
              lineHeight: 1.6,
              '& p': { mb: 0.5 },
              '& ul, & ol': { mt: 0.5, mb: 0 },
            },
          },
          '& ul': {
            listStyleType: 'disc',
            '& ul': { listStyleType: 'circle' },
            '& ul ul': { listStyleType: 'square' },
          },
          '& ol': {
            listStyleType: 'decimal',
          },
          // Links
          '& a': {
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
          // Code blocks
          '& pre': {
            bgcolor: (t) => (t.palette.mode === 'dark' ? '#161b22' : '#f6f8fa'),
            p: 2.5,
            borderRadius: 1,
            overflow: 'auto',
            mb: 1.6,
            fontSize: '0.875em',
            lineHeight: 1.45,
            border: '1px solid',
            borderColor: 'divider',
            fontFamily: '"SFMono-Regular", "SF Mono", Menlo, Consolas, "Liberation Mono", "Courier New", monospace',
            '& code': {
              display: 'block',
              padding: 0,
              margin: 0,
              overflow: 'visible',
              wordWrap: 'normal',
              bgcolor: 'transparent',
              border: 'none',
              borderRadius: 0,
              fontFamily: 'inherit',
            },
          },
          // Inline code
          '& code': {
            fontFamily: '"SFMono-Regular", "SF Mono", Menlo, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '0.85em',
            bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(110, 118, 129, 0.4)' : 'rgba(175, 184, 193, 0.2)'),
            padding: '0.2em 0.4em',
            borderRadius: '3px',
            whiteSpace: 'nowrap',
          },
          '& pre code': {
            whiteSpace: 'pre',
            wordBreak: 'normal',
            overflowWrap: 'normal',
            fontFamily: 'inherit',
          },
          // Blockquotes
          '& blockquote': {
            pl: 2,
            ml: 0,
            mb: 1.6,
            borderLeft: '4px solid',
            borderColor: 'divider',
            color: 'text.secondary',
            '& > :first-of-type': { mt: 0 },
            '& > :last-of-type': { mb: 0 },
          },
          // Tables
          '& table': {
            display: 'block',
            width: '100%',
            overflow: 'auto',
            mb: 1.6,
            borderCollapse: 'collapse',
            '& th, & td': {
              padding: '6px 13px',
              border: '1px solid',
              borderColor: 'divider',
            },
            '& th': {
              fontWeight: 600,
              bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(110, 118, 129, 0.1)' : 'rgba(208, 215, 222, 0.3)'),
            },
            '& tr:nth-of-type(2n)': {
              bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(110, 118, 129, 0.05)' : 'transparent'),
            },
          },
          // Images
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            mb: 1.6,
            borderRadius: 1,
          },
          // Horizontal rules
          '& hr': {
            height: '0.25em',
            bgcolor: (t) => (t.palette.mode === 'dark' ? '#21262d' : '#d0d7de'),
            border: 0,
            mb: 1.6,
            mt: 2.4,
            borderRadius: 1,
          },
          // Task lists (from remark-gfm)
          '& input[type="checkbox"]': {
            mr: 1,
            mt: 0.25,
          },
          // Strong and emphasis
          '& strong': {
            fontWeight: 600,
          },
          '& em': {
            fontStyle: 'italic',
          },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
      </Box>
    </Card>
  )
})
