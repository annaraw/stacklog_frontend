import HttpService from "./HttpService";
import { backendserverURL } from "../util/constants";
import { IUser } from "../models/models";

export default class UserService {

    static baseURL() { return backendserverURL + "/user"; }

    static register(user: IUser) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, {
                user: user,
            }, function (data: any) {
                resolve(data);
            }, function (textStatus: string) {
                reject(textStatus);
            });
        });
    }

    static login(user: string, pass: string) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/`, {
                username: user,
                password: pass
            }, function (data: any) {
                resolve(data);
            }, function (textStatus: string) {
                reject(textStatus);
            });
        });
    }

    static logout() {
        window.localStorage.removeItem('jwtToken');
        window.location.href = "/"
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id: JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username
        };
    }

    static getColleagues() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${UserService.baseURL()}/colleagues`,
                function (data: any) {
                    resolve(data);
                }, function (textStatus: string) {
                    reject(textStatus);
                });
        });
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}