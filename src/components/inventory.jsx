import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import good from './images/good.svg';
import { Card, CardHeader, CardBody, Box, Button, Heading, Stack, SimpleGrid,  StackDivider, Text } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure, Input,  Spinner  } from "@chakra-ui/react"

const Inventory = () => {
    const [sidebar, setSidebar] = useState('')
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(true)
    const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
    const [messages, setMessages] = useState('')
    const [expense_budget, setExpense] = useState('');
    const [list, setList] = useState([])
    const [buttonVisible, setButtonVisible] = useState(true);
    const { isOpen, onOpen,  onClose } = useDisclosure()
    const [fun, setFun] = useState('')
    const [amount, setAmount] = useState('')
    const [acct, setAcct] = useState([])
    const [selectedOption, setSelectedOption] = useState('')
    const [fin, setFin] = useState('')
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [searchTerm, setSearchTerm] = useState("");
    const [time, setTime] = useState('')
    const modal1 = useDisclosure()
    const modal2 = useDisclosure()
  
    const showSidebar = () => setSidebar(!sidebar)
  const nav =()=>{
    navigate('/components/product')
  }
  const handleBank = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const begin =(event)=>{
    setStart(event.target.value)
  }
  const conc =(event)=>{
    setEnd(event.target.value)
  }

const range=(event)=>{
  setSearchTerm(event.target.value)
}

  const handleAmount=(event)=> {
    setAmount(event.target.value)
  }
  const debit = (selectedOption) => {
    let menu
    if (selectedOption.value === 'main'){
        menu = true;
    }else{
        menu = false
    }
    return menu
  }
  let debit_main = debit(selectedOption)
  const closeModal = () => {
    onClose()
    fetchData()
    setFun('')
  };
  const handleInputChange = (event) => {
    setExpense(event.target.value);
  };
  
  const handleClick = () => {
    // When the button is clicked, setButtonVisible to false
    setButtonVisible(false);
    setTimeout(() => {
      setButtonVisible(true);
    }, 20000);
  };

  const currentDate = new Date(); // Get the current date

    const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() - 30)  


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
async function fproj() {

   let items ={refresh}
    let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(items)
    });
    rep = await rep.json();
    let bab = rep.access_token 
    let account_type = 'EXPENSE'
    let sub_account = info[0].sub_account.name
    console.warn(sub_account, expense_budget, account_type)
    let item = {sub_account, expense_budget, account_type};
  

  try {
    let result = await fetch('https://sandbox.prestigedelta.com/setsubbudget/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${bab}`
      },
      body: JSON.stringify(item)
    });

    if (result.status === 400) {
      const errorResult = await result.json();
      setMessages(JSON.stringify(errorResult.message));
    } else {
       result =await result.json();
       setFin(JSON.stringify(result))
    }
  } catch (error) {
    // Handle fetch error
    console.error(error);
  }
;
}
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
 
  setInfo(response)
    }}

    useEffect(() => {
      fetchData()
    }, [])
    let refresh = terms(tok)
const fetchDa = async () => {
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
let response = await fetch("https://sandbox.prestigedelta.com/subaccount/",{
method: "GET",
headers:{'Authorization': `Bearer ${bab}`},
})
//localStorage.setItem('user-info', JSON.stringify(tok))

if (response.status === 401) {
  navigate('/components/login');
} else { 
 
response = await response.json();
setAcct(response)

  }}
  useEffect(() => {
    fetchDa()
  }, [])

const options = [
  ...acct.map((item) => ({
    label: `${item.name} 
    (₦${item.balance.available_balance})`,
    value: item.name,
  })),
  {
    value: 'main',
    label: 'MAIN ACCOUNT',
  },
];

    
    const fetchInfo = async () => {
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
    let response = await fetch(`https://sandbox.prestigedelta.com/salestransactions/?start_date=${thirtyDaysBefore.toLocaleDateString('en-US')}&end_date=${(new Date()).toLocaleDateString('en-US')}&name=${info[0].sub_account.name}`,{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    
    if (response.status === 401) {
      navigate('/components/login');
    } else {  
    response = await response.json();}
    setLoading(false)
    setList(response)
    }
    useEffect(() => {
      if(info.length > 0 && typeof info[0].sub_account !== 'undefined')
      fetchInfo()
      }, [info])
      async function fsav(e) {
        handleClick()
        e.preventDefault();
         let items ={refresh}
          let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json'
           },
           body:JSON.stringify(items)
          });
          rep = await rep.json();
          let bab = rep.access_token 
          let receiver = info[0].sub_account.name
          let funder = selectedOption.value
          console.warn(funder, debit_main, amount, receiver)
          let item = {funder, debit_main, amount, receiver};
        
      
        try {
          let result = await fetch('https://sandbox.prestigedelta.com/fundsubaccount/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${bab}`
            },
            body: JSON.stringify(item)
          });
          
                if (result.status !== 200) {
            const errorResult = await result.json();
            setMessage(JSON.stringify(errorResult.message));
          } else {
             result =await result.json();
        
             setFun(JSON.stringify(result))    
          } 
        } catch (error) {
          // Handle fetch error
          console.error(error);
        };
      }
       console.log(list)
       const salesTra = async () => {
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
      let response = await fetch(`https://sandbox.prestigedelta.com/salestransactions/?start_date=${new Date(start).toLocaleDateString('en-US')}&end_date=${(new Date(end)).toLocaleDateString('en-US')}&name=${info[0].sub_account.name}`,{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      
      if (response.status === 401) {
        navigate('/components/login');
      } else {  
      response = await response.json();}
    
      setList(response)
      }
      const receipt =(index)=>{
        const data = reverse[index]
        navigate('/components/pinvoice', {state:{data}} )
      }
      const overdraft= ()=>{
        const data = info[0].sub_account
           navigate('/components/overdraft', {state:{data}})
      }
      const transfer= ()=>{
    
        navigate('/components/before')
   }
   
   
   
      
      if(loading) {
        return(
        <p>Loading...</p>)} 
        const reverse = [...list.sales].reverse();
        console.log(reverse)
         return(
        <ChakraProvider>
        <div>
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
            <div className='dash'>
               <h3 className='h1'>Inventory</h3>
              <p className='dp'>Total Balance</p>
              {typeof info[0].sub_account === 'undefined'? (<Heading size='xl' color='#fff'>₦0</Heading>):
              <Heading size='xl' color='#fff'>₦{(info[0].sub_account.balance.available_balance).toLocaleString('en-US')}</Heading>}
              <Link to='/components/invoice'><button className='dbut'>Record a Sale</button></Link>
            </div>
            <Heading size='sm' ml={6} textAlign='left'>Products</Heading>
            { info.length > 0 && typeof info[0].products[0] === 'object' ? (
            <Card m={5}>
            <Card m={2} p='2px' >

  <CardBody p='2px'>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box p='2px'>
        <Heading size='xs' textTransform='uppercase'>
          Number of Products
        </Heading>
        <Text pt='2' fontSize='sm'>
          {info[0].product_count}
        </Text>
      </Box>
      
    </Stack>
  </CardBody>
</Card>
<SimpleGrid m={3} mt={1} spacing={4} templateColumns='repeat(auto-fill, minmax(100px, 1fr))'>
  <Card height={90} justify='center'>
    <CardHeader p={1}>
      <Heading size='xs' textTransform='uppercase'>Sales Value</Heading>
    </CardHeader>
      <Text>₦{(info[0].stock_value).toLocaleString('en-Us')}</Text>
  </Card>
  <Card height={90} justify='center'>
    <CardHeader p={1}>
      <Heading size='xs' textTransform='uppercase'>Purchase Value</Heading>
    </CardHeader>
      <Text>₦{(info[0].input_value).toLocaleString('en-US')}</Text>
  </Card> 
</SimpleGrid>
<Stack direction='row' mt={1} spacing={2} align='center' justify='center'>
<Button colorScheme='blue' variant='solid' onClick={nav}>
    Product List
  </Button>
  <Button colorScheme='blue' variant='outline' onClick={transfer}>Add Product</Button>
</Stack>

</Card>): (<Card m={5}  >
            <Card m={2} >

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box p='2px'>
        <Heading size='xs' textTransform='uppercase'>
          Number of Products
        </Heading>
        <Text pt='2' fontSize='sm'>
          0
        </Text>
     </Box>
      </Stack>
  </CardBody>
</Card>
<SimpleGrid m={3} mt={1} spacing={4} templateColumns='repeat(auto-fill, minmax(100px, 1fr))'>
  <Card height={90} justify='center'>
    <CardHeader p={1}>
      <Heading size='xs' textTransform='uppercase'> Stock Value</Heading>
    </CardHeader>
      <Text> 0</Text>
  </Card>
  <Card height={90} justify='center'>
    <CardHeader p={1}>
      <Heading size='xs' textTransform='uppercase' > Sales Value</Heading>
    </CardHeader>
      <Text>₦0</Text>
    
  </Card> 
</SimpleGrid>
<Stack direction='row' mt={2} spacing={2} align='center' justify='center'>
<Button colorScheme='blue' variant='solid' onClick={nav}>
    Product List
  </Button>
  <Button colorScheme='blue' variant='outline' onClick={transfer}>Add Product</Button>
</Stack>

</Card>)}

<Heading fontSize='15px' textAlign='left' ml='15px'>Activity</Heading>
        <Stack direction='row' spacing={1} >
<div>
         <Heading fontSize='12px'>Start Date</Heading>
        <Input placeholder='' defaultValue={(thirtyDaysBefore).toISOString().slice(0, 10)}  size='md' type='date' onChange={begin} width={173} ml={3}/><br/><br/>
        </div> 
        <div>
        <Heading fontSize='12px'>End Date</Heading>
        <Input placeholder='Date' size='md' defaultValue={new Date().toISOString().slice(0, 10)} type='date' onChange={conc} width={173} ml={2}/><br/><br/>
        </div></Stack> 
        <Button colorScheme='blue' variant='outline' 
         w='230px' onClick={() => salesTra()}>Filter</Button><br/><br/>
{reverse.map((obj, index) => (
  <div className="td2" key={index} onClick={() => receipt(index)}>
    <div className="tg">
    <Text mb={0} >{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
    
    <div className='loos'><span>invoice </span><i className="fa-solid fa-file-export"></i></div>
    </div>
    
    {obj.sold_products.filter(product=> product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
  .map((product, inde) => (
      <div key={inde}>
      <Stack  direction='row'mt={0} mb={0} gap='115px' spacing={2} align='center' justify='center'>
      <Text fontSize='13px'>Product:</Text>
      <Heading mt={0} fontSize='13px' className="ove">{product.product_name}</Heading>    
      </Stack>
      <Stack  direction='row'mt={0} mb={0} gap='100px' spacing={2} align='center' justify='center'>
      <Text fontSize='13px'>Amount Sold:</Text>
      <Text mt={0} fontSize='13px' className="ove">₦{(product.sold_amount).toLocaleString('en-US')}</Text>    
      </Stack>
        <div className='tg'>
          <p className="tm">Quantity Sold: {product.sold_quantity}</p>
          <p className='tm'>Quantity Type: {product.quantity_type}</p>
        </div>
       
      </div>
))}
  </div>
))}

                       <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
        <ModalOverlay />
        <ModalContent>
        {fun === '' ? ( 
          <div>
          <ModalHeader>Add Funds</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Select
      onChange={handleBank}
      className="pne"
      placeholder="Transfer From"
      options={options}
      isSearchable={true}
      value={selectedOption}
    /><br/><br/>
    <Input placeholder='Amount' size='md' onChange={handleAmount} width={273} ml={9}/><br/><br/>
                
                <div className="message">{message ? <p>{message}</p> : null}</div>
          </ModalBody>

          <ModalFooter>
          {buttonVisible && (  <Button colorScheme='blue' mr={3} onClick={fsav}>
              Fund
            </Button> 
                )}
      {!buttonVisible && <p><Spinner/></p>}
            
          </ModalFooter>
          </div>) :
            <div>
          <i class="fa-solid fa-x tx" onClick={closeModal}></i>
          <img src={good} alt="" className='nig' />
          <Heading size='xs' textAlign='center' m='10px'>Sub-Account Successfully Funded!</Heading>  
      </div>}
        </ModalContent>
      </Modal>
      <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
        <ModalOverlay />
        <ModalContent>
        {fin === '' ? ( 
          <div>
          <ModalHeader>Set Monthly Inventory Budget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>     
    <Input placeholder='Set Budget Amount' size='md' onChange={handleInputChange} width={273} ml={9}/><br/><br/>
      <div className="message">{message ? <p>{message}</p> : null}</div>
          </ModalBody>
          {messages ? <p>{messages}</p> : null}
          <ModalFooter>
          {buttonVisible && (  <Button colorScheme='blue' mr={3} onClick={fproj}>
              Update 
            </Button> 
                )}
      {!buttonVisible && <p><Spinner/></p>}
            
          </ModalFooter>
          </div>) :
            <div>
          <i class="fa-solid fa-x tx" onClick={modal2.onClose}></i>
          <img src={good} alt="" className='nig' />
          <Heading size='xs' textAlign='center' m='10px'>Sub-Account Successfully Updated!</Heading>  
      </div>}
        </ModalContent>
      </Modal>

      
        </div>
        </ChakraProvider>
    )
}
export default Inventory