/**
 * Created by sidchik on 28.03.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { pushPath } from '../actions/routing';
import { addRoutingContext } from '../helpers/context';
class Link extends React.Component {
    getLink = () => {
        let link = this.props.to;
        if (this.props.to.substr(0, 1) !== '/') {
            let parentLocation = (this.context.getRouteLocation?this.context.getRouteLocation():'');
            link = parentLocation + link;
        }
        return link;
    };

    getHrefLink = () => {
        let link = this.getLink();
        if (this.props.routing.historyType == 'hash') link = '#' + link;
        return link;
    };

    onClick = (ev) => {
        ev.preventDefault();
        this.props.dispatch(pushPath(this.getLink()));
    };

    render() {
        return <a href={this.getHrefLink()} onClick={this.onClick}>{this.props.children}</a>
    }
}

addRoutingContext(Link);

export default connect(state => ({routing: state.routing}))(Link);