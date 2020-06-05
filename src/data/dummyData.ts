import { Member, Project } from "../models/models"

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
