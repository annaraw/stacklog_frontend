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
    id: string,
    name: string,
    category: Category,
    priority: number,
    complete: boolean
}

export interface Category {
    name: string
}