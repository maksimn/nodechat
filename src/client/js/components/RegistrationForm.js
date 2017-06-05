import React from 'react';

export default class RegistrationForm extends React.Component {
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
                <div>Повтор пароля: </div>
                <div>
                    <input type="password" />
                </div>
            </div>
            <div>
                <input type="submit" value="Зарегистрироваться" />
            </div>

        </form>;
    }
}