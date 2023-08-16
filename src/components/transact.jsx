import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    thirtyDaysBefore.setDate(currentDate.getDate() - 90)  

const Transact = () =>{
    const [info, setInfo] = useState('')
    const [loading, setLoading] = useState(true);
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
    let response = await fetch(`https://sandbox.prestigedelta.com/transactions/?start_date=01/31/2022&end_date=${(new Date()).toLocaleDateString('en-GB')}`,{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    //localStorage.setItem('user-info', JSON.stringify(item))
    response = await response.json()
    setInfo(response)
    setLoading(false)
  }
  useEffect(() => {
    fetchDa()
  }, [])
  if(loading) {
    return(
    <p>Loading</p>)
  }

    return(
        <div>
            <Link to='/components/project'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <h4 className="dh3">transaction History</h4>
            {info.map((obj, index) => (
  <div key={index}>
    {obj.transactions.map((transaction, transactionIndex) => (
      <div key={transactionIndex} className='td'>
        <div className='tl'>
          <p>{transaction.classification}</p>
          <p>{transaction.amount}</p>
        </div>
        <div className='tg'>
          <p>{transaction.status}</p>
          <p>{new Date(transaction.time).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        </div>
        <p className='tm'>{transaction.description}</p>
      </div>
    ))}
  </div>
))}
        </div>
    )
}
export default Transact