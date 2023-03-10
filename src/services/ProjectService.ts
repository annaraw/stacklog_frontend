import HttpService from "./HttpService";
import { backendserverURL } from "../util/constants";
import { IProjectRequest, IProjectUpdateProps } from "../models/models";

export default class ProjectService {

    static baseURL() { return backendserverURL + "/project/"; }

    static getProjects() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ProjectService.baseURL()}`,
                function (data: any) {
                    if (!data) {
                        reject("Error while retrieving Items");
                    }
                    resolve(data);
                }, function (textStatus: string) {
                    reject(textStatus);
                });
        });
    }

    static getProjectById(id: string) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ProjectService.baseURL()}${id}`,
                function (data: any) {
                    if (!data) {
                        reject("Error while retrieving Item");
                    }
                    resolve(data);
                }, function (textStatus: string) {
                    reject(textStatus);
                });
        });
    }

    static addProject(item: IProjectRequest) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${ProjectService.baseURL()}`,
                item,
                function (data: any) {
                    if (!data) {
                        reject("Error while retrieving Item");
                    }
                    resolve(data);
                }, function (textStatus: string) {
                    reject(textStatus);
                });
        });
    }

    static updateProject(itemID: string, item: IProjectUpdateProps) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${ProjectService.baseURL()}${itemID}`,
                item,
                function (data: any) {
                    if (!data) {
                        reject("Error while retrieving Item");
                    }
                    resolve(data);
                }, function (textStatus: string) {
                    reject(textStatus);
                });
        });
    }

    static removeProject(id: string) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${ProjectService.baseURL()}${id}`,
                function (data: any) {
                    if (!data.message) {
                        reject("Error while retrieving Item");
                    }
                    resolve(data.message);
                }, function (textStatus: string) {
                    reject(textStatus);
                });
        });
    }
}