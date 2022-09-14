import { ListItemType } from "./list-item.type"

export type ListType = {
    id: string,
    name: string,
    listItems: ListItemType[]
}