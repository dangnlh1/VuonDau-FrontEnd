/**
 * @app VuonDau
 * @author phutruongck
 */

import { Content, Form, ButtonToolbar, Button, Panel, FlexboxGrid } from 'rsuite'
import React, { useCallback, useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { STUDENT_URL_PAGE } from '@/router/student/navigation'
import { useRouter } from '@/bin/hooks'
import './styles.scss'

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const { history } = useRouter()
  const { keycloak } = useKeycloak()

  const handleOnSubmit = useCallback(() => {
    keycloak?.login()
  }, [keycloak])

  useEffect(() => {
    if (keycloak.authenticated) {
      history.push(STUDENT_URL_PAGE.HOME.PATH)
    }
  }, [keycloak.authenticated])

  return (
    <div className="login__container">
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Đăng nhập</h3>} bordered>
              <Form.Group
                style={{
                  marginTop: 10,
                }}
              >
                <ButtonToolbar>
                  <Button onClick={handleOnSubmit} appearance="primary">
                    Đăng nhập với KeyCloak
                  </Button>
                </ButtonToolbar>
              </Form.Group>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </div>
  )
})

AppPage.displayName = 'AppPage'
export { AppPage }
