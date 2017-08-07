/**
 * Created by sidchik on 29.03.17.
 */
import React from 'react';
import PropTypes from 'prop-types';

export function addToContext(module, data) {
    if (!module.contextTypes) module.contextTypes = {};
    Object.assign(module.contextTypes, data);
};

export function addRoutingContext(module) {
    addToContext(module, {
        getChildLocation: PropTypes.func,
        getRouteLocation: PropTypes.func,
        matchedRoute: PropTypes.object,
        routeArgs: PropTypes.array,
        getRouteKwargs: PropTypes.func,
        routePath: PropTypes.string,
    });
};