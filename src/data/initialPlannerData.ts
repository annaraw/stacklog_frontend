import { backlogDummy } from "./dummyData";

var items: any = {};
var backlogItemIds: string[] = [];
var scheduleItemIds: string[] = [];
backlogDummy.forEach(item => {
  items[item.id] = item;
  if (!item.startDate) {
    backlogItemIds.push(item.id)
  } else {
    if (item.startDate < new Date()) {
      backlogItemIds.push(item.id)
    }else {
      scheduleItemIds.push(item.id)
    }
  }
});

export const initialPlannerData = {
  items: items,
  columns: {
    'backlog': {
      id: 'backlog',
      title: 'Backlog',
      itemsIds: backlogItemIds
    },
    'schedule': {
      id: 'schedule',
      title: 'Schedule',
      itemsIds: scheduleItemIds
    },
    'column-3': {
      id: 'column-3',
      title: 'Column 3',
      itemsIds: []
    },
    'column-4': {
      id: 'column-4',
      title: 'Column 4',
      itemsIds: []
    }
  },
  columnsOrder: ['column-1', 'column-2', 'column-3', 'column-4']
}