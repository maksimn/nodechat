import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Header extends React.Component {
    render() {
        const {isAuthorized, userName} = this.props;

        return <div className="header">
            <h1 className="header__title">Node.js чат</h1>
            {isAuthorized ? 
                <div className="header__username">{userName}</div> 
                : 
                null}
        </div>;
    }
}

Header.propTypes = {
    isAuthorized: PropTypes.bool,
    userName: PropTypes.string
};

export default connect(state => ({
    isAuthorized: state.auth.isAuthorized,
    userName: state.user.name
}))(Header);