import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ChatMessage from './ChatMessage';
import {getChatMessages} from '../../actions/chat';

class ChatMessages extends React.Component {
    componentWillMount() {
        this.props.dispatch(getChatMessages());
    }

    render() {
        const messages = this.props.messages ? this.props.messages : [];

        return <div className="chat-room__chat-messages">
            {messages.map(
                (message, ind) => (
                    <ChatMessage key={ind} message={message} />                
                ))}
        </div>;
    }
}

ChatMessages.propTypes = {
    dispatch: PropTypes.func,
    messages: PropTypes.array
};

export default connect(
    state => ({messages: state.chatMessages})
)(ChatMessages);