import React, { useState, useEffect } from 'react';
import { connect, sendMessage, disconnect } from './WebSocketService';

function App() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        connect((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => disconnect();
    }, []);

    const handleSendMessage = () => {
        sendMessage({ sender: "User", content: messageInput });
        setMessageInput("");
    };

    return (
        <div>
            <h1>Chat App</h1>
            <div>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <div>
                <h2>Messages:</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.sender}:</strong> {msg.content}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
