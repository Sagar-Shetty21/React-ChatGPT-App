import React from 'react';

const ChatMessage = ({message,textFormat}) => {

    return (
        <div className={`chat-msg ${message.user === "gpt" && "bot" }`} >
            <div className={`avatar ${message.user === "gpt" && "bot" }`}>
                <img src={`../assets/${message.user === "gpt" ? "bot.jpeg" : "user.jpeg"}`} alt='profile-icon' width="40px" height="40px"/>
            </div>
            <div className={`message ${message.error && "red-text" }`}><pre className={`${textFormat ? "" : "text-format"}`} >{message.message}</pre></div>
        </div>
    )
}

export default ChatMessage;