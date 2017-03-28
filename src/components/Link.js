/**
 * Created by sidchik on 28.03.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { pushPath } from '../actions/routing';
class Link extends React.Component {
    getLink = () => {
        let link = this.props.to;
        if (this.props.routing.historyType == 'hash') link = '#' + link;
        return link;
    };

    onClick = (ev) => {
        ev.preventDefault();
        this.props.dispatch(pushPath(this.props.to));
    };

    render() {
        return <a href={this.getLink()} onClick={this.onClick}>{this.props.children}</a>
    }
}

export default connect(state => ({routing: state.routing}))(Link);