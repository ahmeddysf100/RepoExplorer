import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchInputProps {
  value: string
  onChange: (v: string) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  placeholder?: string
  disabled?: boolean
}

export function SearchInput({
  value,
  onChange,
  onKeyDown,
  placeholder = 'Search for repositories (e.g. facebook/react)...',
  disabled = false,
}: SearchInputProps) {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      size="medium"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
        sx: {
          borderRadius: 1,
          bgcolor: (t) =>
            t.palette.mode === 'dark' ? 'grey.800' : 'background.paper',
          '& fieldset': { borderColor: 'divider' },
          '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: 2 },
          '&:hover fieldset': { borderColor: 'primary.main' },
          height: '60px',
        },
      }}
      inputProps={{ sx: { py: 1.5, fontSize: '1rem' } }}
    />
  )
}
