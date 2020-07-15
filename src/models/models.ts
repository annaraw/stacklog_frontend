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
    team?: string
    index?: number,
}

export interface IBacklogItemUpdateProps {
    assignee?: string,
    title?: string,
    description?: string,
    priority?: Priority,
    reminder?: number,
    estimation?: number,
    completed?: boolean,
    startDate?: Date | null,
    dueDate?: Date,
    category?: string,
    team?: string
}

export interface IBacklogItemRequest {
    author: string,
    assignee: string,
    title: string,
    description?: string,
    priority: string,
    reminder?: number,
    estimation?: number,
    completed: boolean,
    startDate?: Date | null,
    dueDate?: Date,
    category: string,
    team?: string
}

export interface CalendarItem {
    /* ICS event format:
    *** TUM EVENT ***
    BEGIN:VEVENT
    UID:000@tum.de
    DTSTAMP:20200616T151823Z
    STATUS:CONFIRMED
    CLASS:PUBLIC
    URL:https://campus.tum.de/tumonline/wbLv.wbShowLVDetail?pStpSpNr=950461751
    SUMMARY:Einsatz und Realisierung von Datenbanksystemen (IN2031) VO\, Standardgruppe
    DESCRIPTION:fix\; Abhaltung\; 
    DTSTART:20200716T090000Z
    DTEND:20200716T120000Z
    LOCATION:Online\nWebkonferenz: Moodle\, Zoom\, etc.
    X-CO-RECURRINGID:413722
    END:VEVENT
    
    *** GOOGLE CALENDAR EVENT ***
    BEGIN:VEVENT
    DTSTART:20200517T140000Z
    DTEND:20200517T150000Z
    DTSTAMP:20200518T164847Z
    UID:xxx@google.com
    CREATED:20200514T175930Z
    DESCRIPTION:
    LAST-MODIFIED:20200514T175931Z
    LOCATION:
    SEQUENCE:1
    STATUS:TENTATIVE
    SUMMARY:SEBA Team
    TRANSP:OPAQUE
    END:VEVENT

    *** ANOTHER EXAMPLE ICS FILE ***
    BEGIN:VCALENDAR
    VERSION:2.0
    CALSCALE:GREGORIAN
    BEGIN:VEVENT
    SUMMARY:Access-A-Ride Pickup
    DTSTART;TZID=America/New_York:20130802T103400
    DTEND;TZID=America/New_York:20130802T110400
    LOCATION:1000 Broadway Ave.\, Brooklyn
    DESCRIPTION: Access-A-Ride trip to 900 Jay St.\, Brooklyn
    STATUS:CONFIRMED
    SEQUENCE:3
    BEGIN:VALARM
    TRIGGER:-PT10M
    DESCRIPTION:Pickup Reminder
    ACTION:DISPLAY
    END:VALARM
    END:VEVENT
    BEGIN:VEVENT
    SUMMARY:Access-A-Ride Pickup
    DTSTART;TZID=America/New_York:20130802T200000
    DTEND;TZID=America/New_York:20130802T203000
    LOCATION:900 Jay St.\, Brooklyn
    DESCRIPTION: Access-A-Ride trip to 1000 Broadway Ave.\, Brooklyn
    STATUS:CONFIRMED
    SEQUENCE:3
    BEGIN:VALARM
    TRIGGER:-PT10M
    DESCRIPTION:Pickup Reminder
    ACTION:DISPLAY
    END:VALARM
    END:VEVENT
    END:VCALENDAR
    */

    id: string,
    uid?: string,
    summary: string,
    description?: string,
    url?: string,
    dtStart: Date,
    dtEnd: Date,
    location?: string
}

export interface Calendar {
    name: string,
    owner: string,
    url?: string,
    items: CalendarItem[]
}

export enum Priority {
    "high" = 2,
    "medium" = 1,
    "low" = 0
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