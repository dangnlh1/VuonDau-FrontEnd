export interface ExercisePayload {
  id: number
  name: string
  modules: Module[]
}
export interface Module {
  id: number
  url: string
  name: string
  type: string
}
