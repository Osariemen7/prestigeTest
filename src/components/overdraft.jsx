import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Overdraft = () => {
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(true)

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
    setLoading(false)
 setUsers(response)
  }

useEffect(() => {
  fetchData()
}, [])
if(loading) {
    return(
    <p>Loading...</p>)
  }

    return(
        <div>
            <Link to='/components/accounts'><i class="fa-solid fa-chevron-left bac"></i></Link>
             <h4 className="oveh">Overdraft</h4>
             <h5 className="ove">You Owe</h5>
             <h1 className="oveh">₦{(users[0].overdraft.balance).toLocaleString('en-US')}</h1>
            <Link to='/components/overd'><button className="logbd">Quick Credit</button></Link> 
             <div className="pd">
               <div className="ovp">
                  <p>Available to you</p>
                  <h4>₦{(users[0].overdraft.limit).toLocaleString('en-US')}</h4>
               </div> 
               <div className="ovpi">
                    <p>Tenure</p>
                    <h4>30 days</h4>
               </div>
               <div className="opp">
                   <p>Daily Interest</p>
                   <p>0.3%</p>
               </div>
             </div>
             <p className="ov">The fees will be applied only after you borrow from your loan account</p>
        </div>
    )
}
export default Overdraft