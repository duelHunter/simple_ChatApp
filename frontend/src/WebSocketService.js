import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connect = (callback) => {
    const socket = new SockJS('http://localhost:8080/chat'); // Ensure backend URL matches
    stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        onConnect: () => {
            console.log('Connected');
            stompClient.subscribe('/topic/messages', (message) => {
                callback(JSON.parse(message.body)); // Handle incoming messages
            });
        },
        onStompError: (frame) => {
            console.error('STOMP error:', frame.headers['message']);
        },
    });

    stompClient.activate(); // Start the connection
};

export const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: '/app/send',
            body: JSON.stringify(message),
        });
    }
};

export const disconnect = () => {
    if (stompClient) {
        stompClient.deactivate(() => {
            console.log('Disconnected');
        });
    }
};
