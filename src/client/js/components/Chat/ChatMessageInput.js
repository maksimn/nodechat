import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import socketClient from 'socket.io-client';

import {NEW_CHAT_MESSAGE} from '../../actions/constants';
import {newChatMessageAction, createChatMessage} from '../../actions/chat';

const socket = socketClient('http://localhost:8000');

class ChatMessageInput extends React.Component {
    componentWillMount() {
        this.setState({text: ''});
    }

    componentDidMount() {
        const {dispatch} = this.props;

        socket.on(NEW_CHAT_MESSAGE, newMessage => {
            dispatch(newChatMessageAction(newMessage));    
        });
    }

    onMessageSubmit(e) {
        const enter = 13;

        if (e.keyCode === enter) {
            const {username} = this.props;

            this.setState({text: ''});

            socket.emit(NEW_CHAT_MESSAGE, createChatMessage(username, this.state.text));
        }
    }

    onMessageChange(e) {
        this.setState({text: e.target.value});
    }

    render() {
        return <div className="chat-room__chat-message-input">
            <textarea
                onKeyUp={ this.onMessageSubmit.bind(this) }
                onChange={ this.onMessageChange.bind(this) }
                className="chat-message-input__textbox"
                maxLength="500"
                placeholder="Напишите сообщение..."
                value={ this.state.text }>
            </textarea>
        </div>;
    }
}

ChatMessageInput.propTypes = {
    username: PropTypes.string,
    dispatch: PropTypes.func
};

export default connect(state => ({
    username: state.user.name
}))(ChatMessageInput);