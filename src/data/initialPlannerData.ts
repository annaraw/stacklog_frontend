import { backlogDummy } from "./dummyData";

var items: any = {};
var backlogItemIds: string[] = [];
backlogDummy.forEach(backlogItem => {
  items[backlogItem.id] = backlogItem;
  if (!backlogItem.startDate) {
    backlogItemIds.push(backlogItem.id)
  } else {
    if (backlogItem.startDate < new Date()) {
      backlogItemIds.push(backlogItem.id)
    }
  }
});

export const initialPlannerData = {
  items: items,
  columns: {
    'backlog': {
      id: 'backlog',
      title: 'Column 1',
      itemsIds: backlogItemIds
    },
    'column-2': {
      id: 'column-2',
      title: 'Column 2',
      itemsIds: []
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