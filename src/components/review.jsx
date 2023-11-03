import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Button, SimpleGrid, CardHeader, Text, Heading, Card, Checkbox, CardBody  } from "@chakra-ui/react";

const Review=()=>{
    const [check, setCheck] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
  
    const handleCheck =(event) =>{
        setCheck(event.target.checked)
       }
       console.log(check)
       const next =()=>{
        if (check === ''){
            setMessage('Check the box')
        }
        else{
         navigate('/components/Thanks')}
       }
    return(
    <div>
    <Link to='/components/reboard'><i class="fa-solid fa-chevron-left bac"></i></Link>
       <ChakraProvider>
          <Text ml='20px' textAlign='left'>Hi Business Manager,</Text> 
         
          <Card p={3} backgroundColor=''>
          <Card p={2}>
          <Text>Congratulations on initiating the journey towards effective business management.</Text>
          </Card>

         <br/> <Heading size='xs'>Reveiw your Goals</Heading>
          <SimpleGrid m={3} spacing={2} templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
  <Card height={100} justify='center'>
    <CardHeader p={2}>
      <Heading size='xs' >Your Monthly Revenue</Heading>
    </CardHeader>
      <Text> 0</Text>
  </Card>
  <Card height={100} justify='center'>
    <CardHeader p={2}>
      <Heading size='xs'  >Your Monthly Profit</Heading>
    </CardHeader>
      <Text>₦0</Text>
    
  </Card> 
  <Card height={100} justify='center'>
    <CardHeader p={2}>
      <Heading size='xs' >Your Monthly Revenue growth</Heading>
    </CardHeader>
      <Text>₦0</Text>
  </Card>
  <Card height={100} justify='center'>
    <CardHeader p={2}>
      <Heading size='xs' >Your Monthly Profit growth</Heading>
    </CardHeader>
      <Text>₦0</Text>
  </Card>
</SimpleGrid>
         
          <Checkbox  colorScheme='green'
        ml='20px'
        isChecked={check}
        onChange={handleCheck} isInvalid >
          I am dedicated to making sustained efforts to foster the growth of my business
  </Checkbox>
             <div className="message">{message ? <p>{message}</p> : null}</div>
             </Card><br/>
      <Button colorScheme="blue" variant='solid' onClick={next}>Next</Button>
       </ChakraProvider>
    </div>
  )
}
export default Review