import { INation } from "./nation"

export interface IPlayer {
    _id?: string
    name: string,
    image: string,
    nationId: string
    nation?: INation
}
