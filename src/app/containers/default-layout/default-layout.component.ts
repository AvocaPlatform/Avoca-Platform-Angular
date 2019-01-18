import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {navItems} from "./../../_nav";
import {AppStateService} from "../../stores/app.state.service";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {appConfig} from "../../config/appConfig";

@Component({
    selector: "app-dashboard",
    templateUrl: "./default-layout.component.html"
})
export class DefaultLayoutComponent implements OnInit, AfterViewChecked {
    public navItems = navItems;
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement = document.body;

    adminUrl = appConfig.api.adminUrl;
    loading = false;
    user: any = {};

    constructor(private _app: AppStateService,
                private cdRef: ChangeDetectorRef,
                private _router: Router,
                private _user: UserModel) {

        this.changes = new MutationObserver((mutations) => {
            this.sidebarMinimized = document.body.classList.contains("sidebar-minimized");
        });

        this.changes.observe(<Element>this.element, {
            attributes: true
        });
    }

    ngOnInit(): void {
        this._app.getState().subscribe(
            app => {
                //console.log(app);
                this.loading = app.loading;
            }
        );

        this.getUser();
    }

    getUser() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.access_token) {
            this._user.getInfo(currentUser.access_token).subscribe(
                res => {
                    this.user = res.data && res.data.user || {};
                }
            );
        } else {
            if (this._router.url.indexOf('/login') < 0) {
                this._router.navigate(['/login'], {queryParams: {r: this._router.url}});
            }
        }
    }

    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }
}
