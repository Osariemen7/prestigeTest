import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet"
import { ChakraProvider } from '@chakra-ui/react';
import { Card, Stack, CardBody, Heading, Text } from '@chakra-ui/react'

const Accounts =()=> {
  const [info, setInfo] = useState('')
  const [users, setUsers] = useState('');
  const [hidden, setHidden] = useState("******");
  const [data, setData] = useState('')
  const navigate= useNavigate()
  const [sidebar, setSidebar] = useState('')

  const showSidebar = () => setSidebar(!sidebar)
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
    const receipt =(index)=>{
      const ite = info[index]
      navigate('/components/Receipt', {state:{ite}} )
    }
   
    const currentDate = new Date(); // Get the current date

    const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() - 30)  

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
  let response = await fetch("https://sandbox.prestigedelta.com/accounts/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  response = await response.json()
  localStorage.setItem('user-info', JSON.stringify(tok))
//   if (data.code === 'token_not_valid'){
//     navigate('/components/token')
//   } else {
 setUsers(response)
  }

useEffect(() => {
  fetchData()
}, [])
let wark =users[0]

const toggleHidden =()=>{
           if(hidden==="******")
           {let gal =(wark.main_balances.available_balance).toLocaleString('en-US')
             
            setHidden(`₦${gal}`)
            return;
           }
           setHidden("******")
         }
         
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
        let response = await fetch(`https://sandbox.prestigedelta.com/transactionlist/?start_date=01/31/2022&end_date=${(new Date()).toLocaleDateString('en-US')}`,{
        method: "GET",
        headers:{'Authorization': `Bearer ${bab}`},
        })
        
        if (response.status === 401) {
          navigate('/components/login');
        } else {  
        response = await response.json();}

        setInfo(response)
      
        }
        useEffect(() => {
          fetchInfo()
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
          let response = await fetch("https://sandbox.prestigedelta.com/virtualnuban/",{
          method: "GET",
          headers:{'Authorization': `Bearer ${bab}`},
          })
          response = await response.json()
          if (response.status !== 200) {
            navigate(window.location.pathname, { replace: true });
          } else {
          
            response = await response.json();}
         setData(response)
          
        }
        useEffect(() => {
          fetchDat()
        }, [])
console.log(info)
if (info.length < 1)        
return(
     
        <div>
        <Helmet>
            
            <title>Transactions</title>
            
        </Helmet>
        <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-house"></i>
                      <p className='dfp'>Home</p></Link>
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
           <div className="dash">
              <h3 className="h1">Account</h3>
              <p className='dp'>Total Balance</p>
              { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
              <h1 className="h1">{hidden}</h1>
              <div>
               <Link to='/components/invoice'><button className='dbut'>Receive Payment</button></Link> 
                              
              </div>
           </div>
           <ChakraProvider>
            <Card m={4}>
                <Text mb={0}>Bank</Text>
                <Heading size='xs' mb={2}>{data.bank}</Heading>
                <Text>Account Number</Text>
                <Heading size='xs'>{data.account_number}</Heading>

            </Card>
           </ChakraProvider>
           
              <p className='l'>RECENT TRANSACTIONS</p>
              <p className='ad'>No Transaction Yet</p>

         
        </div>
    )
    return(
      <div>
      <div  className=''>
      <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-house"></i>
                      <p className='dfp'>Home</p></Link>
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
            </div>
             <div className="dash">
                <h3 className="h1">Account</h3>
                <p className='dp'>Total Balance</p>
                { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
                <h1 className="h1">{hidden}</h1>
                <div >
                 <Link to='/components/invoice'><button className='dbut'>Receive Payment</button></Link> 
                
                </div>
             </div>
             <ChakraProvider>
            <Card m={4}  >
            
                <Text mb={0} >Bank</Text>
                <Heading size='xs' mb={2}>{data.bank}</Heading>
                <Text>Account Number</Text>
                <Heading size='xs' >{data.account_number}</Heading>
              
            </Card>
           </ChakraProvider>
           
              
          <p className='l'>RECENT TRANSACTIONS</p>
          {info.map((obj, index) => 
                  <div className='td' onClick={() => receipt(index)}>
                  <div className='tl'>
                       <p key={index}>{obj.classification}</p>
                       <p key={index}>₦{obj.amount}</p>
                  </div>
                  <div className='tg'>
                       <p  key={index}>{obj.status}</p>
                       <p key={index}>{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                  </div>
                  {obj.transaction_type === 'CLOSE_PROJECT' || obj.transaction_type ==='NIPCR' ? (
                       <p className='tm' key={index}>{obj.narration}</p>) : <p className='tm' key={index}>Beneficiary: {obj.beneficiary.account_name} {obj.beneficiary.bank_name}</p>}
                  <div ><i class="fa-solid fa-file-export"></i></div>    
                  </div>
                )}
                       
      </div>
   )
}
export default Accounts