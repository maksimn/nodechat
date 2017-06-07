import React from 'react';

export default class LoginForm extends React.Component {
    render() {
        return <form>

            <div className="auth-form__field">
                <div>Имя: </div>
                <div>
                    <input type="text" />
                </div>
            </div>
            <div className="auth-form__field">
                <div>Пароль: </div>
                <div>
                    <input type="password" />
                </div>
            </div>
            <div className="auth-form__field">
                <input type="submit" value="Войти" />
            </div>

        </form>;
    }
}