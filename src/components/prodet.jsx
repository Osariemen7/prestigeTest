import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardFooter, CardBody, SimpleGrid, Button, Heading, Text } from '@chakra-ui/react'

const ProDe = () =>{
    const [info, setInfo] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    let index = location.state.data

    let tok= JSON.parse(localStorage.getItem("user-info"));
const terms = (tok) => {
  let refreshval;

  if (tok === null || typeof tok === 'undefined') {
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
      let response = await fetch("https://sandbox.prestigedelta.com/products/",{
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
      
    if(loading) {
         return(
         <p>Loading...</p>)} 
         let percent =  Math.round((((parseFloat(index.total_sales) /parseFloat(info[0].stock_value) ) * 100) + Number.EPSILON) * 100) / 100

    return(
        <ChakraProvider>
        <div>
        <Link to='/components/product'>
                 <i className="fa-solid fa-chevron-left bac"></i>
             </Link>
  <Heading size='md' m={3}>{index.name}</Heading>
  <SimpleGrid spacing={4} m={3} templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
  <Card height='90px'>
    <CardHeader>
      <Heading size='xs'>Total Sales</Heading>
    </CardHeader>
      <Text>₦{(parseFloat(index.total_sales)).toLocaleString('en-US')}</Text>
  </Card>
  <Card height='90px'>
    <CardHeader>
      <Heading size='xs'>No of packs</Heading>
    </CardHeader>
      <Text>{index.pack_count}</Text>
  </Card>
  <Card height='90px'>
    <CardHeader mb={0}>
    <Heading size='xs' >No of Unit Items</Heading>
       </CardHeader>
      <Text>{index.item_count}</Text>
  </Card>
  <Card height='90px'>
    <CardHeader mb={0}>
    <Heading size='xs' >Contr. to Revenue</Heading>
       </CardHeader>
      <Text>{percent}%</Text>
  </Card>
  <Card height='90px'>
    <CardHeader mb={0}>
    <Heading size='xs' >Sales Value</Heading>
       </CardHeader>
      <Text>₦{parseFloat((index.sales_share)).toLocaleString('en-US')}</Text>
  </Card>
  <Card height='90px'>
    <CardHeader mb={0}>
    <Heading size='xs' >Purchase Value</Heading>
       </CardHeader>
      <Text>₦{(parseFloat(index.price)).toLocaleString('en-US')}</Text>
  </Card>
  <Card height='90px'>
    <CardHeader mb={0}>
    <Heading size='xs' >Sales per Month</Heading>
       </CardHeader>
      <Text>₦{(parseFloat(index.sold_per_month)).toLocaleString('en-US')}</Text>
  </Card>
  <Card height='90px'>
    <CardHeader mb={0}>
    <Heading size='xs' >Sell Out Date</Heading>
       </CardHeader>
      <Text>{(new Date(index.sell_out_date).toLocaleString('en-GB'))}</Text>
  </Card>
</SimpleGrid>
        </div>
        </ChakraProvider>
    )
}
export default ProDe