/**
 * Created by sidchik on 28.03.17.
 */
export const SET_ROUTING = 'SET_ROUTING';
export const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE';
export const PUSH_ROUTING = 'PUSH_ROUTING';
export const SET_KWARGS_ROUTING = 'SET_KWARGS_ROUTING';

export function _setRouting(payload) {
    return { type: SET_ROUTING, payload: payload };
}

export function pushPath(path, state) {
    return {
        type: PUSH_ROUTING, payload: {
            path: path,
            state: state
        }
    };
}

export function setRouteKwargs(path, name, kwargs) {
    return {
        type: SET_KWARGS_ROUTING, payload: {
            path: path,
            absName: name,
            kwargs: kwargs
        }
    };
}

export function setCurrentRoute(route) {
    return {
        type: SET_CURRENT_ROUTE, payload: {
            currentRoute: route
        }
    };
}