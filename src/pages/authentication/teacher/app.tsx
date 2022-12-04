/**
 * @app VuonDau
 * @author phutruongck
 */

import {Content, ButtonToolbar, Button, Panel, FlexboxGrid} from 'rsuite';
import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {STUDENT_URL_PAGE} from '@/router/student/navigation';
import {useMemoriedSelector, useRouter} from '@/hooks';
import {showToast} from '@/common/function/toast';
import {
  FormInputNumber,
  InputDateTime,
  FormProvider,
  FormInput,
  Dropdown,
  useForm,
} from '@/components/react-hook-form';
import {
  selectors as authenticationSelectors,
  actions as authenticationActions,
  models as authenticationModels,
} from '@/ducks/authentication';
import {
  genderDropdown,
  voiceDropdown,
  levelDropdown,
  STATUS_CODES,
} from '@/common/constants';
import {DefaultValues, initDefaultValues} from './init-data';
import {validationSchema} from './validations';
import './styles.scss';

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const dispatch = useDispatch();
  const {history} = useRouter();

  const teacherRegisterResponse: authenticationModels.TeacherRegisterResponse =
    useMemoriedSelector(authenticationSelectors.teacherRegister).response;

  const teacherRegisterRequest = useCallback(
    (request: authenticationModels.TeacherRegisterRequest) =>
      dispatch(authenticationActions.teacherRegister.request(request)),
    [dispatch],
  );

  const resetTeacherRegister = useCallback(
    (request: authenticationModels.TeacherRegisterResponse) =>
      dispatch(authenticationActions.teacherRegister.success(request)),
    [dispatch],
  );

  const methods = useForm<DefaultValues>({
    defaultValues: initDefaultValues,
    validationSchema,
  });

  useEffect(() => {
    if (teacherRegisterResponse.status) {
      if (teacherRegisterResponse.status === STATUS_CODES.OK) {
        showToast({
          message: 'Đăng ký thành công!',
          type: 'success',
        });
        history.push(STUDENT_URL_PAGE.HOME.PATH);
      } else {
        showToast({
          message: teacherRegisterResponse.error_message,
          type: 'error',
        });
      }
      resetTeacherRegister(
        authenticationModels.initState.teacherRegister.response,
      );
    }
  }, [teacherRegisterResponse]);

  const handleOnSubmit = (values: DefaultValues) => {
    teacherRegisterRequest({
      ...values,
      birthDay: new Date(values.birthDay).toISOString(),
    });
  };

  return (
    <div className="login__container">
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel
              header={
                <h3>Đăng ký giảng dạy trên {process.env.REACT_APP_TITLE}</h3>
              }
              bordered
            >
              <FormProvider {...methods}>
                <FormInput name="username" label="Họ & tên" required />
                <InputDateTime
                  label="Ngày sinh"
                  name="birthDay"
                  isMarginTop
                  required
                />
                <FormInput name="email" label="Email" isMarginTop required />
                <FormInputNumber
                  label="Số điện thoại"
                  name="phone"
                  isMarginTop
                  required
                />
                <Dropdown
                  items={genderDropdown}
                  label="Giới tính"
                  name="gender"
                  isMarginTop
                />
                <Dropdown
                  items={voiceDropdown}
                  label="Giọng nói"
                  name="voice"
                  isMarginTop
                  required
                />
                <FormInput
                  label="Nguyên quán"
                  name="domicile"
                  isMarginTop
                  required
                />
                <FormInput
                  label="Địa chỉ hiện tại"
                  name="currentAddress"
                  isMarginTop
                  required
                />
                <FormInput
                  placeholder="Ví dụ: Đại Học Sư Phạm"
                  name="trainingSchoolName"
                  label="Trường đào tạo"
                  isMarginTop
                  required
                />
                <FormInput
                  placeholder="Ví dụ: Sư Phạm Vật Lý"
                  label="Ngành học"
                  name="majors"
                  isMarginTop
                  required
                />
                <Dropdown
                  items={levelDropdown}
                  label="Hiện là"
                  name="level"
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
                    Đăng ký
                  </Button>
                </ButtonToolbar>
              </FormProvider>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </div>
  );
});

AppPage.displayName = 'AppPage';
export {AppPage};
