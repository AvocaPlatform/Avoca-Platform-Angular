import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {appConfig} from "../config/appConfig";
import {map} from "rxjs/operators";

@Injectable()
export class AuthenticateModel {

    constructor(private _http: HttpClient) {

    }

    login(username: string, password: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const body = 'grant_type=password&client_id=' + appConfig.api.clientId
            + '&client_secret=' + appConfig.api.clientSecret
            + '&username=' + username
            + '&password=' + password;

        const url = appConfig.api.backEndUrl + '/Auth';

        return this._http.post<any>(url, body, {headers: headers}).pipe(map(
            token => {
                if (token && token.access_token) {
                    localStorage.setItem("currentUser", JSON.stringify(token));
                }

                return token;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    refresh(refresh_token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const body = 'grant_type=refresh_token&client_id=' + appConfig.api.clientId
            + '&client_secret=' + appConfig.api.clientSecret
            + '&refresh_token=' + refresh_token;

        const url = appConfig.api.backEndUrl + '/Auth/refresh_token';
        console.log(url);

        return this._http.post<any>(url, body, {headers: headers}).pipe(map(
            token => {
                if (token && token.access_token) {
                    localStorage.setItem("currentUser", JSON.stringify(token));
                }

                return token;
            }));
    }
}
