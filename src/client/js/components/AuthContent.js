import React from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import {setAuthPageActiveTab} from '../actions/authorization';

class AuthContent extends React.Component {
    onTabSelected(index, lastIndex, event) {
        this.props.dispatch(setAuthPageActiveTab(index));
    }

    render() {
        const {selectedTabIndex} = this.props;

        return <div className="auth-content">
            <Tabs 
                  onSelect={this.onTabSelected.bind(this)} 
                  selectedIndex={selectedTabIndex}>

                <TabList>
                    <Tab>
                        Вход
                    </Tab>
                    <Tab>
                        Регистрация
                    </Tab>
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

export default connect(state => {
    return {
        selectedTabIndex: state.authPageActiveTabIndex
    };
})(AuthContent);