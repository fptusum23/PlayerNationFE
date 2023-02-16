import { INation } from "./nation"
import { EPosition } from "./position"

export interface IPlayer {
    _id?: string
    name: string,
    image: string,
    club: string
    position: EPosition
    goals: number
    isCaptain?: boolean
    nation: string | INation
}
