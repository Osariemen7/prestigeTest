import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChakraProvider, Skeleton, Text, Card, Input, Button, Heading } from '@chakra-ui/react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading for new data
  const [info, setInfo] = useState();
  const [list, setList] = useState('')
  const [thread, setThread] = useState('');
  const navigate = useNavigate();

  // ... (other code)
  let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token
  const create = async() => {
   
   let ite ={refresh}
   let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
       method: 'POST',
       headers:{
         'Content-Type': 'application/json',
         'accept' : 'application/json'
    },
    body:JSON.stringify(ite)
   });
   rep = await rep.json();
   let bab = rep.access_token
   
   
     console.warn(newMessage)
     let thread_id = thread
     let message = newMessage
     let item = {message, thread_id};
     let result = await fetch ('https://sandbox.prestigedelta.com/sendgptmessage/',{
         method: 'POST',
         headers:{
           'Content-Type': 'application/json',
           'accept' : 'application/json',
           'Authorization': `Bearer ${bab}`
      },
      body:JSON.stringify(item)
     });
   
     if (result.status !== 200) {
   
     } else {
       result = await result.json();
       setList(result.message_value)
   
     }   
   }
  const send = async () => {
    create();
    setIsLoading(true); // Set loading state to true after sending user message

    // Simulate a response from another user or chatbot (for demonstration purposes)
    setTimeout(async () => {
      // Fetch the updated messages from the API
      let item = { refresh };
      let rep = await fetch('https://sandbox.prestigedelta.com/refreshtoken/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(item),
      });
      rep = await rep.json();
      let bab = rep.access_token;
      const response = await fetch(
        'https://sandbox.prestigedelta.com/getgptmessages/',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${bab}` },
        }
      );
      const result = await response.json();
      setIsLoading(false); // Set loading state to false after receiving the assistant's response

      // Find the latest assistant message in the response
      const latestAssistantMessage = result.find(
        (result) =>
          result.conversation.length > 0 &&
          result.conversation[0].role === 'assistant'
      );

      // Set the assistant's response from the latest API result
      if (latestAssistantMessage) {
        const responseMessage = {
          text: latestAssistantMessage.conversation[0]?.message_value || 'No response',
          sender: 'assistant',
        };

        // Update the messages state with the user's and assistant's messages
        setMessages([...messages, responseMessage]);
      }
    }, 3000); // Reduced the timeout for demonstration

  };

  return (
    <ChakraProvider>
      {/* ... (other code) */}
      <Card m="19px" backgroundColor="white" p={3}>
        <div>
          {messages.map((message, index) => (
            <div
              style={{
                justifyContent: message.sender === 'user' ? 'right' : 'left',
              }}
              key={index}
            >
              {isLoading && message.sender === 'assistant' ? (
                // Show skeletons while new data is being fetched
                <Skeleton height="20px" mb="2" />
              ) : (
                <div
                  className={`message ${message.sender}`}
                  style={{
                    textAlign: message.sender === 'user' ? 'right' : 'left',
                    backgroundColor: message.sender === 'user' ? '#5cb85c' : '#337ab7',
                    color: 'white',
                    maxWidth: 'fit-content',
                    borderRadius: '5px',
                    padding: '5px',
                    margin: '8px',
                    marginLeft: message.sender === 'user' ? 'auto' : '0',
                    marginRight: message.sender === 'user' ? '0' : 'auto',
                    justifySelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Text className="message-content">{message.text}</Text>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
      <Input
          mt='12px'
          ml='5px'
           w='220px'
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button mb='6px' onClick={send}  colorScheme='blue' variant='solid' >Send</Button>
       
    </ChakraProvider>
  );
};

export default Chat;
