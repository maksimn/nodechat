import React from 'react';
import PropTypes from 'prop-types';

import AuthContent from './AuthContent';

class Content extends React.Component {
    render() {
        const {isAuthorized} = this.props;

        if (isAuthorized) {
            return <div>
                Пользователь авторизован
            </div>;
        } else if (isAuthorized === null) {
            return <div>
                Выполняется запрос данных...
            </div>;
        }

        return <AuthContent />;
    }
}

Content.propTypes = {
    isAuthorized: PropTypes.bool
};

export default Content;