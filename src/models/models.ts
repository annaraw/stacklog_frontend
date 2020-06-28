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