import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ChatMessage from './ChatMessage';
import {getChatMessages} from '../../actions/chat';

class ChatMessages extends React.Component {
    constructor(props) {
        super(props);

        this.chatMessagesDiv = null;
        this.isScrolledFromBottomPos = false;
    }

    componentWillMount() {
        this.props.dispatch(getChatMessages());
    }

    componentDidMount() {
        setInterval(this.updateScroll.bind(this), 300);
    }

    updateScroll() {
        const {chatMessagesDiv} = this;

        if (!(this.isScrolledFromBottomPos) && chatMessagesDiv) {
            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
        }
    }

    scrollHandler(e) {
        const chatMessagesDiv = e.target;
        this.isScrolledFromBottomPos = 
            chatMessagesDiv.clientHeight + chatMessagesDiv.scrollTop !== 
            chatMessagesDiv.scrollHeight;
    }

    render() {
        const messages = this.props.messages ? this.props.messages : [];
        const chatMessages = messages.map((message, ind) => (
            <ChatMessage key={ind} message={message} />
        ));

        return <div className="chat-room__chat-messages"
                    onScroll={ this.scrollHandler.bind(this) }
                    ref={ div => { this.chatMessagesDiv = div; }}>
            {chatMessages}
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