import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import good from './images/good.svg'
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
    const [messages, setMessages] = useState('')
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
  const showSidebar = () => setSidebar(!sidebar)
  const nav =()=>{
    navigate('/components/product')
  }
  const handleBank = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
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
  const handleClick = () => {
    // When the button is clicked, setButtonVisible to false
    setButtonVisible(false);
    setTimeout(() => {
      setButtonVisible(true);
    }, 20000);
  };

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
    let expense_budget = '2000000'
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
  setLoading(false)
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
    let response = await fetch(`https://sandbox.prestigedelta.com/subtransactions/?start_date=01/31/2022&end_date=${(new Date()).toLocaleDateString('en-US')}&name=${info[0].sub_account.name}`,{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    
    if (response.status === 401) {
      navigate('/components/login');
    } else {  
    response = await response.json();}
  
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
             fproj()
             setFun(JSON.stringify(result))    
          } 
        } catch (error) {
          // Handle fetch error
          console.error(error);
        };
      }

      const receipt =(index)=>{
        const ite = list[index]
        navigate('/components/Receipt', {state:{ite}} )
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
                    <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-house"></i>
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
                    <Link to='/components/inventory' className='nav-text'><i class="fa-solid fa-cart-flatbed"></i>
                      <p className='dfp'>Inventory</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/project' className='nav-text'><i class="fa-solid fa-layer-group home"></i>
                  <p className='dfp'>Project</p></Link>
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
              <div className='act'>
               <button onClick={onOpen} className='abut'>Fund</button>
              <button onClick={transfer} className='abut'>Transfers</button>
              <button onClick={overdraft} className='abut'>Overdraft</button>
            </div>
            </div>
            <Heading size='sm' ml={6} textAlign='left'>Products</Heading>
            { info.length > 0 && typeof info[0].products[0] === 'object' ? (
            <Card m={5} onClick={nav}  >
            <Card m={2} >

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
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
<SimpleGrid m={3} spacing={4} templateColumns='repeat(auto-fill, minmax(100px, 1fr))'>
  <Card height={100} justify='center'>
    <CardHeader p={2}>
      <Heading size='xs' textTransform='uppercase'>Sales Value</Heading>
    </CardHeader>
      <Text>₦{(info[0].stock_value).toLocaleString('en-Us')}</Text>
  </Card>
  <Card height={100} justify='center'>
    <CardHeader p={2}>
      <Heading size='xs' textTransform='uppercase'>Purchase Value</Heading>
    </CardHeader>
      <Text>₦{(info[0].input_value).toLocaleString('en-US')}</Text>
  </Card> 
</SimpleGrid>
<Button colorScheme='blue' variant='solid'>
    Product List
  </Button>
</Card>): (<Card m={5} onClick={nav}  >
            <Card m={2} >

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
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
<SimpleGrid m={3} spacing={4} templateColumns='repeat(auto-fill, minmax(100px, 1fr))'>
  <Card height={100} justify='center'>
    <CardHeader p={2}>
      <Heading size='xs' textTransform='uppercase'> Stock Value</Heading>
    </CardHeader>
      <Text> 0</Text>
  </Card>
  <Card height={100} justify='center'>
    <CardHeader p={2}>
      <Heading size='xs' textTransform='uppercase' > Sales Value</Heading>
    </CardHeader>
      <Text>₦0</Text>
    
  </Card> 
</SimpleGrid>
</Card>)}
<h4 className="saed">Activity</h4>
             {list.map((obj, index) => 
                  <div className='td' onClick={() => receipt(index)}>
                  <div className='drz'>
                        <p className="ove" key={index}>{obj.status}</p>
                       <h4 className="ove" key={index}>₦{obj.amount}</h4>
                  </div>
                  <div className='tg'>
                  <p className="tm" key={index}>{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                       <div><span>Receipt </span><i class="fa-solid fa-file-export"></i></div>
                  </div>
                       <p className='tm' key={index}>{obj.narration}</p>
                  </div>
                       )}
                       <Modal isOpen={isOpen} onClose={onClose}>
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
        </div>
        </ChakraProvider>
    )
}
export default Inventory