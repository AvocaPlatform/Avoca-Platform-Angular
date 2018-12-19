import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppStateService} from "./stores/app.state.service";
import {AuthenticateModel} from "./models/authenticate.model";
import {UserModel} from "./models/user.model";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [

    ],
    exports: [

    ],
    providers: [
        AuthenticateModel,
        UserModel,
        AppStateService
    ]
})
export class AvocaModule {
    static forRoot() {
        return {
            ngModule: AvocaModule,
            providers: []
        };
    }
}
