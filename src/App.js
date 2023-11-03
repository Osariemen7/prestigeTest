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
import ListPage from './components/listp';
import Frequent from './components/frequent';
import Accounts from './components/accounts';
import Transact from './components/transact';
import Pro from './components/pro';
import Club from './components/club';
import CreateClub from './components/cclub';
import GetGroup from './components/getgroup';
import Join from './components/joinc';
import Navbar from './components/navbar';
import PostMon from './components/getgrp2';
import Receipt from './components/getrec';
import Overdraft from './components/overdraft';
import Request from './components/overd';
import Display from './components/odisplay';
import Done from './components/odip';
import Savings from './components/savings';
import Detail from './components/detail'
import Customer from './components/customer';
import Cusdet from './components/cusdet';
import Recdet from './components/Receipt';
import Resident from './components/resident';
import Business from './components/rebout';
import Bud from './components/reboard';
import Addlist from './components/Addlist';
import Credit from './components/credit';
import Inventory from './components/inventory';
import Product from './components/product';
import ProDe from './components/prodet';
import Invoice from './components/invoice';
import BuyP from './components/before';
import BarChart from './components/test';
import Sales from './components/pinvoice';
import Review from './components/review';

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
        <Route path='/components/listp' element={<ListPage />} />
        <Route path='/components/select' element={<Select />} />
        <Route path='/components/accounts' element={<Accounts />} />
        <Route path="/components/transact" element={<Transact />} />
        <Route path ='/components/Addlist' element={<Addlist />} />
        <Route path='/components/pro' element={<Pro />} />
        <Route path='/components/club' element={<Club />}/>
        <Route path='/components/joinc' element={<Join />} />
        <Route path='/components/cclub' element={<CreateClub />} />
        <Route path='/components/getgroup' element={<GetGroup />} />
        <Route path='/components/navbar' element={<Navbar />} />
        <Route path='/components/getgrp2' element={<PostMon />} />
        <Route path='/components/getrec' element={<Receipt />} />
        <Route path='/components/overdraft' element={<Overdraft />} />
        <Route path='/components/overd' element={<Request />} />
        <Route path='/components/odisplay' element={<Display />} />
        <Route path='/components/odip' element={<Done />} />
        <Route path='/components/savings' element={<Savings />} />
        <Route path='/components/detail' element={<Detail />} />
        <Route path='/components/customer' element={<Customer />} />
        <Route path='/components/cusdet' element={<Cusdet />} />
        <Route path='/components/Receipt' element={<Recdet />} />
        <Route path='/components/resident' element={<Resident />} />
        <Route path='/components/rebout' element={<Business />} />
        <Route path='/components/reboard' element={<Bud />} />
        <Route path='/components/credit' element={<Credit />} />
        <Route path='/components/inventory' element={<Inventory />} />
        <Route path='/components/product' element={<Product />} />
        <Route path='/components/prodet' element={<ProDe />} /> 
        <Route path='/components/invoice' element={<Invoice />} /> 
        <Route path='/components/before' element={<BuyP />} /> 
        <Route path='/components/test' element={<BarChart />} />
        <Route path='/components/pinvoice' element={<Sales />} /> 
        <Route path='/components/review' element={<Review />} />    
     
     </Routes>
      
    </div>
    ) : (
        <ScreenLoad/>
      )}
      
      </>
  );
}


export default App;
