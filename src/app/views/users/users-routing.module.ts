import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UsersListComponent} from "./users.list.component";
import {UsersDetailComponent} from "./users.detail.component";
import {UsersEditComponent} from "./users.edit.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Users'
        },
        children: [
            {
                path: '',
                component: UsersListComponent,
                data: {
                    title: 'All Users'
                }
            },
            {
                path: 'detail/:id',
                component: UsersDetailComponent,
                data: {
                    title: 'Detail user'
                }
            },
            {
                path: 'create',
                component: UsersEditComponent,
                data: {
                    title: 'Create user'
                }
            },
            {
                path: 'edit/:id',
                component: UsersEditComponent,
                data: {
                    title: 'Edit user'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {

}
