export interface Project {
    title: string,
    description: string,
    id: string,
    team: Member[],
    backlogItems: number,
    progress: number,
}

export interface Member {
    name: string,
    lastName: string,
    role?: string,
    id: string,
    email: string,
}

export interface IUser {
    username: string,
    password: string,
    email: string,
    firstname: string,
    surname: string,
    role: string,
    subscriptionPlan: string,
    companyName: string,
}

export interface BacklogItem {
    id: number,
    author: string,
    assignee: string,
    title: string,
    description: string,
    priority: number,
    reminder?: number,
    completed: boolean,
    startDate?: Date,
    dueDate?: Date,
    category?: string,
    team?: string
}