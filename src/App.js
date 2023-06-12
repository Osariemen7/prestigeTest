import React, {useState, useEffect} from 'react';
import './App.css';
import ScreenLoad from './components/opening';
import LandPage from './components/landing';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/login';
import Signup from './components/signup';
import Verify from './components/verify';
import RegisterPage from './components/register';
import PersonalPage from './components/personal';
import Select from './components/select';
import ThankPage from './components/Thanks';
import Dashboard from './components/dash';
import FundPage from './components/fund';
import TokenPage from './components/token';
import ProjectPage from './components/project';
import PopPage from './components/pop';
import CreatePage from './components/createp';
import AddPage from './components/Addlist';
import ListPage from './components/listp';
import Frequent from './components/frequent';
import Accounts from './components/accounts';
import Transact from './components/transact';
import Pro from './components/pro'
function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])
  return (
    <>
         {loading === false ? (
    
    <div className="App">
     <Routes>
        <Route path='/' element={<LandPage />}/>
        <Route path='/components/login' element={<LoginPage />}/>
        <Route path='/components/signup' element={<Signup />}/> 
        <Route path='/components/verify' element={<Verify />}/> 
        <Route path= '/components/register' element={<RegisterPage />} />
        <Route path= '/components/personal' element ={<PersonalPage />} />
        <Route path= '/components/frequent' element={<Frequent />} />
        <Route path= '/components/thanks' element={<ThankPage />} />
        <Route path='/components/dash' element={<Dashboard />} />
        <Route path='/components/fund' element={<FundPage />} />
        <Route path= '/components/token' element={<TokenPage />} />
        <Route path='/components/project' element={<ProjectPage />} />
        <Route path='/components/pop' element={<PopPage />} />
        <Route path='/components/createp' element={<CreatePage />} />
        <Route path='/components/Addlist' element={<AddPage />} />
        <Route path='/components/listp' element={<ListPage />} />
        <Route path='/components/select' element={<Select />} />
        <Route path='/components/accounts' element={<Accounts />} />
        <Route path="/components/transact" element={<Transact />} />
        <Route path ='/components/Addlist' element={<Transact />} />
        <Route path='/components/pro' element={<Pro />} />
      
     </Routes>
      
    </div>
    ) : (
        <ScreenLoad/>
      )}
      </>
  );
}


export default App;
