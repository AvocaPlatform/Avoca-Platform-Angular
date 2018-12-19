import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UsersListComponent} from "./users.list.component";
import {UsersRoutingModule} from "./users-routing.module";
import {AvocaModule} from "../../avoca.module";
import {UsersDetailComponent} from "./users.detail.component";
import {UsersEditComponent} from "./users.edit.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UsersRoutingModule,
        AvocaModule.forRoot(),
    ],
    providers: [],
    declarations: [
        UsersListComponent,
        UsersDetailComponent,
        UsersEditComponent,
    ],
})
export class UsersModule {

}
