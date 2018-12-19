import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Loaded, Loading} from "./app.action";

@Injectable()
export class AppStateService {

    app$: Observable<any>;

    constructor(private _store: Store<any>) {
        this.app$ = this._store.pipe(select('app'));
    }

    getState() {
        return this.app$;
    }

    loading() {
        this._store.dispatch(new Loading());
    }

    loaded() {
        this._store.dispatch(new Loaded());
    }
}
