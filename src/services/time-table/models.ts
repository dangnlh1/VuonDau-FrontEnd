/**
 * @app VuonDau
 * @author phutruongck
 */

import {
  CommonRequest,
  CommonResponse,
  IDayOfWeek,
  SlotDow,
  ISlot,
} from '@custom-type';

export type SlotResponse = CommonResponse<ISlot[]>;
export type SlotRequest = CommonRequest<{}>;

export type DayOfWeekResponse = CommonResponse<IDayOfWeek[]>;
export type DayOfWeekRequest = CommonRequest<{}>;

export type CreateTimeTableResponse = CommonResponse<number>;
export type CreateTimeTableRequest = CommonRequest<{
  archetypeName: string;
  archetypeCode: string;
  slotDow: SlotDow[];
  classId: number;
}>;
