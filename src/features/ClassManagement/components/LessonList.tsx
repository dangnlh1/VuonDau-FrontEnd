import { ListWidthCollapse } from '@/components/common/ListWidthCollapse'
import { Resource } from '@/models/class'
import { List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'

export interface LessonListProps {
  resourceList?: Resource[]
  onItemClick?: (idx: number) => void
}
export function LessonList({ resourceList, onItemClick }: LessonListProps) {
  return (
    <Stack>
      {Array.isArray(resourceList) &&
        resourceList.length > 0 &&
        resourceList?.map((item, idx) => (
          <ListWidthCollapse title={item.name} key={idx} onItemClick={() => onItemClick?.(idx)}>
            {item.modules?.map((item, idx) => (
              <List component="div" disablePadding key={idx}>
                <ListItemButton sx={{ pl: 4 }}>
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
  )
}
