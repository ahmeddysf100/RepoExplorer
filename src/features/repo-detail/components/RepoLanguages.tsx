import { Box, Card, Typography } from '@mui/material'
import { langColor } from '@/core'
import type { LanguageWithPercent } from '@/core/types/repo.types'
import { memo } from 'react'

interface RepoLanguagesProps {
  languages: LanguageWithPercent[]
}

export const RepoLanguages = memo(function RepoLanguages({ languages }: RepoLanguagesProps) {
  if (languages.length === 0) return null
  // console.log("render repo languages", languages)
  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider' }}>
      <Typography
        variant="caption"
        fontWeight="600"
        color="text.secondary"
        sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 1.5 }}
      >
        Languages
      </Typography>
      <Box
        sx={{
          height: 8,
          width: '100%',
          display: 'flex',
          borderRadius: '9999px',
          overflow: 'hidden',
          bgcolor: (t) => (t.palette.mode === 'dark' ? 'grey.800' : 'grey.200'),
          mb: 2,
        }}
      >
        {languages.map((lang, i) => (
          <Box
            key={lang.name}
            sx={{
              width: `${lang.percent}%`,
              bgcolor: langColor(lang.name),
              borderRadius:
                i === 0
                  ? '9999px 0 0 9999px'
                  : i === languages.length - 1
                    ? '0 9999px 9999px 0'
                    : 0,
            }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {languages.map((lang) => (
          <Box
            key={lang.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.875rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: langColor(lang.name),
                }}
              />
              <Typography variant="body2" fontWeight="500">
                {lang.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {lang.percent}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
})
