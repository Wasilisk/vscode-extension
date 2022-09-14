import { Entry, ListType } from "./types";
import { findIndexById } from "./utils";

const listData: ListType[] = [
    {
        id: "1321rsdfdsa",
        name: "List1",
        listItems: [
            {
                id: "1jwefugweufgwe",
                name: "Item1"
            },
            {
                id: "2dafasdfsad",
                name: "Item2"
            },
            {
                id: "3wef1312d",
                name: "Item3"
            },
        ],
    },
    {
        id: "232r123rs",
        name: "List2",
        listItems: [
            {
                id: "32423wew",
                name: "Item1"
            },
            {
                id: "2342341qe",
                name: "Item2"
            },
            {
                id: "1421452",
                name: "Item3"
            },
        ],
    }
]

export class ListApi {
    static getAllList = (): Promise<Entry[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(listData.map(list => {
                return({
                    id:list.id,
                    name:list.name,
                    listItems: []
                })
            })), 1000);
          });
    }

    
    static getListItem = (listId: string): Promise<Entry[]> => {
        const objIndex = findIndexById(listData, listId);
        const returnData = [...listData[objIndex].listItems]

        return new Promise((resolve) => {
            setTimeout(() => resolve(returnData), 1000);
          });
    }
}
