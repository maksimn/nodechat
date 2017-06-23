import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {logout} from '../actions/authorization';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        this.props.dispatch(logout());
    }

    render() {
        const {isAuthorized, userName} = this.props;

        return <div className="header">
            <h1 className="header__title">Node.js чат</h1>

            {isAuthorized ?

                <div className="header__username">
                    {userName} 
                    <span className="header__logout-button">
                        <button onClick={this.onLogoutClick}>Выйти</button>
                    </span>
                </div>
                
                : null}
        </div>;
    }
}

Header.propTypes = {
    isAuthorized: PropTypes.bool,
    userName: PropTypes.string,
    dispatch: PropTypes.func
};

export default connect(state => ({
    isAuthorized: state.auth.isAuthorized,
    userName: state.user.name
}))(Header);