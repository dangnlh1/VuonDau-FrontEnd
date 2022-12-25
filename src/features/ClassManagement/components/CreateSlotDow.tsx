import { SelectCustom } from '@/components/FormFields/SelectCustom'
import { DayOfWeek } from '@/models/dayOfWeek'
import { Slot } from '@/models/slot'
import { SlotDow } from '@/models/timeTable'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export interface CreateSlotDowProps {
  slotInWeek: number
  slotList: Slot[]
  dayList: DayOfWeek[]
  onSlotDowChange?: (slotDow: SlotDow[]) => void
}

export function CreateSlotDow({
  slotInWeek,
  slotList,
  dayList,
  onSlotDowChange,
}: CreateSlotDowProps) {
  const [slotDowList, setSlotDowList] = useState<SlotDow[]>([])

  useEffect(() => {
    setSlotDowList(
      [...Array(slotInWeek)].map((item, idx) => ({
        slotNumber: idx + 1,
        slotId: 0,
        dayOfWeekId: 0,
      }))
    )
  }, [slotInWeek])

  useEffect(() => {
    onSlotDowChange?.(slotDowList)
  }, [slotDowList])

  function handleSlotChange(e: any, idx: number) {
    const newSlotDowList = [...slotDowList]
    newSlotDowList[idx].slotId = e.target.value
    setSlotDowList(newSlotDowList)
  }

  function handleDayChange(e: any, idx: number) {
    const newSlotDowList = [...slotDowList]
    newSlotDowList[idx].dayOfWeekId = e.target.value
    setSlotDowList(newSlotDowList)
  }

  return (
    <Stack direction="row" flexWrap="wrap" sx={{ mx: -2 }}>
      {[...Array(slotInWeek)].map((item, idx) => (
        <Box key={idx} sx={{ width: 1 / 2 }}>
          <Stack sx={{ p: 2 }}>
            <Typography variant="body1" fontWeight={500}>
              Ngày {idx + 1}
            </Typography>

            <Box>
              <SelectCustom
                label="Thời gian học"
                currentValue={slotDowList[idx]?.slotId || ''}
                optionList={slotList.map((slot) => ({
                  label: `${slot.name} (${slot.startTime} ${slot.endTime})`,
                  value: slot.id,
                }))}
                onChange={(e) => handleSlotChange(e, idx)}
              />
            </Box>

            <Box>
              <SelectCustom
                currentValue={slotDowList[idx]?.dayOfWeekId || ''}
                label="Ngày trong tuần"
                optionList={dayList?.map((day) => ({
                  label: day.name,
                  value: day.id,
                }))}
                onChange={(e) => handleDayChange(e, idx)}
              />
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}
