import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';
import Header from './Header';

class Page extends React.Component {
    render() {
        const {isAuthorized} = this.props; // Авторизован ли пользователь

        return <div>
            <Header />

            <Content isAuthorized={isAuthorized} />

        </div>;
    }
}

Page.propTypes = {
    isAuthorized: PropTypes.bool
};

export default Page;