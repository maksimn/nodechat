import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';

class Page extends React.Component {
    render() {
        const {isAuthorized} = this.props; // Авторизован ли пользователь

        return <div>
            <div className="header">
                <h1 className="header__title">Node.js чат</h1>
            </div>

            <Content isAuthorized={isAuthorized} />

        </div>;
    }
}

Page.propTypes = {
    isAuthorized: PropTypes.bool
};

export default Page;