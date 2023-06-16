import React, { useState, useEffect } from 'react';
import bank from './images/bank.svg';
import Line from './images/Line 1.svg';
import stack from './images/stack.svg';
import sidearrow from './images/sidearrow.svg';
import money from './images/money.svg';
import club from './images/club.svg';
import { Link, useNavigate } from 'react-router-dom';


const Dashboard =()=>{
  const [users, setUsers] = useState('');
  const [hidden, setHidden] = useState("******");
  const navigate = useNavigate()
  
  let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token
  let name = tok.user
  
 
  const project = () => {
    localStorage.setItem('user-info', JSON.stringify(tok))
    navigate('/components/project')
  }
  // useEffect(() => {
  //   const reloadCount = sessionStorage.getItem('reloadCount');
    
  //   if (!reloadCount || reloadCount < 2) {
  //     const updatedReloadCount = reloadCount ? parseInt(reloadCount) + 1 : 1;
  //     sessionStorage.setItem('reloadCount', String(updatedReloadCount));
  //     window.location.reload();
  //   } else {
  //     sessionStorage.removeItem('reloadCount');
  //   }
  // }, []);
  
  
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
      
     setUsers(response)

       
     }
  
    useEffect(() => {
      fetchData()
    }, [])
    console.log(tok)
    
//   useEffect(() => {
//     fetch('https://sandbox.prestigedelta.com/accounts/')
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(error => console.error(error));
//     }, []);
//     let wark = JSON.stringify(data)
let wark =users[0]

console.log(users) 


const toggleHidden =()=>{
  
 // let gat = wark.available_balance
  
        if(hidden==="******")
        {let gal =(wark.main_balances.available_balance).toLocaleString('en-US')
          
         setHidden(`₦${gal}`)
         return;
        }
        setHidden("******")
      }
      // useEffect(() => {
      //   const reloadCount = sessionStorage.getItem('reloadCount');
      
      //   if (!reloadCount || parseInt(reloadCount) < 2) {
      //     const updatedReloadCount = reloadCount ? parseInt(reloadCount) + 1 : 1;
      //     sessionStorage.setItem('reloadCount', String(updatedReloadCount));
      //     if (!reloadCount) {
      //       window.location.reload();
      //     }
      //   } else {
      //     sessionStorage.removeItem('reloadCount');
      //   }
      // }, []);
        
    return(
        <div>
            <Link to='/'><i class="fa-solid fa-chevron-left bac"></i></Link>

            <h3 className='dah3'>Hi, {name.first_name} </h3>
            <div className='dash'>
                <p className='dp'>Total Balance</p>
                
                { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
                <h1 className='h1'>{hidden}</h1>
                <img src={Line} alt=''/><br/>
                <Link to='/components/fund'>
                   <button className='dbut'>Add Money</button>
                </Link>
            </div>
            <div className="dflex">
                <img src={bank} alt=''/>
                <div>
                  <h3 className='dh3'>Access to Finance</h3>
                  <p className='dfp'>Get access to loan when you save 30% of your estimated project amount</p>
                </div>   
            </div>
            <p className='l'>QUICK ACTION</p>
            <Link to='/components/project' className='link'> <div className='dflex1'>
                <img  src={stack} alt='' />
                <div >
                    <h4 className='dh3'>Create project plan</h4>
                    <p className='dfp'>Start your project plan now</p>
                </div>
                <img src={sidearrow} alt='' />
            </div></Link>
            <div className='dflex1'>
                <img src={money} alt='' />
                <div >
                    <h4 className='dh3'>Get quick credit</h4>
                    <p className='dfp'>Start your project plan now</p>
                </div>
                <img src={sidearrow} alt='' />
            </div>
            <div className='dflex1'>
                <img src={club} alt='' />
                <div >
                    <h4 className='dh3'>Create lending club</h4>
                    <p className='dfp'>Start your project plan now</p>
                </div>
                <img src={sidearrow} alt='' />
            </div>
            <footer className='dflex2'>
                <div>
                  <i class="fa-solid fa-house home1"></i>
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
                <Link to='/components/accounts'><i class="fa-solid fa-wallet home"></i></Link>
                  
                  <p className='dfp'>Account</p>
                </div> 
            </footer>
        </div>
    )
}
export default Dashboard