/**
 * Created by sidchik on 29.03.17.
 */
import React from 'react';
export function addToContext(module, data) {
    if (!module.contextTypes) module.contextTypes = {};
    Object.assign(module.contextTypes, data);
};

export function addRoutingContext(module) {
    addToContext(module, {
        getChildLocation: React.PropTypes.func,
        getRouteLocation: React.PropTypes.func,
        matchedRoute: React.PropTypes.object,
        routeArgs: React.PropTypes.array,
        getRouteKwargs: React.PropTypes.func,
        routePath: React.PropTypes.string,
    });
};