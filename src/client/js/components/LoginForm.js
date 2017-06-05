import React from 'react';

export default class LoginForm extends React.Component {
    render() {
        return <form>

            <div>
                <div>Имя: </div>
                <div>
                    <input type="text" />
                </div>
            </div>
            <div>
                <div>Пароль: </div>
                <div>
                    <input type="password" />
                </div>
            </div>
            <div>
                <input type="submit" value="Войти" />
            </div>

        </form>;
    }
}