import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../config/appConfig";

@Injectable()
export class UserModel {

    private uri = appConfig.api.backEndUrl;

    constructor(private _http: HttpClient) {

    }

    getList(search: any = {}, order: any = {}, offset: number = 0): any {
        const url = this.uri + '/Users';

        let params = {...search, offset: offset};
        if (order.by) {
            params.order_by = order.by;
            params.order = order.asc ? 'asc' : 'desc';
        }

        return this._http.get(url, {params: params});
    }

    getById(id: number) {
        const url = this.uri + '/Users/' + id;
        return this._http.get<any>(url);
    }

    valid(user: any) {
        if (!user.username || !user.password) {
            return false;
        }

        return true;
    }

    save(user: any) {
        const url = this.uri + '/Users';
        return this._http.post<any>(url, user);
    }

    getInfo(token: string) {
        const url = this.uri + '/Users/profile/' + token;
        return this._http.get<any>(url);
    }
}
