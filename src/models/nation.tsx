import { IPlayer } from "./player"

export interface INation {
    _id?: string
    name: string
    image?: string
    players?: IPlayer[]
}
