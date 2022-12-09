type Variant = 'outlined' | 'contained' | 'text'

export interface NavPayload {
  label: string
  link: string
}

export interface RegisterPayload extends NavPayload {
  variant: Variant
}
