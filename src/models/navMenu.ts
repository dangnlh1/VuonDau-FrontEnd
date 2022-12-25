export interface NavPayload {
  label: string
  link?: string
  value?: string
  items?: Array<NavPayLoadItem>
}

export interface NavPayLoadItem {
  label: string
  link: string
}
export interface LoginPayload {
  label: string
  value: string
}
export interface RegisterPayload {
  label: string
  value: string
}
