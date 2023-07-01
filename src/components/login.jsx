import { useState } from "react"
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom"


const LoginPage = () => {
    const [message, setMessage] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('');
    const navigate = useNavigate()
   
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
    // useEffect (() => {
    //     if (localStorage.getItem('user-info')) {
    //            navigate.push('/component/signup')
    //     }
    // }, [])
   async function login(e) {
    e.preventDefault();
      console.warn(username, password)
      let item = {username, password};
      let result = await fetch ('https://sandbox.prestigedelta.com/dj-rest-auth/login/',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'accept' : 'application/json'
       },
       body:JSON.stringify(item)
      });
      if (result.status !== 200) {
        setMessage("Invalid Username/Password");
      } else {
        result = await result.json();
      localStorage.setItem('user-info', JSON.stringify(result)) 
      
      navigate('/components/dash')
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
                <p className="lop">Forgot Password?</p>
            </form>
            <footer className="fot">Dont have an account? <Link to='/components/signup'><span className="lsf">Sign Up</span></Link></footer>
        </div>
    )
 }
 export default LoginPage