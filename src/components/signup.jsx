import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [message, setMessage] = useState("");
    const [messag, setMessag] = useState("");
    const [phone_number, setPhoneNumber] = useState('')
    const navigate = useNavigate()

    const handlePhoneChange = (e) => (
        setPhoneNumber((e.target.value).replace('0', '234'))
    )
    async function signup(e) {
      e.preventDefault();
        console.warn(phone_number)
        let item = {phone_number};
        let res = await fetch ('https://sandbox.prestigedelta.com/verifyinit/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json'
         },
         body:JSON.stringify(item)
        });
       
        
        if (res.status !== 200) {
          setMessage("Invalid Phone number!");
        } else{
          res = await res.json();
          
          localStorage.setItem('user-info', JSON.stringify(res))
         navigate('/components/verify');   

        }
        
     }

    return(
        <div>
           <Link to='/'><i class="fa-solid fa-chevron-left bac"></i></Link>
           <h2>Create your Prestige Account</h2>
           <p >Let's set things up. Enter your details as they<br/> appear on your legal documents.</p>

           <form>
              <p className="sp">Phone number</p>
              <input className="lin" type="text" onChange={handlePhoneChange} name="phone_number" placeholder="Enter phone number" required/><br/><br/>
              <button className="logb" onClick={signup} type="submit">Next</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
              <div className="message">{messag ? <p>{messag}</p> : null}</div>
           </form>
           
        </div>
     )
}
export default Signup