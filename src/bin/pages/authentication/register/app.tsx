/**
 * @app VuonDau
 * @author phutruongck
 */

import { Content, ButtonToolbar, Button, Panel, FlexboxGrid } from 'rsuite'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { STUDENT_URL_PAGE } from '@/router/student/navigation'
import { useMemoriedSelector, useRouter } from '@/bin/hooks'
import { showToast } from '@/bin/common/function/toast'
import { STATUS_CODES } from '@/bin/common/constants'
import {
  FormInputNumber,
  InputPassword,
  FormProvider,
  FormInput,
  useForm,
} from '@/components/react-hook-form'
import {
  selectors as authenticationSelectors,
  actions as authenticationActions,
  models as authenticationModels,
} from '@/ducks/authentication'
import { DefaultValues, initDefaultValues } from './init-data'
import { validationSchema } from './validations'
import './styles.scss'

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const dispatch = useDispatch()
  const { history } = useRouter()

  const studentRegisterResponse: authenticationModels.StudentRegisterResponse = useMemoriedSelector(
    authenticationSelectors.studentRegister
  ).response

  const studentRegisterRequest = useCallback(
    (request: authenticationModels.StudentRegisterRequest) =>
      dispatch(authenticationActions.studentRegister.request(request)),
    [dispatch]
  )

  const resetStudentRegister = useCallback(
    (request: authenticationModels.StudentRegisterResponse) =>
      dispatch(authenticationActions.studentRegister.success(request)),
    [dispatch]
  )

  const methods = useForm<DefaultValues>({
    defaultValues: initDefaultValues,
    validationSchema,
  })

  useEffect(() => {
    if (studentRegisterResponse.status) {
      if (studentRegisterResponse.status === STATUS_CODES.OK) {
        showToast({
          message: 'Đăng ký thành công!',
          type: 'success',
        })
        history.push(STUDENT_URL_PAGE.LOGIN.PATH)
      } else {
        showToast({
          message: studentRegisterResponse.error_message,
          type: 'error',
        })
      }
      resetStudentRegister(authenticationModels.initState.studentRegister.response)
    }
  }, [studentRegisterResponse])

  const handleOnSubmit = (values: DefaultValues) => {
    studentRegisterRequest({
      name: values.firstName + ' ' + values.lastName,
      firstName: values.firstName,
      phoneNumber: values.phone,
      lastName: values.lastName,
      email: values.email,
      account: {
        password: values.password,
        username: values.username,
      },
    })
  }

  return (
    <div className="login__container">
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Đăng ký</h3>} bordered>
              <FormProvider {...methods}>
                <FormInput name="username" label="Tên đăng nhập" required />
                <InputPassword label="Mật khẩu" name="password" isMarginTop required />
                <FormInput label="Họ và tên lót" name="firstName" isMarginTop required />
                <FormInput name="lastName" label="Tên" isMarginTop required />
                <FormInput name="email" label="Email" isMarginTop required />
                <FormInputNumber label="Số điện thoại" name="phone" isMarginTop required />
                <ButtonToolbar
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Button onClick={methods.handleSubmit(handleOnSubmit)} appearance="primary">
                    Đăng ký
                  </Button>
                </ButtonToolbar>
              </FormProvider>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </div>
  )
})

AppPage.displayName = 'AppPage'
export { AppPage }
