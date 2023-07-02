import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet"

const Accounts =()=> {
  const [info, setInfo] = useState('')
  const [users, setUsers] = useState('');
  const [hidden, setHidden] = useState("******");
  const navigate= useNavigate()
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
    let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(item)
    });
    rep = await rep.json();
    let bab = rep.access_token
  let response = await fetch("https://api.prestigedelta.com/accounts/",{
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
          let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json'
           },
           body:JSON.stringify(item)
          });
          rep = await rep.json();
          let bab = rep.access_token
        let response = await fetch("https://api.prestigedelta.com/transactionlist/?start_date=01/31/2022&end_date=07/31/2023",{
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
if (info.length < 1)        
return(
     
        <div>
        <Helmet>
            
            <title>Transactions</title>
            
        </Helmet>
           <div className="dash">
              <h3 className="h1">Account</h3>
              <p className='dp'>Total Balance</p>
              { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
              <h1 className="h1">{hidden}</h1>
             
           </div>
            <div className="acct">
               <Link to='/components/fund'><button className='abut'>Add Fund</button></Link> 
               <div>
                  <Link to='/components/getgroup'><button className='abut'>Transfer</button></Link>
               </div>
              
                <button className='abut'>Overdraft</button>
              </div>
              <p className='l'>RECENT TRANSACTIONS</p>
              <p className='ad'>no transaction yet</p>

          <footer className='dflex2'>
                <div>
                <Link to='/components/dash'><i class="fa-solid fa-house home"></i></Link>
                  
                  <p className='dfp'>Home</p>
                </div>
                <div>
                <Link to='/components/project'><i class="fa-solid fa-layer-group home"></i></Link>
                  <p className='dfp'>Project</p>
                </div>
                <div>
                  <i class="fa-solid fa-people-group home"></i>
                  <p className='dfp'>Club</p>
                </div>
                <div>
                  <i class="fa-solid fa-wallet home1"></i>
                  <p className='dfp'>Account</p>
                </div> 
            </footer> 
        </div>
    )
    return(
      <div>
             <div className="dash">
                <h3 className="h1">Account</h3>
                <p className='dp'>Total Balance</p>
                { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
                <h1 className="h1">{hidden}</h1>
                <div className="acct">
                 <Link to='/components/fund'><button className='abut'>Add Fund</button></Link> 
                 <div>
                    <Link to='./transact'><button className='abut'>Transfer</button></Link>
                 </div>
        
                  <button className='abut'>Overdraft</button>
                </div>
             </div>
              
          <p className='l'>RECENT TRANSACTIONS</p>
          {info.map((obj, index) => 
                  <div className='td'>
                  <div className='tl'>
                       <p key={index}>{obj.classification}</p>
                       <p key={index}>{obj.amount}</p>
                  </div>
                  <div className='tg'>
                       <p  key={index}>{obj.status}</p>
                       <p key={index}>{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                  </div>
                       <p className='tm' key={index}>{obj.narration}</p>
                  </div>
                       )}
                       <footer className='dflex2'>
                  <div>
                    <Link to='/components/dash'><i class="fa-solid fa-house home"></i></Link>
                    <p className='dfp'>Home</p>
                  </div>
                  <div>
                  <Link to='/components/project'><i class="fa-solid fa-layer-group home"></i></Link>
                    <p className='dfp'>Project</p>
                  </div>
                  <div>
                    <i class="fa-solid fa-people-group home"></i>
                    <p className='dfp'>Club</p>
                  </div>
                  <div>
                    <i class="fa-solid fa-wallet home1"></i>
                    <p className='dfp'>Account</p>
                  </div> 
              </footer> 
      </div>
   )
}
export default Accounts