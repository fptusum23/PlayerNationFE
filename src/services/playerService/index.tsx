import { IPlayer } from "../../models/player";
import axiosClient from "../axiosClient";
import nationService from "../nationService";

const ROUTE = 'player';
export const listPlayers: IPlayer[] = [
    {
        _id: '1',
        name: 'The Player 1',
        image: 'https://dummyimage.com/420x260',
        nationId: '1'
    },
    {
        _id: '2',
        name: 'The Player 2',
        image: 'https://dummyimage.com/420x260',
        nationId: '2'
    },
    {
        _id: '3',
        name: 'The Player 3',
        image: 'https://dummyimage.com/420x260',
        nationId: '1'
    },
    {
        _id: '4',
        name: 'The Player 4',
        image: 'https://dummyimage.com/420x260',
        nationId: '1'
    },
    {
        _id: '5',
        name: 'The Player 5',
        image: 'https://dummyimage.com/420x260',
        nationId: '2'
    }
]
const playerService = {
    async getAll(): Promise<IPlayer[] | any> {
        const result = listPlayers ?? []
        return result
        // const url = `${ROUTE}`;
        // return await axiosClient.get(url);
    },

    async getById(_id: string): Promise<IPlayer | undefined> {
        return listPlayers.find(e => e._id == _id)
        // const url = `${ROUTE}/${_id}`;
        // return await axiosClient.get(url);
    },
    async create(player: IPlayer): Promise<IPlayer | undefined> {
        const newPlayer = {
            _id: `${listPlayers.length + 1}`,
            ...player
        }
        listPlayers.push(newPlayer)
        return newPlayer
    },
    async updateById(_id: string, newPlayer: IPlayer): Promise<IPlayer | undefined> {
        for (const player of listPlayers) {
            if (player._id == _id) {
                player.image = newPlayer.image
                player.name = newPlayer.name
                player.nationId = newPlayer.nationId
                return player
            }
        }
    },
    async deleteById(_id: string): Promise<boolean> {
        const index = listPlayers.findIndex(e => e._id == _id);
        if (index >= 0) {
            listPlayers.splice(index, 1);
            return true
        }
        return false
    }
};

export default playerService;
