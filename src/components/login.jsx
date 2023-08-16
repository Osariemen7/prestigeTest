import { useState } from "react"
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom"
import Modal from 'react-modal'



const LoginPage = () => {
    const [message, setMessage] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('');
    const [messag, setMessag] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
    };
   
    const handleUsernameChange =(evnt) => {

        setUsername((evnt.target.value).replace('0', '234'));
    }
    const handlePasswordChange =(evnt)=>{
        
        setPassword(evnt.target.value);
    }
    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }
    const handleEmailChange = (event) =>{
      setEmail(event.target.value)
   }
    // useEffect (() => {
    //     if (localStorage.getItem('user-info')) {
    //            navigate.push('/component/signup')
    //     }
    // }, [])
   async function login(e) {
    e.preventDefault();
      console.warn(username, password)
      let item = {username, password};
      let response = await fetch ('https://sandbox.prestigedelta.com/dj-rest-auth/login/',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'accept' : 'application/json'
       },
       body:JSON.stringify(item)
      });
      if (response.status !== 200) {
        setMessage('Invalid Username/Password');
      } else {
        let result = await response.json();
        if (result.user.anchor_user_created !== true) {
          localStorage.setItem('user-info', JSON.stringify(result))
          navigate('/components/personal', {state:{result}})
        } else if (result.user.nuban_set !== true) {
          localStorage.setItem('user-info', JSON.stringify(result))
          navigate('/components/thanks', {state:{result}})
        } else {
          localStorage.setItem('user-info', JSON.stringify(result));
          navigate('/components/dash');
        }
      } 
   }
   async function ema(e) {
    e.preventDefault();
    
      console.warn(email)
      let item = { email};
      let result = await fetch ('https://sandbox.prestigedelta.com/emailotp/',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'accept' : 'application/json',
        
       },
       body:JSON.stringify(item)
      });
    
      if (result.status !== 200) {
        setMessag(JSON.stringify(result));
      } else {
        result = await result.json();
   
      navigate('/components/token')
      }
    }

    return(
        <div>
        <Helmet>
            <title>Log in Page</title>L
            
        </Helmet>
            <h2 className="lh">Welcome Back</h2> 
            <p className="lp">Let's get started with some basic information about your business </p>

            <form>
                <p className='sp'>Phone number</p>
                <input className="lin"  onChange={handleUsernameChange} type="text" name="username"  required/><br/><br/>
                <p className="sp">Password</p>
                <input className="line" type={passwordType} onChange={handlePasswordChange}  name="password" required/>
                { passwordType==="password"?
                <i onClick={togglePassword} class="fa-regular fa-eye-slash ic"></i> : <i class="fa-regular fa-eye ic" onClick={togglePassword}></i>} <br/><br/>
                <button className="logb" onClick={login} type="submit">Log in</button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <p className="lop" onClick={openModal}>Forgot Password?</p>
            </form>
            <footer className="fot">Dont have an account? <Link to='/components/signup'><span className="lsf">Sign Up</span></Link></footer>
            <Modal
      className='modal'
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Popup"
    >
         <i className="fa-solid fa-x mx" onClick={closeModal}></i>
         
           <p >Please Enter Your Email</p>

           <form>
              <p className="sp">Email Address</p>
              <input className="lin" type="email" onChange={handleEmailChange} name="email" placeholder="Enter Email Address" required/><br/><br/>
              <button className="logb" onClick={ema} type="submit">Next</button>
              <div className="message">{messag ? <p>{messag}</p> : null}</div>
           </form>
    </Modal>
        </div>
    )
 }
 export default LoginPage