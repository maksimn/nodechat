import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Page from './components/Page';
import {checkIfUserAuthorized} from './actions/authorization';

class Application extends React.Component {
    constructor(props) {
        super(props);

        props.dispatch(checkIfUserAuthorized());
    }

    render() {
        return <Page isAuthorized={this.props.isAuthorized} />;
    }
}

Application.propTypes = {
    isAuthorized: PropTypes.bool
};

export default connect(store => {
    return {
        isAuthorized: store.isAuthorized
    };
})(Application);