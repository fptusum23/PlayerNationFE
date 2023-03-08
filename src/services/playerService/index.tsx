import { IPlayer } from "../../models/player";
import { IResponse } from "../../models/reponse";
import { IResponsePaging } from "../../models/reponsePaging";
import axiosClient from "../axiosClient";

const ROUTE = 'player';
const playerService = {
    async getAll(): Promise<IResponsePaging<IPlayer>> {
        const url = `${ROUTE}?fields=["$all"]&populates=["nation"]`;
        const { headers } = await axiosClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-requested-with': 'XMLHttpRequest',
            }
        })
        return (await axiosClient.get(url)).data;
    },
    async getById(_id: string): Promise<IResponse<IPlayer | undefined>> {
        const url = `${ROUTE}/${_id}?fields=["$all"]`;
        return (await axiosClient.get(url)).data;
    },
    async create(nation: IPlayer): Promise<IPlayer | undefined> {
        const url = `${ROUTE}?fields=["$all"]`;
        const token = localStorage.getItem('accessToken');
        return (await axiosClient.post(url, nation, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    },
    async updateById(_id: string, updateNation: IPlayer): Promise<IResponse<IPlayer | undefined>> {
        const url = `${ROUTE}/${_id}?fields=["$all"]`;
        const token = localStorage.getItem('accessToken');
        return (await axiosClient.put(url, updateNation, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    },
    async deleteById(_id: string): Promise<boolean> {
        const url = `${ROUTE}/${_id}?fields=["$all"]`;
        const token = localStorage.getItem('accessToken');
        return (await axiosClient.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    }
};

export default playerService;
