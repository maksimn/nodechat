import React from 'react';

class ChatMessageInput extends React.Component {
    render() {
        return <div className="chat-room__chat-message-input">
            <textarea onKeyPress={null}
                onKeyUp={null}
                className="chat-message-input__textbox"
                maxLength="500"
                placeholder="Напишите сообщение...">
            </textarea>
        </div>;
    }
}

export default ChatMessageInput;