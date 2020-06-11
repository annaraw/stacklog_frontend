import { Member, Project, Backlog, Category } from "../models/models"

export const personsDummy: Member[] = [
    {
        name: "Max",
        lastName: "Mustermann",
        email: "max.mustermann@slacklog.com",
        role: "Manager",
        id: "1"
    },
    {
        name: "Maria",
        lastName: "Musterfrau",
        email: "maria.musterfrau@slacklog.com",
        role: "Programmer",
        id: "2"
    },
    {
        name: "Anna",
        lastName: "Müller",
        email: "anna.mueller@slacklog.com",
        role: "Manager",
        id: "3"
    },
    {
        name: "Thomas",
        lastName: "Müller",
        email: "thomas.mueller@slacklog.com",
        role: "CFO",
        id: "4"
    },
    {
        name: "Matthias",
        lastName: "Lau",
        email: "matthias.lau@slacklog.com",
        role: "CIO",
        id: "5"
    },
]

export const projectsDummy: Project[] = [
    {
        title: "Dining Hall",
        id: "1",
        description: "Revision of the static of dining hall in the castle of Burghausen",
        team: [
            personsDummy[0],
            personsDummy[1],
            personsDummy[2],
        ],
        backlogItems: 10,
        progress: 24
    },
    {
        title: "BMW Showroom",
        id: "2",
        description: "Preperation and planning for the architecture competition " +
            "for the new BMW Showroom (Munich). We have 12 competitors and " +
            "our idea is to create a new innovative show room",
        team: [
            personsDummy[0],
            personsDummy[1],
            personsDummy[2],
        ],
        backlogItems: 10,
        progress: 12
    },
    {
        title: "House Renovation (M)",
        id: "3",
        description: "House Renovation in Gartenstraße 8, Neuperlach",
        team: [
            personsDummy[0],
            personsDummy[1],
            personsDummy[2],
            personsDummy[4],
        ],
        backlogItems: 10,
        progress: 67
    },
    {
        title: "Removal",
        id: "4",
        description: "Remove all unused things from office",
        team: [
            personsDummy[0],
            personsDummy[1],
            personsDummy[2],
            personsDummy[3],
        ],
        backlogItems: 10,
        progress: 0
    },
]

export const categories: Category[] = [
    { 
        key: 'SEBA',
        text: 'SEBA Master',
        color: "#d480d8",
    },
    { 
        key: 'FBL',
        text: 'Future Business Labs',
        color: "#91d680",
    },
    { 
        key: 'DB',
        text: 'Databases',
        color: "#d38484",
    },
]

export const backlogDummy: Backlog[] = [
    {
        id: 1,
        author: "Author",
        assignee: "Author",
        title: "Create Overview Page",
        description: "Secondary text",
        reminder: 60,
        completed: false,
        startDate: new Date("2019-06-10"),
        dueDate: new Date("2019-06-20"),
        team: "Team",
        category: categories[1],
        priority: 1
    },
    {
        id: 2,
        author: "Author",
        assignee: "Author",
        title: "Implement Filter Function",
        description: "Secondary text",
        reminder: 60,
        completed: false,
        startDate: new Date("2019-06-10"),
        dueDate: new Date("2019-06-20"),
        team: "Team",
        category: categories[0],
        priority: 2
    },
    {
        id: 3,
        author: "Author",
        assignee: "Author",
        title: "Homework Sheet 5",
        description: "Secondary text",
        reminder: 60,
        completed: false,
        startDate: new Date("2019-06-10"),
        dueDate: new Date("2019-06-20"),
        team: "Team",
        category: categories[2],
        priority: 3
    },
    {
        id: 4,
        author: "Author",
        assignee: "Author",
        title: "Visit Tutorial 5",
        description: "Secondary text",
        reminder: 60,
        completed: false,
        startDate: new Date("2019-06-10"),
        dueDate: new Date("2019-06-20"),
        team: "Team",
        category: categories[2],
        priority: 1
    },
    {
        id: 5,
        author: "Author",
        assignee: "Author",
        title: "Pitch Presentation",
        description: "Secondary text",
        reminder: 60,
        completed: false,
        startDate: new Date("2019-06-10"),
        dueDate: new Date("2019-06-20"),
        team: "Team",
        category: categories[1],
        priority: 2
    },
    {
        id: 6,
        author: "Author",
        assignee: "Author",
        title: "Develop Backend",
        description: "Secondary text",
        reminder: 60,
        completed: false,
        startDate: new Date("2019-06-10"),
        dueDate: new Date("2019-06-20"),
        team: "Team",
        category: categories[0],
        priority: 3
    },
    {
        id: 7,
        author: "Author",
        assignee: "Author",
        title: "Develop Authentification",
        description: "Secondary text",
        reminder: 60,
        completed: false,
        startDate: new Date("2019-06-10"),
        dueDate: new Date("2019-06-20"),
        team: "Team",
        category: categories[0],
        priority: 1
    },
    {
        id: 8,
        author: "Author",
        assignee: "Author",
        title: "Summarize Lecture",
        description: "Secondary text",
        reminder: 60,
        completed: false,
        startDate: new Date("2019-06-10"),
        dueDate: new Date("2019-06-20"),
        team: "Team",
        category: categories[2],
        priority: 3
    }
]