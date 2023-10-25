import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import {  useLocation, Link, useNavigate } from "react-router-dom";
import { Button, Stack, Text, Heading, Card, Spinner, CardBody  } from "@chakra-ui/react"

const Sales = () => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState()
    const navigate = useNavigate()
    const location = useLocation()

   let meal = location.state.data
    let tok= JSON.parse(localStorage.getItem("user-info"));
    const terms = (tok) => {
       let refreshval;

  if ( tok === null || typeof tok === "undefined" ) {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }
  return refreshval;
};
let refresh = terms(tok)

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
      setList(response)
        }}
        useEffect(() => {
          fetchData()
        }, [])
        function toSentenceCase(inputString) {
            if (!inputString) return inputString; // Handle empty or null input
            return inputString.charAt(0).toUpperCase() + inputString.slice(1);
        }
console.log(meal)
        if(loading) {
            return(
            <p>Loading...</p>)}
    return(
        <div >
<Link to='/components/inventory'>
            <i className="fa-solid fa-chevron-left bac"></i>
             </Link>        
   <div>            <ChakraProvider >
            
            <Button colorScheme='black'  variant='outline'>{toSentenceCase(list[0].business_name)}</Button>
            <Card backgroundColor='#f2f4f7' m={4} >
             <Text justify='red' fontSize='12px'>{(new Date(meal.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
            <Text>Method of Payment: {meal.channel}</Text>
            <Stack direction='column'mb={0} gap='10px' mt={3} spacing={4} align='center' justify='left'>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
                 <Heading size='xs'>Product</Heading>
                 <Text>{meal.sold_products[0].product_name}</Text>
               </Stack>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
               <Heading size='xs'>Amount</Heading>
                 <Text>₦{(meal.sold_products[0].sold_amount).toLocaleString('en-US')}</Text>
               </Stack>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
                 <Heading size='xs'>Quantity</Heading>
                 <Text>{meal.sold_products[0].sold_quantity}</Text>
               </Stack>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
               <Heading size='xs'>Quantity Type</Heading>
                 <Text>{meal.sold_products[0].quantity_type}</Text>
               </Stack>          
      </Stack>
</Card>
            </ChakraProvider>
            </div>

        </div>
    )
}
export default Sales