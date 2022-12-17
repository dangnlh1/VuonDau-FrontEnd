export type LayoutType = 'STUDENT' | 'ADMIN' | 'TEACHER' | 'BLANK'

export interface RolePayload {
  id: number
  name: string
  code: LayoutType
}
