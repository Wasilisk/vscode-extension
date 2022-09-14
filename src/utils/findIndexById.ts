import { Entry } from "../types";

export function findIndexById(element: Array<Entry>, id: string) {
    return element.findIndex((obj: Entry) => obj.id === id) as number;
}