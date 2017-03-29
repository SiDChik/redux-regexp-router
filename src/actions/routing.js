/**
 * Created by sidchik on 28.03.17.
 */
export const SET_ROUTING = 'SET_ROUTING';
export const PUSH_ROUTING = 'PUSH_ROUTING';
export const SET_KWARGS_ROUTING = 'SET_KWARGS_ROUTING';

export function _setRouting(payload) {
    return {type: SET_ROUTING, payload: payload};
}

export function pushPath(path, state) {
    return {type: PUSH_ROUTING, payload: {
        path: path,
        state: state
    }};
}

export function setRouteKwargs(path, kwargs) {
    return {type: SET_KWARGS_ROUTING, payload: {
        path: path,
        kwargs: kwargs
    }};
}