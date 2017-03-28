/**
 * Created by sidchik on 28.03.17.
 */
import { PUSH_ROUTING, SET_ROUTING } from '../actions/routing';
const initialState = {
    history: null,
    matches: [],
    location: null,
    query: null,
    state: null,
};

export default function history(state = initialState, action) {
    switch (action.type) {
        case SET_ROUTING:
            return Object.assign({}, state, action.payload);
        case PUSH_ROUTING:
            state.history.push(action.payload.path, action.payload.state);
            break;
    }
    return state;
}
