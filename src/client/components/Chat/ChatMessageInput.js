import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {emitNewChatMessage} from '../../sockets';

class ChatMessageInput extends React.Component {
    componentWillMount() {
        this.setState({text: ''});
    }

    onMessageSubmit(e) {
        const enter = 13;

        if (e.keyCode === enter) {
            const {username} = this.props, {text} = this.state;
            this.setState({text: ''});
            emitNewChatMessage(username, text);
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
    username: PropTypes.string
};

export default connect(state => ({
    username: state.user.name
}))(ChatMessageInput);