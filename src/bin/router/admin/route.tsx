/**
 * @app VuonDau
 * @author phutruongck
 */

import React, { useLayoutEffect } from 'react'
import { ACCOUNT_TYPE } from '@/bin/common/constants'
import { useCookies, useRouter } from '@/bin/hooks'
import { AppRoute } from '@/router/app-route'
import { ILayoutType } from 'custom-type'
import { STUDENT_URL_PAGE } from '../student/navigation'
import { AUTH_URL_PAGE } from '../auth/navigation'

interface AdminRouteType {
  type: ILayoutType
  exact?: boolean
  component: any
  path: string
}

const AdminRoute: React.FC<AdminRouteType> = ({ component: Component, exact, path, type }) => {
  const { token, userData } = useCookies()
  const { history } = useRouter()

  useLayoutEffect(() => {
    if (!token) {
      history.push(AUTH_URL_PAGE.AUTH.LOGIN)
      return
    }

    if (userData?.accountType === ACCOUNT_TYPE.CUSTOMER) {
      history.push(STUDENT_URL_PAGE.HOME.PATH)
      return
    }
  }, [token])

  return <AppRoute component={Component} exact={exact} path={path} type={type} />
}

AdminRoute.displayName = 'AdminRoute'
export { AdminRoute }
