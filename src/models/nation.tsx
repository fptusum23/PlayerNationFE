import { Player } from "./player"

export interface INation {
    _id?: string
    name: string
    image: string
    players?: Player[]
}
