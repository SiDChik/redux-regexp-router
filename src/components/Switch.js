/**
 * Created by sidchik on 28.03.17.
 */
import React from 'react';
import { getMatchInfo } from '../helpers/matcher';
import { connect } from 'react-redux';
import { addRoutingContext } from '../helpers/context';
import { get } from 'lodash';

class Switch extends React.Component {
    getRouteLocation() {
        const context = this.context;
        if (!this.props.absolute && context && context.getChildLocation) return context.getChildLocation();

        return get(this, 'props.routing.location.pathname', '');
    }

    render() {
        const childrens = React.Children.toArray(this.props.children);

        const lastIndex = childrens.length - 1;
        for (let childIndex in childrens) {
            let childIndex = parseInt(childIndex);
            let child = childrens[childIndex];
            // if (child.type.WrappedComponent.name === 'Route') {
            let props = child.props;

            let kwargs = this.context.getRouteKwargs ? this.context.getRouteKwargs() : {};

            if (!props.path && childIndex === lastIndex) {
                // Not Found Route
                return React.cloneElement(child, { kwargs: kwargs });
            }

            if (getMatchInfo(this.getRouteLocation(), props.path)) {
                return React.cloneElement(child, { kwargs: kwargs });
            }

            // } else {
            //     console.error('Switch accepts only Route children');
            // }
        }

        return null;
    }
}

addRoutingContext(Switch);

export default connect(state => ({ routing: state.routing }))(Switch);