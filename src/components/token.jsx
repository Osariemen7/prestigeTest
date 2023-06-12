import { useState } from 'react';
import presp from './images/presp.png';
import { useNavigate } from 'react-router-dom';

const TokenPage =()=>{
    const [message, setMessage] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate()

    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }
      async function login(e) {
        e.preventDefault();
        let resi= JSON.parse(localStorage.getItem("user-info"));
        let refresh = resi.refresh_token
          console.warn(refresh)
          let item = {refresh};
          let rest = await fetch ('https://api.prestigefinance.co/dj-rest-auth/token/refresh/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json'
           },
           body:JSON.stringify(item)
          });
          if (rest.status !== 200) {
            setMessage("Invalid Username/Password");
          } else {
            rest = await rest.json();
          localStorage.setItem('user-info', JSON.stringify(rest)) 
          navigate('/components/dash')
          }
          
       }
       let es= JSON.parse(localStorage.getItem("user-info"));
        let name = es.user
    return(
        <div>
            <div className="op">
               <img src={presp} className="frame" alt="logo"/>
           </div>
           <h3>Welcome back {name.first_name}</h3>
           <p className="sp">Password</p>
                <input className="line" type={passwordType} name="password" required/>
                { passwordType==="password"?
                <i onClick={togglePassword} class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye" onClick={togglePassword}></i>} <br/><br/>
                <button className="but1" onClick={login} type="submit">Log in</button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
        </div>
    )
}
export default TokenPage