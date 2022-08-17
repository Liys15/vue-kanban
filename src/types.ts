export interface todoItemInterface {
    title: string | null
    description: string | null
}

export interface ActivityInterface {
    activityName: string
    isActived: boolean
    todo: todoItemInterface[]
    inProgress: todoItemInterface[]
    completed: todoItemInterface[]
}
