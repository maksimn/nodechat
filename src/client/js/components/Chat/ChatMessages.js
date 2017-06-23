import React from 'react';
import ChatMessage from './ChatMessage';

const messages = [
    <ChatMessage key={0} message={ {id: 0, username: 'User1', text: 'ABC eee eee ABC eee eee ABC eee eee ABC eee eee ABC eee eeeABC eee eee'} } />,
    <ChatMessage key={1} message={ {id: 1, username: 'User1', text: 'ABC234'} } />,
    <ChatMessage key={2} message={ {id: 2, username: 'User2', text: 'XZ'} } />,
    <ChatMessage key={3} message={ {id: 0, username: 'User1', text: 'ABC eee eee ABC eee eee ABC eee eee ABC eee eee ABC eee eeeABC eee eee'} } />,
    <ChatMessage key={4} message={ {id: 1, username: 'User1', text: 'ABC234'} } />,
    <ChatMessage key={5} message={ {id: 2, username: 'User2', text: 'XZ'} } />,
    <ChatMessage key={6} message={ {id: 0, username: 'User1', text: 'ABC eee eee ABC eee eee ABC eee eee ABC eee eee ABC eee eeeABC eee eee'} } />,
    <ChatMessage key={7} message={ {id: 1, username: 'User1', text: 'ABC234'} } />,
    <ChatMessage key={8} message={ {id: 2, username: 'User2', text: 'XZ'} } />,
    <ChatMessage key={9} message={ {id: 0, username: 'User1', text: 'ABC eee eee ABC eee eee ABC eee eee ABC eee eee ABC eee eeeABC eee eee'} } />,
    <ChatMessage key={10} message={ {id: 1, username: 'User1', text: 'ABC234'} } />,
    <ChatMessage key={11} message={ {id: 2, username: 'User2', text: 'XZ'} } />,
    <ChatMessage key={12} message={ {id: 0, username: 'User1', text: 'ABC eee eee ABC eee eee ABC eee eee ABC eee eee ABC eee eeeABC eee eee'} } />,
    <ChatMessage key={13} message={ {id: 1, username: 'User1', text: 'ABC234'} } />,
    <ChatMessage key={14} message={ {id: 2, username: 'User2', text: 'XZ'} } />
];

class ChatMessages extends React.Component {
    render() {
        return <div className="chat-room__chat-messages">
            {messages}
        </div>;
    }
}

export default ChatMessages;