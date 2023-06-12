import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Vector from './images/Vector.svg';
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


const Addlist=()=>{
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
  let response = await fetch("https://sandbox.prestigedelta.com/projectlist/",{
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
console.log(tok)
if(loading) {
  return(
  <p>Loading</p>)
}
  return(
    <div>
        <Link to='/components/project'><i class="fa-solid fa-chevron-left bac"></i></Link>
        <h4 className="dh3">{info[0].name}</h4>
        <div className="kd">
        <div className="pp">
           <p>Balance</p>
           <p>In Progress</p>
        </div>
        <h2 className="ah3">₦{(parseInt(info[0].target) - parseInt(info[0].equity)).toLocaleString('en-US')}</h2>
        <p className="prip">{parseInt( info[0].equity)/parseInt(info[0].target) * 100}% achieved of ₦{(info[0].target).toLocaleString('en-US')} </p>
        <div className="progress-bar" style={{ width: `${parseInt( info[0].equity)/parseInt(info[0].target) * 100}%` }}>
         </div>
        </div>
         <div className="aflex">
         <Link className="topb" to='/components/fund'>Top up</Link>
         <Link className="trb" to='/components/transact'>View Transactions</Link>
         
         </div>
         <div className='dflex'>
            <img src={Vector} alt=''/>
                <p className='dfp'>Maturity date may depend on your ability to make the payment on schedule</p>
            </div>
            <div className="adf">
              <div className="asav">
                 <p>Savings Target(30%)</p>
                 <p>Maturity Date</p>
              </div>
              <div className="asav1">
                <p>₦{(info[0].target_equity).toLocaleString('en-US')}</p>
                <p>{(new Date(info[0].maturity_day)).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
            <div className="adf">
               <div className="asa2">
                  <p>Interest Value(2% p.a)</p>
                  <p>Repayment Date</p>
               </div>
               <div className="asav1">
                  <p>₦{(info[0].interest_value).toLocaleString('en-US')}</p>
                  <p>{(new Date(info[0].repayment_day)).toLocaleDateString('en-GB')} </p>
               </div>
            </div>
            <h4 className="prit">Project Resources</h4>
            <p className="prip">List of project Resources you will need for this project</p>
            <div className="">
            {info[0].assets.map((obj, index) =>
              <div className="asa">
                <p key={index}>{obj.name}</p>
                <p key={index}>₦{(obj.price).toLocaleString('en-US')}</p>
              </div>)}
               <div className="asagr">
                <p>Total</p>
                <p>₦{(info[0].target).toLocaleString('en-US')}</p>
               </div>
            </div>
    </div>
  )
}
export default Addlist