import { IChangePasswordRequest } from "../../models/changePasswordRequest";
import { IForgotPasswordRequest } from "../../models/forgotPasswordRequest";
import { ILogin } from "../../models/login";
import { ILoginResponse } from "../../models/loginResponse";
import { IResponse } from "../../models/reponse";
import { IResetPasswordRequest } from "../../models/resetPasswordRequest";
import { IUser } from "../../models/user";
import axiosClient from "../axiosClient";

const ROUTE = 'auth';
const authService = {
    async login(body: ILogin): Promise<IResponse<ILoginResponse>> {
        const url = `${ROUTE}/login?fields=["$all"]`;
        return (await axiosClient.post(url, body)).data;
    },
    async register(body: ILogin): Promise<IResponse<ILoginResponse>> {
        const url = `${ROUTE}/register?fields=["$all"]`;
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
    async updateProfile(body: any): Promise<IResponse<IUser>> {
        const url = `${ROUTE}/profile?fields=["$all"]`;
        const token = localStorage.getItem('accessToken');
        return (await axiosClient.put(url, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    },
    async changePassword(body: IChangePasswordRequest): Promise<IResponse<IUser>> {
        const url = `${ROUTE}/change_password?fields=["$all"]`;
        const token = localStorage.getItem('accessToken');
        return (await axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    },
    async forgotPassword(body: IForgotPasswordRequest): Promise<IResponse<IUser>> {
        const url = `${ROUTE}/forgot_password?fields=["$all"]`;
        const token = localStorage.getItem('accessToken');
        return (await axiosClient.post(url, body)).data;
    },
    async resetPassword(body: IResetPasswordRequest): Promise<IResponse<IUser>> {
        const url = `${ROUTE}/reset_password?fields=["$all"]`;
        const token = localStorage.getItem('accessToken');
        return (await axiosClient.post(url, body)).data;
    }
};

export default authService;
