import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
export interface ForumSearchBarProps {
  searchLabel: string
  onCreateQuestion: () => void
  onSearchQuestion: (value: string) => void
}

export default function ForumSearchBar(props: ForumSearchBarProps) {
  const [value, setValue] = useState('')

  const { searchLabel, onCreateQuestion, onSearchQuestion } = props

  function handleSearchQuestion() {
    onSearchQuestion(value)
  }
  function handleChangeValue(event: any) {
    setValue(event.target.value)
  }
  return (
    <Stack direction={'row'} marginTop={1} sx={{ alignItems: 'center' }}>
      <Stack
        sx={{
          flexGrow: 1,
          flexDirection: 'row',
          borderRadius: 10,
          boxShadow: 3,
          background: '#fff',
          margin: 1,
          paddingLeft: 3,
        }}
      >
        <Stack flexGrow={1} marginRight={1} sx={{ height: '100%' }}>
          <TextField
            value={value}
            sx={{ borderColor: 'transparent', paddingTop: 1 }}
            onChange={handleChangeValue}
            placeholder={searchLabel}
            variant="standard"
            size="medium"
            InputProps={{ disableUnderline: true }}
          />
        </Stack>
        <Stack marginRight={1}>
          <IconButton
            sx={{ background: '#000', margin: 1, width: '25px', height: '25px' }}
            onClick={handleSearchQuestion}
          >
            <SearchIcon fontSize="small" sx={{ color: '#fff' }} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack marginRight={1}>
        <Button variant="contained" onClick={onCreateQuestion}>
          <AddIcon />
          Tạo Câu Hỏi
        </Button>
      </Stack>
    </Stack>
  )
}
