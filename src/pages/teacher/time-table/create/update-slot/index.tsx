/**
 * @app VuonDau
 * @author phutruongck
 */

import React, {useImperativeHandle, useRef, useMemo} from 'react';
import {Button, ButtonToolbar} from 'rsuite';
import {Modal, ModalRef} from '@/components/modal';
import {STATUS_CODES} from '@/common/constants';
import {useMemoriedSelector} from '@/hooks';
import {
  FormInputNumber,
  FormProvider,
  Dropdown,
  useForm,
} from '@/components/react-hook-form';
import {SlotDow} from '@custom-type';
import {
  selectors as timeTableSelectors,
  models as timeTableModels,
} from '@/ducks/time-table';
import {
  convertResponseToDropdown,
  convertResponseData,
} from '@/common/function';
import {DefaultValues, initDefaultValues} from './init-data';
import {validationSchema} from './validations';
import './styles.scss';

interface Props {
  setSlotDow: Function;
}

export interface UpdateSlotRef {
  onClose: Function;
  onOpen: Function;
}

const UpdateSlotModal = React.forwardRef(({setSlotDow}: Props, ref) => {
  const modalRef = useRef<ModalRef>();
  const currentItem = useRef<any>();

  const dayOfWeekResponse: timeTableModels.DayOfWeekResponse =
    useMemoriedSelector(timeTableSelectors.dayOfWeek).response;

  const slotResponse: timeTableModels.SlotResponse = useMemoriedSelector(
    timeTableSelectors.slot,
  ).response;

  const slotDropdown = useMemo(() => {
    if (slotResponse.status === STATUS_CODES.OK) {
      const data = slotResponse.data;
      let dropdown: any[] = [];
      if (data && Array.isArray(data)) {
        const mapData = data.map((i) => ({
          id: i.id,
          name: `${i.name}, ${i.startTime} - ${i.endTime}`,
        }));
        const res = convertResponseData(mapData, ['id', 'name']);
        dropdown = convertResponseToDropdown({data: res});
      }
      return dropdown;
    }
    return [];
  }, [slotResponse]);

  const dayOfWeekDropdown = useMemo(() => {
    if (dayOfWeekResponse.status === STATUS_CODES.OK) {
      const data = dayOfWeekResponse.data;
      let dropdown: any[] = [];
      if (data && Array.isArray(data)) {
        const res = convertResponseData(data, ['id', 'name']);
        dropdown = convertResponseToDropdown({data: res});
      }
      return dropdown;
    }
    return [];
  }, [dayOfWeekResponse]);

  useImperativeHandle(
    ref,
    () => ({
      onOpen(i?: any) {
        handleOnOpen(i);
      },
      onClose() {
        handleOnClose();
      },
    }),
    [],
  );

  const methods = useForm<DefaultValues>({
    defaultValues: initDefaultValues,
    validationSchema,
  });

  const handleOnOpen = (i: any) => {
    modalRef.current!.onOpen();
    currentItem.current = i;
    methods.setValue('dayOfWeekId', i?.dayOfWeekId || '');
    methods.setValue('slotNumber', i?.slotNumber || 0);
    methods.setValue('slotId', i?.slotId || '');
  };

  const handleOnClose = () => {
    modalRef.current!.onClose();
  };

  const onClose = () => {
    methods.reset(initDefaultValues);
  };

  const handleOnSubmit = (values: DefaultValues) => {
    setSlotDow((prev: SlotDow[]) =>
      prev.map((i) =>
        i.id === currentItem.current?.id
          ? {
              ...i,
              dayOfWeekId: values.dayOfWeekId,
              slotNumber: values.slotNumber,
              slotId: values.slotId,
            }
          : i,
      ),
    );
    handleOnClose();
  };

  const renderBody = () => (
    <div className="teacher__create__course__container">
      <FormProvider {...methods}>
        <FormInputNumber name="slotNumber" label="Số lượng học sinh" required />
        <Dropdown
          items={slotDropdown}
          name="slotId"
          label="Slot"
          isMarginTop
          required
        />
        <Dropdown
          items={dayOfWeekDropdown}
          name="dayOfWeekId"
          label="Chọn thứ"
          isMarginTop
          required
        />
        <ButtonToolbar
          style={{
            marginTop: 20,
          }}
        >
          <Button
            onClick={methods.handleSubmit(handleOnSubmit)}
            appearance="primary"
          >
            Cập nhật
          </Button>
        </ButtonToolbar>
      </FormProvider>
    </div>
  );

  return (
    <Modal
      body={renderBody}
      onClose={onClose}
      title="Cập nhật Slot"
      ref={modalRef}
      size="lg"
    />
  );
});

UpdateSlotModal.displayName = 'UpdateSlotModal';
export {UpdateSlotModal};
