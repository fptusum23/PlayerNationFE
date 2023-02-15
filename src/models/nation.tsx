import { Player } from "./player"

export interface Nation {
    _id: string
    name: string
    players?: Player[]
}
