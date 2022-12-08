/**
 * @app VuonDau
 * @author phutruongck
 */

import React, { useState, useEffect, KeyboardEvent } from 'react'
import { Input, InputGroup, Nav, Navbar } from 'rsuite'
import { useKeycloak } from '@react-keycloak/web'
import { studentNavigation, STUDENT_URL_PAGE } from '@/router/student/navigation'
import { TEACHER_URL_PAGE } from '@/router/teacher/navigation'
import SearchIcon from '@rsuite/icons/Search'
import { INavigation } from '@custom-type'
import { useRouter } from '@/bin/hooks'
import './styles.scss'

interface Props {}

const StudentSideNav: React.FC<Props> = React.memo(() => {
  const { history, location } = useRouter()
  const { keycloak } = useKeycloak()

  const [selectedRoute, setSelectedRoute] = useState<string[]>([''])
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setSelectedRoute([location.pathname])
  }, [location])

  const roles = keycloak.resourceAccess?.vuondau?.roles

  const handleOnRedirect = (url: string) => {
    history.push(url)
  }

  const handleOnChange = (e: string) => {
    setValue(e)
  }

  const handleOnKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.code === 'Enter') {
      history.push({
        pathname: STUDENT_URL_PAGE.SEARCH.PATH,
        search: `?q=${value}`,
        hash: '#search',
      })
    }
  }

  const handleOnSearch = () => {
    history.push({
      pathname: STUDENT_URL_PAGE.SEARCH.PATH,
      search: `?q=${value}`,
      hash: '#search',
    })
  }

  const handleOnLogout = () => {
    keycloak.logout()
  }

  return (
    <div className="student__side__nav">
      <Navbar className="student__side__nav__bar">
        <div className="student__side__nav__bar__left">
          <Navbar.Brand onClick={() => handleOnRedirect(STUDENT_URL_PAGE.HOME.PATH)}>
            {process.env.REACT_APP_TITLE}
          </Navbar.Brand>
          <Nav>
            {studentNavigation.map((i: INavigation, index: number) => (
              <Nav.Item
                onClick={() => handleOnRedirect(i.path)}
                active={selectedRoute.includes(i.path)}
                icon={i.icon}
                key={index}
              >
                {i.title}
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <div className="student__side__nav__bar__center">
          <InputGroup inside>
            <Input
              placeholder="Tìm kiếm khoá học, Giáo viên"
              onKeyDown={handleOnKeyDown}
              onChange={handleOnChange}
              value={value}
            />
            <InputGroup.Button onClick={handleOnSearch}>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
        </div>
        <div className="student__side__nav__bar__right">
          <Nav>
            <Nav.Item
              onClick={() => handleOnRedirect(STUDENT_URL_PAGE.TEACHER_REGISTER.PATH)}
              active={selectedRoute.includes(STUDENT_URL_PAGE.TEACHER_REGISTER.PATH)}
            >
              Giảng dạy trên {process.env.REACT_APP_TITLE}
            </Nav.Item>
            {keycloak.authenticated ? (
              <React.Fragment>
                <Nav.Menu title={keycloak.idTokenParsed?.preferred_username}>
                  {roles?.includes('TEACHER') ? (
                    <Nav.Item
                      onClick={() => handleOnRedirect(TEACHER_URL_PAGE.HOME.PATH)}
                      active={selectedRoute.includes(TEACHER_URL_PAGE.HOME.PATH)}
                    >
                      Giáo viên
                    </Nav.Item>
                  ) : undefined}
                  <Nav.Item onClick={handleOnLogout}>Đăng xuất</Nav.Item>
                </Nav.Menu>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Item
                  onClick={() => handleOnRedirect(STUDENT_URL_PAGE.LOGIN.PATH)}
                  active={selectedRoute.includes(STUDENT_URL_PAGE.LOGIN.PATH)}
                >
                  Đăng nhập
                </Nav.Item>
                <Nav.Item
                  onClick={() => handleOnRedirect(STUDENT_URL_PAGE.REGISTER.PATH)}
                  active={selectedRoute.includes(STUDENT_URL_PAGE.REGISTER.PATH)}
                >
                  Đăng ký
                </Nav.Item>
              </React.Fragment>
            )}
          </Nav>
        </div>
      </Navbar>
    </div>
  )
})

StudentSideNav.displayName = 'StudentSideNav'
export { StudentSideNav }
