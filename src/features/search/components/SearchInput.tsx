import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  disabled?: boolean
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search repositories…',
  disabled = false,
}: SearchInputProps) {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}
