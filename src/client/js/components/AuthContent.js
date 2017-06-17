import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import {setAuthPageActiveTab} from '../actions/authorization';

class AuthContent extends React.Component {
    onTabSelected(index) {
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

AuthContent.propTypes = {
    dispatch: PropTypes.func,
    selectedTabIndex: PropTypes.number
};

export default connect(state => {
    return {
        selectedTabIndex: state.auth.authActiveTabIndex
    };
})(AuthContent);