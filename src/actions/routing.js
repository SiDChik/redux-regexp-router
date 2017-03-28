/**
 * Created by sidchik on 28.03.17.
 */
export const SET_ROUTING = 'SET_ROUTING';
export const PUSH_ROUTING = 'PUSH_ROUTING';

export function _setRouting(payload) {
    return {type: SET_ROUTING, payload: payload};
}

export function pushPath(path, state) {
    return {type: PUSH_ROUTING, payload: {
        path: path,
        state: state
    }};
}