import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

const RegisterPage =()=>{
    const [passwordType, setPasswordType] = useState("password");
    const [email, setEmail] = useState('')
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [middle_name, setMiddlename] = useState('')
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const location= useLocation()
    const [message, setMessage] = useState("");
    const [check, setCheck] = useState('')
    const navigate = useNavigate()
    const user =location.state.num
    let username = user.phone_number
    
   const handleCheck =(event) =>{
    setCheck(event.target.value)
   }
    const handleEmailChange = (event) =>{
       setEmail(event.target.value)
    }
    const handleFirstChange = (event)=>{
         setFirstname(event.target.value)
    }
    const handleLastname = (event)=> {
         setLastname(event.target.value)
    }
    const handleMiddlename = (event)=>{
         setMiddlename(event.target.value)
    }
    const handlePasswordChange =(evnt)=>{
        
      setPassword1(evnt.target.value);
  }
  const handlePasswordConfirm =(evnt)=>{
        
    setPassword2(evnt.target.value);
}
    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }
      async function reg(e) {
          e.preventDefault();
            console.warn(username, password1, password2, first_name, last_name, middle_name, email)
            let item = {username, password1, password2, first_name, last_name, middle_name, email};
            let resut = await fetch ('https://sandbox.prestigedelta.com/dj-rest-auth/registration/',{
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json',
                  'accept' : 'application/json'
             },
             body:JSON.stringify(item)
            });
        
            if (check === ''){
              setMessage('Privacy policy and Terms and Condition must be checked')
          
            }  else if (resut.status !== 201) {
              resut = await resut.json();
              setMessage(JSON.stringify(resut));}
            else {
              resut = await resut.json();
              localStorage.setItem('user-info', JSON.stringify(resut)) 
            navigate('/components/personal')
            }
          }
          //
      return(
        <div>
      <Helmet>
         <title>Registration</title>
            
        </Helmet>
        <h2>Enter your details</h2>
         <p className='lp'>Let's set things up. Enter your details as they appear in your legal documents</p>
        <form>
            <p className='sp'>Email Address</p>
            <input type='email' className="lin" onChange={handleEmailChange } name='email' placeholder='Enter Email'/><br/>
            <p className='sp'>First Name</p>
            <input type='text' className="lin" onChange={handleFirstChange} name='first-name' placeholder='First Name'/><br/>
            <p className='sp'>Last Name</p>
            <input type='text' className="lin" onChange={handleLastname} name='last-name' placeholder='Last Name' /><br/>
            <p className='sp'>Middle Name</p>
             <input className="lin"  onChange={handleMiddlename} type="text" name="middlename" placeholder='Middle Name' required/><br/>
            <p className='sp'>Create Password</p>
            <input type={passwordType} className="line" onChange={handlePasswordChange} name='password1' />
            { passwordType==="password"?
             <i onClick={togglePassword} class="fa-regular fa-eye-slash ic"></i> : <i class="fa-regular fa-eye ic" onClick={togglePassword}></i>} <br/>
            <p className='sp'>Confirm Password</p>
            <input className="line" type={passwordType} onChange={handlePasswordConfirm} name='password2' />
            { passwordType==="password"?
             <i onClick={togglePassword} class="fa-regular fa-eye-slash ic"></i> : <i class="fa-regular fa-eye ic" onClick={togglePassword}></i>} <br/>
             <br/>
             <input class="check" type="checkbox" name="" onChange={handleCheck} value="check" required></input>
             <label>By tapping next, you agree to our <a className='lsf' href='https://prestigefinance.co/policy.html'>privacy policy</a><br/> and <a className='lsf' href='https://prestigefinance.co/terms.html'>Terms & Condition</a> </label>
             <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
        <button className="but" onClick={reg} type="submit">Next</button>
     </div>
      )
    
}
export default RegisterPage