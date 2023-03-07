import { INation } from "../../models/nation";
import { IPlayer } from "../../models/player";
import { IResponse } from "../../models/reponse";
import { IResponsePaging } from "../../models/reponsePaging";
import axiosClient from "../axiosClient";

const ROUTE = 'nation';
const nationService = {
    async getAll(): Promise<IResponsePaging<INation>> {
        const url = `${ROUTE}?fields=["$all"]`;
        return (await axiosClient.get(url)).data;
    },
    async getById(_id: string): Promise<IResponse<INation | undefined>> {
        const url = `${ROUTE}/${_id}?fields=["$all"]`;
        return (await axiosClient.get(url)).data;
    },
    async create(nation: INation): Promise<INation | undefined> {
        const url = `${ROUTE}?fields=["$all"]`;
        return (await axiosClient.post(url, nation)).data;
    },
    async updateById(_id: string, updateNation: INation): Promise<IResponse<INation | undefined>> {
        const url = `${ROUTE}/${_id}?fields=["$all"]`;
        return (await axiosClient.put(url, updateNation)).data;
    },
    async deleteById(_id: string): Promise<boolean> {
        const url = `${ROUTE}/${_id}?fields=["$all"]`;
        return (await axiosClient.delete(url,{headers:{Authorization : `bearer ${localStorage.getItem('accessToken')}`}})).data;
    }
};

export default nationService;
