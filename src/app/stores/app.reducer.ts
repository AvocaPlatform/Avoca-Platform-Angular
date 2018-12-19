import {Action} from "@ngrx/store";
import {LoadingTypes} from "./app.action";

export const initAppState = {
    loading: false
};

export function appReducer(state = initAppState, action: Action) {

    switch (action.type) {

        case LoadingTypes.Loading: {
            return Object.assign({}, state, {loading: true});
        }

        case LoadingTypes.Loaded: {
            return Object.assign({}, state, {loading: false});
        }

        default: {
            return state;
        }
    }
}
