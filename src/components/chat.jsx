import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, Box, Button, Heading, Stack, SimpleGrid,  Input, Text } from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'


const Chat = () => {
  const [info, setInfo] = useState()
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true)
  const [isload, setIsLoad] =useState(false)
  const [sidebar, setSidebar] = useState('')
  const [list, setList] = useState('')
  const [thread, setThread] = useState('')
  const navigate = useNavigate()

  let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token

  const showSidebar = () => setSidebar(!sidebar)
  const fetchData = async () => {
    let item ={refresh}
    let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(item)
    });
    
    rep = await rep.json();
    let bab = rep.access_token
  let response = await fetch("https://sandbox.prestigedelta.com/businessprofile/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  //localStorage.setItem('user-info', JSON.stringify(tok))
  
  if (response.status === 401) {
    navigate('/components/login');
  } else { 
   
  response = await response.json();
  setLoading(false)
  setInfo(response)
    }}
    useEffect(() => {
      fetchData()
    }, [])
    const fetchDat = async () => {
        let item ={refresh}
        let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json'
         },
         body:JSON.stringify(item)
        });
        rep = await rep.json();
        let bab = rep.access_token
      let response = await fetch("https://sandbox.prestigedelta.com/getgptmessages/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      response = await response.json()
    
    //   if (data.code === 'token_not_valid'){
    //     navigate('/components/token')
    //   } else {
      let  lastThread = response[0];
     setThread(lastThread.thread_id)

     
      }
      useEffect(() => {
        fetchDat()
      }, [])
    
    const creat = async() => {
     setIsLoad(true)   
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
    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        const newMessages = [...messages, { text: newMessage, sender: 'user' }];
        setMessages(newMessages);
        setNewMessage('');

       
        // Simulate a response from the assistant after posting the user's message
        setTimeout(async () => {
            // Fetch the updated messages from the API
            let item = { refresh };
            let rep = await fetch('https://sandbox.prestigedelta.com/refreshtoken/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
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
           
           setIsLoad(false)
            // Find the latest assistant message
            const latestAssistantMessage = result.find(
              (result) =>
                result.conversation.length > 0 &&
                result.conversation[0].role === 'assistant'
            );
          
            // Set the assistant's response from the latest API result
            if (latestAssistantMessage) {
              const responseMessage = {
                text: latestAssistantMessage?.conversation[0]?.message_value || 'No response',
                sender: 'assistant',
              };
          
              // Update the messages state with the user's and assistant's messages
              setMessages((prevMessages) => [...prevMessages, responseMessage]);
            }
          }, 10000);
          
        }
   const send=()=>{

    creat()
    handleSendMessage()
   }
   
   console.log(list)
console.log(messages)
  if(loading) {
    return(
    <p>Loading...</p>)}   
          
  
  return (
    <ChakraProvider>
    <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    
                    <li className='nav-list'>
                    <Link to='/components/inventory' className='nav-text'><i class="fa-solid fa-house"></i>
                      <p className='dfp'>Home</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-wallet home"></i>
                      <p className='dfp'>Account</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/savings' className='nav-text'><i class="fa-solid fa-money-bill"></i>
                      <p className='dfp'>Sub-Account</p></Link>
                    </li>  
                    <li className='nav-list'>
                    <Link to='/components/customer' className='nav-text'><i class="fa-solid fa-people-roof"></i>
                      <p className='dfp'>Customers</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-chart-line"></i>
                    <p className='dfp'>Analytics</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/project' className='nav-text'><i class="fa-solid fa-layer-group home"></i>
                  <p className='dfp'>Project</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/chat' className='nav-text'><i class="fa-solid fa-user-tie"></i>
                  <p className='dfp'>Assistant</p></Link>
                    </li>

                    <li className='nav-list'>
                    
                    <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                      <p className='dfp'>Log Out</p></Link>
                    </li>    
                </ul>
            </nav>

    <div className="App">
      <div className="chat-container">
      
      <Heading fontSize='18px'>Business Assistant for {info[0].business_name}</Heading>
      <Text fontSize='14px' p={3}>Hi {info[0].owner_name}, I am your business assistant!<br/> Ask me any question about your business</Text>
      <Card m='19px' backgroundColor='white' p={3}>
        <div   >
        
        {messages.map((message, index) => (
  <div
    key={index}
    style={{
      justifyContent: message.sender === 'user' ? 'right' : 'left',
    }}
  >
   
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

  </div>
))}
{isload && (
      // Show 'loading...' only for incoming assistant messages
      <Skeleton  height="15px" mb="2" />
    ) }
        </div>   
    </Card>
        
    <div className="">
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
       
          </div>
      </div>
    </div>
    </ChakraProvider>
  );
}
 
export default Chat;
