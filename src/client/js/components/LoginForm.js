import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ValidationErrors from './ValidationErrors';
import {submitLoginData} from '../actions/authorization';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.onLoginDataSubmit = this.onLoginDataSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            name: '',
            password: ''
        });
    }

    onLoginDataSubmit(e) {
        e.preventDefault();

        const {name, password} = this.state,
            {dispatch} = this.props;
        
        dispatch(submitLoginData(name, password));
    }

    onNameChange(e) {
        this.setState({
            ...this.state, 
            name: e.target.value
        });
    }

    onPasswordChange(e) {
        this.setState({
            ...this.state, 
            password: e.target.value
        });
    }

    render() {
        return <form onSubmit={this.onLoginDataSubmit}>

            <div className="auth-form__field">
                <div>Имя: </div>
                <div>
                    <input type="text" onChange={this.onNameChange} />
                </div>
            </div>
            <div className="auth-form__field">
                <div>Пароль: </div>
                <div>
                    <input type="password" onChange={this.onPasswordChange} />
                </div>
            </div>

            <ValidationErrors />

            <div className="auth-form__field">
                <input type="submit" value="Войти" />
            </div>

        </form>;
    }
}

LoginForm.propTypes = {
    dispatch: PropTypes.func
};

export default connect()(LoginForm);