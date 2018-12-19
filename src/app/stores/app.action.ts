import {Action} from "@ngrx/store";

export const LoadingTypes = {
    Loading: 'Loading',
    Loaded: 'Loaded'
};

export class Loading implements Action {
    readonly type = LoadingTypes.Loading;
}

export class Loaded implements Action {
    readonly type = LoadingTypes.Loaded;
}
