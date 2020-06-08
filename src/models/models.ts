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

export interface Backlog {
    id: number,
    name: string
    category: Category
    priority: number
}

export interface Category {
    key: string
    text: string
}