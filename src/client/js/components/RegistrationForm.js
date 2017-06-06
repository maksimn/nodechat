import React from 'react';
import {connect} from 'react-redux';

import {submitRegistrationData} from '../actions/authorization';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.onRegistrationDataSubmit = this.onRegistrationDataSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            name: '',
            password: '',
            confirmPassword: null
        });
    }

    onRegistrationDataSubmit(e) {
        e.preventDefault();

        const {name, password, confirmPassword} = this.state,
            {dispatch} = this.props;
        
        dispatch(submitRegistrationData(name, password, confirmPassword));
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

    onConfirmPasswordChange(e) {
        this.setState({
            ...this.state, 
            confirmPassword: e.target.value
        });
    }

    render() {
        return <form onSubmit={this.onRegistrationDataSubmit}>

            <div>
                <div>Имя: </div>
                <div>
                    <input type="text" onChange={this.onNameChange} />
                </div>
            </div>
            <div>
                <div>Пароль: </div>
                <div>
                    <input type="password" onChange={this.onPasswordChange} />
                </div>
            </div>
            <div>
                <div>Повтор пароля: </div>
                <div>
                    <input type="password" onChange={this.onConfirmPasswordChange} />
                </div>
            </div>
            <div>
                <input type="submit" value="Зарегистрироваться" />
            </div>

        </form>;
    }
}

export default connect()(RegistrationForm);