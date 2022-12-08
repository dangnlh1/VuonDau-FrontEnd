/**
 * @app VuonDau
 * @author phutruongck
 */

import { useKeycloak } from '@react-keycloak/web'
import React, { useEffect } from 'react'
import { useGlobalAction, useCommon, useCookies } from '@/bin/hooks'
import { ILayoutContext } from '@custom-type'
import { wait } from '@/bin/common/function'
import axios from '@/ducks/axios'
import './styles.scss'

interface Props {
  pageTitle?: string
}

const LayoutContext = React.createContext<ILayoutContext>({})

const WithLayout: React.FC<Props> = ({ children, pageTitle }) => {
  const { getAllCourse, getListSubject } = useCommon()
  const { setPageLoading } = useGlobalAction()
  const { keycloak } = useKeycloak()
  const { setToken } = useCookies()

  useEffect(() => {
    if (pageTitle && process.env.REACT_APP_TITLE) {
      document.title = `${pageTitle.toUpperCase()} | ${process.env.REACT_APP_TITLE}`
    } else {
      document.title = process.env.REACT_APP_TITLE || ''
    }
  }, [pageTitle])

  useEffect(() => {
    if (keycloak.authenticated) {
      setToken(keycloak.token)
      axios().defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}`
    }
  }, [keycloak])

  useEffect(() => {
    Promise.all([getListSubject({}), getAllCourse({})]).then(() => {
      wait(1000).then(() => {
        setPageLoading(false)
      })
    })
  }, [])

  return (
    <LayoutContext.Provider value={{}}>
      <div className="layout__wrapper">{children}</div>
    </LayoutContext.Provider>
  )
}

export { WithLayout, LayoutContext }
