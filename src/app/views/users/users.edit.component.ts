import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AppStateService} from "../../stores/app.state.service";
import {UserModel} from "../../models/user.model";

@Component({
    templateUrl: 'users.edit.component.html'
})
export class UsersEditComponent implements OnInit {

    private sub: any;

    title: string = 'Create user';
    userId: number = 0;
    model: any = {};

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _app: AppStateService,
                private _user: UserModel) {

    }

    ngOnInit(): void {

        this.sub = this._route.params.subscribe(
            params => {
                this.userId = params['id'] || 0;
            }
        );

        if (this.userId) {
            this._user.getById(this.userId).subscribe(
                user => {
                    this.model = user.data && user.data.record || {};
                    this.title = 'Edit: ' + user.username;
                }
            );
        }
    }

    save() {
        this._app.loading();
        if (this._user.valid(this.model)) {
            this._user.save(this.model).subscribe(
                res => {
                    this._app.loaded();
                    this._router.navigate(['/users']);
                }
            );
        }
    }
}
