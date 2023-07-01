import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage =()=>{
    const [passwordType, setPasswordType] = useState("password");
    const [email, setEmail] = useState('')
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [middle_name, setMiddlename] = useState('')
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

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
const handleUsernameChange =(evnt) => {

  setUsername((evnt.target.value).replace('0', '234'));
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
            
            if (resut.status !== 201) {
              setMessage('Invalid Information');
            } else {
              resut = await resut.json();
            localStorage.setItem('user-info', JSON.stringify(resut)) 
            navigate('/components/personal')
            }
          }
      return(
        <div>
      
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
            <input type='text' className="lin"  onChange={handleMiddlename} name='middle-name' placeholder='Middle Name' /><br/>
            <p className='sp'>Phone number</p>
            <input className="lin"  onChange={handleUsernameChange} type="text" name="username" placeholder='Phone Number' required/><br/>
            <p className='sp'>Create Password</p>
            <input type={passwordType} className="line" onChange={handlePasswordChange} name='password1' />
            { passwordType==="password"?
             <i onClick={togglePassword} class="fa-regular fa-eye-slash ic"></i> : <i class="fa-regular fa-eye ic" onClick={togglePassword}></i>} <br/>
            <p className='sp'>Confirm Password</p>
            <input className="line" type={passwordType} onChange={handlePasswordConfirm} name='password2' />
            { passwordType==="password"?
             <i onClick={togglePassword} class="fa-regular fa-eye-slash ic"></i> : <i class="fa-regular fa-eye ic" onClick={togglePassword}></i>} <br/>
             <br/>
             <input class="check" type="checkbox" name="" id="check" required></input>
             <label>By tapping next, you agree to our private policy<br/> and Terms & Condition</label>
             <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
        <button className="but" onClick={reg} type="submit">Next</button>
     </div>
      )
    
}
export default RegisterPage