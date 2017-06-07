import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default class AuthContent extends React.Component {
    render() {
        return <div className="auth-content">
            <Tabs>
                <TabList>
                    <Tab>Вход</Tab>
                    <Tab>Регистрация</Tab>
                </TabList>

                <TabPanel>

                    <LoginForm />

                </TabPanel>
                <TabPanel>

                    <RegistrationForm />

                </TabPanel>
            </Tabs>
        </div>;
    }
}