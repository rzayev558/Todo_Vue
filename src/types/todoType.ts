export type todoType = {
    name: string
    id: string
    isCompleted: boolean
    isEditing: boolean
    index: number
}
export type todoStateType = {
    todo: string
    invalid: boolean
    error: string
}