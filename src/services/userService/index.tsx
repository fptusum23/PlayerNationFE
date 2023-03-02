import { IUser } from "../../models/user";
import { IPlayer } from "../../models/player";
import { IResponse } from "../../models/reponse";
import { IResponsePaging } from "../../models/reponsePaging";
import axiosClient from "../axiosClient";

const ROUTE = 'user';
const userService = {
    async getAll(): Promise<IResponsePaging<IUser>> {
        const url = `${ROUTE}?fields=["$all"]`;
        return (await axiosClient.get(url)).data;
    },
    async getById(_id: string): Promise<IResponse<IUser | undefined>> {
        const url = `${ROUTE}/${_id}?fields=["$all"]`;
        return (await axiosClient.get(url)).data;
    },
    async create(user: IUser): Promise<IUser | undefined> {
        const url = `${ROUTE}?fields=["$all"]`;
        return (await axiosClient.post(url, user)).data;
    },
    async updateById(_id: string, updateuser: IUser): Promise<IResponse<IUser | undefined>> {
        const url = `${ROUTE}/${_id}?fields=["$all"]`;
        return (await axiosClient.put(url, updateuser)).data;
    },
    async deleteById(_id: string): Promise<boolean> {
        const url = `${ROUTE}/${_id}?fields=["$all"]`;
        return (await axiosClient.delete(url)).data;
    }
};

export default userService;
