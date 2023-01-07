import { ListWidthCollapse } from '@/components/common/ListWidthCollapse'
import { Resource } from '@/models/class'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

export interface CourseContentProps {
  resourceList?: Resource[]
  title?: string
  onItemClick?: (id: number) => void
}

export function CourseContent({ resourceList, title, onItemClick }: CourseContentProps) {
  function handleRedirectLink(link: string) {
    window.open(link, '_blank')
  }
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Stack sx={{ background: '#fff' }}>
        {Array.isArray(resourceList) &&
          resourceList.length > 0 &&
          resourceList?.map((item, idx) => (
            <ListWidthCollapse title={item.name} key={idx} onItemClick={() => onItemClick?.(idx)}>
              {item.modules?.map((item, idx) => (
                <List component="div" disablePadding key={idx}>
                  <ListItemButton onClick={() => handleRedirectLink(item.url)} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <OndemandVideoIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </List>
              ))}
            </ListWidthCollapse>
          ))}
      </Stack>
    </Box>
  )
}
