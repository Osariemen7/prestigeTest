import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Join =()=>{
    const navigate = useNavigate()
    const [invite_code, setInvitecode] = useState('');
    const [message, setMessage] = useState('')

    
    let tok= JSON.parse(localStorage.getItem("user-info"));
const terms = (tok) => {
  let refreshval;

  if (tok === null || typeof tok === 'undefined')  {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }

  return refreshval;
};
let refresh = terms(tok)
    const handleName =(event)=> {
        setInvitecode(event.target.value)
    }
    
    const create = async(e) => {
        e.preventDefault();
    let ite ={refresh}
    let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(ite)
    });
    rep = await rep.json();
    let bab = rep.access_token
    
    
      console.warn(invite_code)
      let item = {invite_code};
      let result = await fetch ('https://sandbox.prestigedelta.com/joingroup/',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'accept' : 'application/json',
            'Authorization': `Bearer ${bab}`
       },
       body:JSON.stringify(item)
      });
    
      if (result.status !== 200) {
        setMessage("Some error occured");
      } else {
        result = await result.json();
      localStorage.setItem('user-info', JSON.stringify(tok)) 
      navigate('/components/getgroup')
      }   
    }
    
    
    return(
        <div>
        <Link to='/components/club'><i class="fa-solid fa-chevron-left bac"></i></Link>
            
           <h3 className="head">Join a Club</h3>
           <h3>Please provied a name for your club</h3>
           <form>
              <p className="sp">Invite Code</p>
              <input className="line" onChange={handleName} type="text" placeholder="Enter a valid invite code" /><br/>
              
              <div className="message">{message ? <p>{message}</p> : null}</div>
              <button type="submit" onClick={create} className="logb">Continue</button>
           </form>
        </div>
    )
}
export default Join