import { IPlayer } from "../../models/player";
import { IResponse } from "../../models/reponse";
import { IResponsePaging } from "../../models/reponsePaging";
import axiosClient from "../axiosClient";
import utilService from "../utilService";

const ROUTE = 'player';
const playerService = {
    async getAll(object: any = {}): Promise<IResponsePaging<IPlayer>> {
        object.fields = '["$all"]'
        object.populates = '["nation"]'
        const query = utilService.serialize(object)
        const url = `${ROUTE}?${query}`;
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
