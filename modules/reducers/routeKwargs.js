/**
 * Created by sidchik on 28.03.17.
 */
import { SET_KWARGS_ROUTING } from '../actions/routing';
const initialState = {};

export default function history(state = initialState, action) {
    let { payload } = action;
    switch (action.type) {
        case SET_KWARGS_ROUTING:
            let newState = Object.assign({}, state);
            let path = payload.path;
            if (path.substr(-1) == '/'){
                path = path.slice(0, -1);
            }
            newState[path] = payload.kwargs;
            if (payload.absName) {
                newState[payload.absName] = payload.kwargs;
            }
            return newState;
    }
    return state;
}
