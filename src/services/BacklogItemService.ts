import HttpService from "./HttpService";
import { backendserverURL } from "../util/constants";
import { IBacklogItem } from "../models/models";

export default class BacklogItemService {

    static baseURL() { return backendserverURL + "/backlog/"; }

    static getBacklogItems() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${BacklogItemService.baseURL()}`, 
            function (data: any) {
                if(!data){
                    reject("Error while retrieving Items");
                }
                resolve(data);
            }, function (textStatus: string) {
                reject(textStatus);
            });
        });
    }

    static getBacklogItemById(id: string) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${BacklogItemService.baseURL()}${id}`, 
            function (data: any) {
                if(!data){
                    reject("Error while retrieving Item");
                }
                resolve(data);
            }, function (textStatus: string) {
                reject(textStatus);
            });
        });
    }

    static getProjectBacklogItems(projectID: string) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${BacklogItemService.baseURL()}projects/${projectID}`, 
            function (data: any) {
                if(!data){
                    reject("Error while retrieving Items");
                }
                resolve(data);
            }, function (textStatus: string) {
                reject(textStatus);
            });
        });
    }

    static addBacklogItem(item: IBacklogItem) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${BacklogItemService.baseURL()}`, 
            item,
            function (data: any) {
                if(!data){
                    reject("Error while retrieving Item");
                }
                resolve(data);
            }, function (textStatus: string) {
                reject(textStatus);
            });
        });
    }

    static updateBacklogItem(item: IBacklogItem) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${BacklogItemService.baseURL()}${item.id}`, 
            item,
            function (data: any) {
                if(!data){
                    reject("Error while retrieving Item");
                }
                resolve(data);
            }, function (textStatus: string) {
                reject(textStatus);
            });
        });
    }

    static removeBacklogItem(id: string) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${BacklogItemService.baseURL()}${id}`, 
            function (data: any) {
                if(!data.message){
                    reject("Error while retrieving Item");
                }
                resolve(data.message);
            }, function (textStatus: string) {
                reject(textStatus);
            });
        });
    }
}