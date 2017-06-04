import React from 'react';
import {connect} from 'react-redux';
import {checkIfUserAuthorized} from './actions/authorization';

class Application extends React.Component {
    componentWillMount() {
        this.props.dispatch(checkIfUserAuthorized());
    }

    render() {
        const {isAuthorized} = this.props; // Авторизован ли пользователь

        if (isAuthorized) {
            return <div>
                <h1>Node.js чат</h1>
                <div>Пользователь авторизован</div>
            </div>;
        } else if (isAuthorized === null) {
            return <div>
                <h1>Node.js чат</h1>
                <div>Выполняется запрос...</div>
            </div>;
        }

        return <div>
            <h1>Node.js чат</h1>
            <div>Пользователь не авторизован</div>
        </div>;
    }
}

export default connect(store => {
    return {
        isAuthorized: store.isAuthorized
    };
})(Application);