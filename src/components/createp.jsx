import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
const CreatePage =()=>{
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [payment_amount, setPayment] = useState('')
    const [message, setMessage] = useState('')
    const [often, setOften] = useState('');
    const [refr, setRefre] = useState(refresh)

    const handleChange = (event) => {
      setOften(event.target.value)
    }
    

    const handleName =(event)=> {
        setName(event.target.value)
    }
    const handlePayment = (event) => {
        setPayment(event.target.value)
    }
    const create = (e) => {
        e.preventDefault()
        setRefre(refr)
        console.warn(name, payment_amount, refr, often)
        let data = {name, payment_amount, refr, often}
        if (name.length > 1 && often.length > 1 && payment_amount.length > 1) {
            
            navigate('/components/listp', {state:{data}})
            
          } else {
            setMessage("Both field must be filled");
          }   
    }
    
    console.log(refr)
    return(
        <div>
        <Link to='/components/pop'><i class="fa-solid fa-chevron-left bac"></i></Link>
            
           <h3 className="head">Create Project</h3>
           <p className='sp'>A descriptive name makes your project memorable</p>
           <form>
              <p className="sp">Project Name</p>
              <input className="line" onChange={handleName} type="text" placeholder="Enter name of Project" /><br/>
              <p className='sp'>Will this project help you generate revenue or reduce cost?</p>
              
              <input type="radio" 
                value='Cost'
                checked={often === 'Cost'}
                onChange={handleChange}
              />
               <label>Cost</label>
           
           
               <input type="radio" className='rad'
                value='Revenue'
                checked={often === 'Revenue'}
                onChange={handleChange}
               />
                <label>Revenue</label>
           {often === 'Cost'? (
            <p className='sp'>How much will it save you Monthly?</p>
           ) :
              <p className="sp">Expected Monthly Revenue</p>}
              <input className="line" onChange={handlePayment} type="text" placeholder="₦0.00" /><br/>
              
              <div className="message">{message ? <p>{message}</p> : null}</div>
              <button type="submit" onClick={create} className="logb">Continue</button>
           </form>
        </div>
    )
}
export default CreatePage