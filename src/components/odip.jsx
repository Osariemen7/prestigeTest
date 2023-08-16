import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import good from './images/good.svg'

const Done =()=>{
    const [message, setMessage] = useState("");
     const navigate= useNavigate()

     const create = () =>{
        navigate('/components/overdraft')
      }
    return(
        <div>
           <div className=''>
              <img className='opend' src={good} alt=''/>
              <h2 >Successful</h2>
              <p>Overdraft Updated</p>
              <div className="message">{message ? <p>{message}</p> : null}</div>
              <button className='logb' onClick={create}>Okay</button>
           </div>

        </div>
    )
}
export default Done