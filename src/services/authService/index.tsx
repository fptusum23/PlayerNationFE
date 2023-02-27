import { ILogin } from "../../models/login";
import { ILoginResponse } from "../../models/loginResponse";
import { IResponse } from "../../models/reponse";
import { IUser } from "../../models/user";
import axiosClient from "../axiosClient";

const ROUTE = 'auth';
const authService = {
    async login(body: ILogin): Promise<IResponse<ILoginResponse>> {
        const url = `${ROUTE}/login?fields=["$all"]`;
        return (await axiosClient.post(url, body)).data;
    },
    async info(): Promise<IResponse<IUser>> {
        const url = `${ROUTE}/info?fields=["$all"]`;
        const token = localStorage.getItem('accessToken');
        return (await axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    },
};

export default authService;
