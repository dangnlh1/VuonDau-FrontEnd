export interface NavPayload {
  label: string
  link?: string
  items?:Array<NavPayLoadItem>
}

export interface NavPayLoadItem {
  label:string
  link:string
}
export interface RegisterPayload {
  label: string
  value: string
}
