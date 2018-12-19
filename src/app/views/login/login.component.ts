import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {AuthenticateModel} from "../../models/authenticate.model";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: "app-dashboard",
    templateUrl: "login.component.html",
    providers: []
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    errorMessage = "";
    returnUrl = "/";

    constructor(private _title: Title,
                private _auth: AuthenticateModel,
                private _route: ActivatedRoute,
                private _router: Router) {
        this._title.setTitle("Login");
    }

    ngOnInit(): void {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.access_token) {
            this._router.navigate(['/']);
        }

        this.returnUrl = this._route.snapshot.queryParams['r'] || '/';
    }

    login() {
        this.loading = true;

        this._auth.login(this.model.username, this.model.password).pipe(first()).subscribe(
            user => {
                this.loading = false;
                this._router.navigate([this.returnUrl]);
            },
            error => {
                this.loading = false;
                this.errorMessage = error;
            }
        );
    }
}
