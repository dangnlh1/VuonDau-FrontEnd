/**
 * @app VuonDau
 * @author phutruongck
 */

import React, { Suspense, useLayoutEffect } from 'react'
import { Route } from 'react-router-dom'
import Lottie from 'react-lottie'
import pageLoading from '@/assets/animations/page-loading.json'
import { ThemeContext, useGlobalAction } from '@/bin/hooks'
import { LAYOUT_TYPE } from '@/bin/common/constants'
import { ILayoutType } from '@custom-type'

interface AppRouteType {
  type: ILayoutType
  exact?: boolean
  component: any
  path: string
}

const AppRoute: React.FC<AppRouteType> = ({ component: Component, exact, path, type }) => {
  const { setLayoutType } = useGlobalAction()

  useLayoutEffect(() => {
    setLayoutType(type)
  }, [])

  return (
    <Route
      exact={exact}
      path={path}
      key={path}
      render={(props) => (
        <ThemeContext.Consumer>
          {(context) => {
            let LayoutWrapper: any
            switch (type) {
              case LAYOUT_TYPE.ADMIN:
                LayoutWrapper = context.adminLayout
                break
              case LAYOUT_TYPE.STUDENT:
                LayoutWrapper = context.studentLayout
                break
              case LAYOUT_TYPE.TEACHER:
                LayoutWrapper = context.teacherLayout
                break
            }

            return (
              <LayoutWrapper>
                <Suspense
                  fallback={
                    <Lottie
                      options={{
                        animationData: pageLoading,
                        autoplay: true,
                        loop: true,
                      }}
                      height={200}
                      width={200}
                    />
                  }
                >
                  <Component {...props} />
                </Suspense>
              </LayoutWrapper>
            )
          }}
        </ThemeContext.Consumer>
      )}
    />
  )
}

AppRoute.displayName = 'AppRoute'
export { AppRoute }
