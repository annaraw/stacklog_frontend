export default class HttpService {

    static async get(url: string, onSuccess: any, onError: any) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        try {
            let resp: Response = await fetch(url, {
                method: 'GET',
                headers: header
            })
            
            if (this.checkIfUnauthorized(resp)) {
                window.location.href = "/login";
                return;
            }
            
            let responseJson = await resp.json();

            if (responseJson.error) {
                onError(responseJson.error);
            } else {
                if (responseJson.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = responseJson.token;
                }
                onSuccess(responseJson);
            }

        } catch (error) {
            onError(error.message);
        }

    }

    static async put(url: string, data: any, onSuccess: any, onError: any) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp: Response = await fetch(url, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data)
            })

            if (this.checkIfUnauthorized(resp)) {
                window.location.href = "/login";
                return;
            }

            let responseJson = await resp.json();

            if (responseJson.error) {
                onError(responseJson.error);
            } else {
                if (responseJson.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = responseJson.token;
                }
                onSuccess(responseJson);
            }
        } catch (error) {
            onError(error.message);
        }
    }

    static async post(url: string, data: any, onSuccess: any, onError: any) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp: Response = await fetch(url, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data)
            })

            let responseJson = await resp.json();

            if (this.checkIfUnauthorized(resp) && responseJson.message && responseJson.message !== "Wrong password") {
                window.location.href = "/login";
                return;
            }

            if (responseJson.error) {
                onError(responseJson.message);
            } else {
                if (responseJson.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = responseJson.token;
                }
                onSuccess(responseJson);
            }
        } catch (error) {
            onError(error.message);
        }
    }

    static async remove(url: string, onSuccess: any, onError: any) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        try {
            let resp: Response = await fetch(url, {
                method: 'DELETE',
                headers: header
            })

            if (this.checkIfUnauthorized(resp)) {
                window.location.href = "/login";
                return;
            }

            let responseJson = await resp.json();
            if (responseJson.error) {
                onError(responseJson.error);
            } else {
                onSuccess(responseJson)
            }
        } catch (error) {
            onError(error.message);
        }
    }

    static checkIfUnauthorized(res: Response) {
        if (res.status === 401) {
            return true;
        }
        return false;
    }

}