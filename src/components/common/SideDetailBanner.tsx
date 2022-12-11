import { formatCurrency } from '@/utils/common'
import { Box, Button, Stack, SxProps, Theme, Typography } from '@mui/material'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import CardMembershipIcon from '@mui/icons-material/CardMembership'

export interface SideDetailBannerProps {
  sx?: SxProps<Theme>
  finalPrice?: number
  unitPrice?: number
  imageUrl?: string
  onBuyClick?: () => void
}

const courseIncludeList = [
  {
    icon: <OndemandVideoIcon />,
    label: 'Video theo yêu cầu',
  },
  {
    icon: <FileDownloadIcon />,
    label: 'Tài nguyên có thể tải xuống',
  },
  {
    icon: <AllInclusiveIcon />,
    label: 'Truy cập trọn đời',
  },
  {
    icon: <PhoneIphoneIcon />,
    label: 'Truy cập trên điện thoại di động và desktop',
  },
  {
    icon: <CardMembershipIcon />,
    label: 'Giấy chứng nhận hoàn thành',
  },
]

const title = 'Khóa học này bao gồm:'

export function SideDetailBanner({
  sx,
  finalPrice,
  unitPrice,
  imageUrl,
  onBuyClick,
}: SideDetailBannerProps) {
  return (
    <Box
      boxShadow={3}
      sx={{
        ...sx,
        borderRadius: 1,
        color: 'black',
        bgcolor: 'white',
        boxShadow: (theme) => theme.shadows[10],
        overflow: 'hidden',
      }}
    >
      <Box>
        <Box width="100%" component="img" alt="course" src={imageUrl} />
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{ mb: 1, textDecorationLine: 'line-through' }}
        >
          {formatCurrency(unitPrice || 0)}
        </Typography>

        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          {formatCurrency(finalPrice || 0)}
        </Typography>

        <Button size="large" fullWidth variant="contained" onClick={() => onBuyClick?.()}>
          Mua ngay
        </Button>

        <Typography variant="h5" fontWeight={700} sx={{ mt: 3, mb: 1 }}>
          {title}
        </Typography>

        <Stack spacing={1}>
          {courseIncludeList.map((item, idx) => (
            <Stack spacing={3} direction="row" alignItems="center" key={idx}>
              {item.icon}
              <Typography variant="body1">{item.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
