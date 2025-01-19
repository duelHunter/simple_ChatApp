package com.chatapp.demo.controler;


import com.chatapp.demo.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatControler {

    @MessageMapping("/send") // Handles messages sent to /app/send
    @SendTo("/topic/messages") // Broadcasts messages to /topic/messages
    public Message sendMessage(Message message) {
        // Optionally, process the message here (e.g., add timestamps or filter content)
        return message;
    }
}
