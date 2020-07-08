import { backlogDummy } from "./dummyData";
import { Column } from '../models/models';

const datesAreOnSameDay = (first: Date, second:Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

export const columns:Column[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      itemsIds: backlogDummy.filter((item) => !item.startDate || item.startDate < new Date('2020-07-06')).map((item) => item.id )
    },
    {
      id: 'Mon Jul 06 2020',
      title: '2020-07-06',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-06'), item.startDate) ).map((item) => item.id)
    },
    {
      id: 'Tue Jul 07 2020',
      title: '2020-07-07',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-07'), item.startDate) ).map((item) => item.id)
    },
    {
      id: 'Wed Jul 08 2020',
      title: '2020-07-08',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-08'), item.startDate) ).map((item) => item.id)
    },
    {
      id: 'Thu Jul 09 2020',
      title: '2020-07-09',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-09'), item.startDate) ).map((item) => item.id)
    },
    {
      id: 'Fri Jul 10 2020',
      title: '2020-07-10',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-10'), item.startDate) ).map((item) => item.id)
    },
    {
      id: 'Sat Jul 11 2020',
      title: '2020-07-11',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-11'), item.startDate) ).map((item) => item.id)
    },
    {
      id: 'Sun Jul 12 2020',
      title: '2020-07-12',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-12'), item.startDate) ).map((item) => item.id)
    },
    {
      id: 'Mon Jul 13 2020',
      title: '2020-07-13',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-13'), item.startDate) ).map((item) => item.id)
    }
]
    
    
    /* ,
    '2020-07-14': {
      id: '2020-07-14',
      title: '2020-07-14',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-14'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-15': {
      id: '2020-07-15',
      title: '2020-07-15',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-15'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-16': {
      id: '2020-07-16',
      title: '2020-07-16',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-16'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-17': {
      id: '2020-07-17',
      title: '2020-07-17',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-17'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-18': {
      id: '2020-07-18',
      title: '2020-07-18',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-18'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-19': {
      id: '2020-07-19',
      title: '2020-07-19',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-19'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-20': {
      id: '2020-07-20',
      title: '2020-07-20',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-20'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-21': {
      id: '2020-07-21',
      title: '2020-07-21',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-21'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-22': {
      id: '2020-07-22',
      title: '2020-07-22',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-22'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-23': {
      id: '2020-07-23',
      title: '2020-07-23',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-23'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-24': {
      id: '2020-07-24',
      title: '2020-07-24',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-24'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-25': {
      id: '2020-07-25',
      title: '2020-07-25',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-25'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-26': {
      id: '2020-07-26',
      title: '2020-07-26',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-26'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-27': {
      id: '2020-07-27',
      title: '2020-07-27',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-27'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-28': {
      id: '2020-07-28',
      title: '2020-07-28',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-28'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-29': {
      id: '2020-07-29',
      title: '2020-07-29',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-29'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-30': {
      id: '2020-07-30',
      title: '2020-07-30',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-30'), item.startDate) ).map((item) => item.id)
    },
    '2020-07-31': {
      id: '2020-07-31',
      title: '2020-07-31',
      itemsIds: backlogDummy.filter((item) => item.startDate && datesAreOnSameDay(new Date('2020-07-31'), item.startDate) ).map((item) => item.id)
    }
} */