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
  if(loading) {
    return(
    <p>Loading</p>)
  }

    return(
        <div>
            <Link to='/components/project'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <h4 className="dh3">transaction History</h4>
            {info[0].transactions.map((obj, index) => 
                  <div className='td'>
                  <div className='tl'>
                       <p key={index}>{obj.amount}</p>
                       <p key={index}>{(new Date(obj.time)).toLocaleString('en-GB')}</p>
                  </div>
                  <div className='tg'>
                       <p key={index}>{obj.classification}</p>
                       
                  </div>
        
                  </div>
                       )}
        </div>
    )
}
export default Transact