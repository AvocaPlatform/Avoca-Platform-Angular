import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {AppStateService} from "../../stores/app.state.service";
import {UserModel} from "../../models/user.model";

@Component({
    templateUrl: 'users.detail.component.html'
})
export class UsersDetailComponent implements OnInit {

    private sub: any;

    userId: number = 0;
    model: any = {};

    constructor(private _title: Title,
                private _route: ActivatedRoute,
                private _app: AppStateService,
                private _user: UserModel) {
        this._title.setTitle('User detail');
    }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                this.userId = params['id'];
            }
        );

        this.getUser();
    }

    getUser() {
        this._app.loading();
        this._user.getById(this.userId).subscribe(
            user => {
                if (!user.error) {
                    this.model = user.data.record;
                    this._title.setTitle(this.model.username);
                    this._app.loaded();
                }
            }
        )
    }

}
