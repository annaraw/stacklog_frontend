import HttpService from "./HttpService";
import { backendserverURL } from "../util/constants";

export default class CalendarImportService {

    static baseURL() { return backendserverURL + "/calendar/"; }

    static getCalendars() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${CalendarImportService.baseURL()}`, 
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

    static addCalendar(item: String) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${CalendarImportService.baseURL()}`, 
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

    static removeCalendar(id: string) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${CalendarImportService.baseURL()}${id}`, 
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