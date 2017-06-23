import React from 'react';
import PropTypes from 'prop-types';

class ChatMessage extends React.Component {
    render() {
        const {username, text} = this.props.message;

        return <div className="chat-message">
            <div className="chat-message__username">{username}</div>
            <div className="chat-message__text">{text}</div>
        </div>;
    }
}

ChatMessage.propTypes = {
    message: PropTypes.object
};

export default ChatMessage;