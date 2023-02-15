import { Nation } from "./nation"

export interface Player {
    _id: string
    name: string
    nationId: string
    nation?: Nation
}
