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
    */
    
    id: string,
    uid: string,
    summary: string,
    description: string,
    url: string,
    dtStart: Date,
    dtEnd: Date,
    location: string
}

export interface Calendar {
    name: string,
    url?: string,
    items: CalendarItem[]
}