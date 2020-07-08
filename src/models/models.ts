export interface Project {
    title: string,
    description: string,
    id: string,
    team: Member[],
    backlogItems: number,
    progress: number,
}

export interface IProjectRequest {
    title: string,
    description: string,
    team: string[],
    leader: string,
}

export interface IProjectUpdateProps {
    title?: string,
    description?: string,
    team?: string[],
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

export interface IBacklogItem {
    id: string,
    author: string,
    assignee: string,
    title: string,
    description?: string,
    priority: Priority,
    reminder?: number,
    estimation?: number,
    completed: boolean,
    startDate?: Date | null,
    dueDate?: Date,
    category: string,
    team?: string,
    index?: number,
}

enum Priority {
    "high",
    "medium",
    "low"
}

export interface Category {
    key: string,
    text: string,
    color: string,
}

export interface Column {
	id: string,
	title: string,
	itemsIds: string[]
}