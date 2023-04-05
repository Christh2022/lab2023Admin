import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './authoContext/AuthContext';
import { auth } from './firebase';
import Addadmin from './Pages/admin/Addadmin';
import Authentification from './Pages/admin/Authentification';
import Chat from './Pages/admin/Chat';
import Dashboard from './Pages/admin/dashboard';
import Error from './Pages/admin/Error';
import PassWord from './Pages/admin/Password';


function App() {
  const [changeBody, setChangeBody] = useState(true)

  onAuthStateChanged(auth, (user)=>{
    if(user){
      setChangeBody(false)
    } else {
      setChangeBody(true)
    }
  })

  const changeCssBody = ()=>{
    setChangeBody(changeBody)
  }

  useEffect(()=>{
    if(!changeBody){
      document.body.style.position = 'static';
      document.body.style.display = 'block';
    } else {
      document.body.style.position = 'relative';
      document.body.style.width = '100%';
      document.body.style.display = 'grid';
      document.body.style.placeItems = 'center';
    }
  })

  

  return (
    <div className='App'>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path='/authentification' element={<Authentification changeCssBody={changeCssBody}/>}/>
            <Route path='/' element={<Dashboard changeCssBody={changeCssBody}/>}/>
            <Route path='/ChatBox' element={<Chat changeCssBody={changeCssBody}/>}/>
            <Route path='/mot_de_passe_oublie' element={<PassWord changeCssBody={changeCssBody}/>}/>
            <Route path='/add_admin' element={<Addadmin changeCssBody={changeCssBody}/>}/> 
            <Route path='/*' element={<Error changeCssBody={changeCssBody}/>}/>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
