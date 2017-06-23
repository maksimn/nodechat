import React from 'react';

import ChatMessageInput from './ChatMessageInput';
import ChatMessages from './ChatMessages';

class Chat extends React.Component {
    render() {
        return <div className="chat-room">

            <div className="chat-room__header"></div>

            <ChatMessages />

            <ChatMessageInput />
            
        </div>;
    }
}

export default Chat;