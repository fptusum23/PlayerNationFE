import { Player } from "../../models/player";
import axiosClient from "../axiosClient";

const ROUTE = 'player';

const playerService = {
    async getAll(): Promise<Player[]> {
        const url = `${ROUTE}`;
        return await axiosClient.get(url);
    },

    async getById(_id: string): Promise<Player[]> {
        const url = `${ROUTE}/${_id}`;
        return await axiosClient.get(url);
    },
};

export default playerService;
