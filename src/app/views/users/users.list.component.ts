import {Component, OnInit} from "@angular/core";
import {UserModel} from "../../models/user.model";
import {AppStateService} from "../../stores/app.state.service";
import {Title} from "@angular/platform-browser";
import {createPagination} from '../../helpers/avoca.helper';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    templateUrl: "users.list.component.html",
    providers: []
})
export class UsersListComponent implements OnInit {

    model: any = {};
    search: any = {};
    order = {
        by: 'id',
        asc: true
    };

    params: any = {};

    pagination = {
        page: 1,
        total: 1,
        per_page: 0,
    };

    offset: number = 0;
    total_pages = [];

    constructor(private _title: Title,
                private _app: AppStateService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _user: UserModel) {
        this._title.setTitle('Users')
    }

    ngOnInit(): void {
        this._app.loading();
        this._route.params.subscribe(params => {
            // search
            this.params = params;

            // pagination
            this.offset = params.offset || 0;

            // order by
            this.order.by = params.order_by || 'id';
            this.order.asc = (params.order && params.order === 'asc');

            this.getUsers();
        });
    }

    getUsers() {
        this._app.loading();
        this._user.getList(this.search, this.order, this.offset).subscribe(
            data => {
                if (!data.error) {
                    this.model = data.data && data.data.list || {};
                    if (this.model.total) {
                        this.offset = this.model.offset;
                        this.pagination = createPagination(this.model.total, this.model.per_page, this.offset);
                        if (this.pagination.total > 0) {
                            this.total_pages = new Array(this.pagination.total);
                        }
                    }
                }

                this._app.loaded();
            }
        );
    }

    addParams(name, value) {
        let params = {...this.params};
        params[name] = value;
        return params;
    }

    onSort(name) {
        let params = {...this.params};
        params.order_by = name;
        params.order = this.order.asc ? 'desc' : 'asc';
        return this._router.navigate(['/users', params]);
    }

    getOrderClass(name) {
        if (this.order.by === name) {
            return this.order.asc ? 'asc' : 'desc';
        }

        return '';
    }

    onSearch() {
        const params = {...this.params, ...this.search};
        return this._router.navigate(['/users', params]);
    }
}
