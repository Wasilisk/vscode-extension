import { ListType } from "./list.type"

export type Entry = {
    id: string,
    name: string,
    listItems?: Entry[]
}