import React, {useState,useEffect} from 'react'  
import './App.css';
import CovidSlotDashboard from './components/CovidSlotDashboard'; 
import 'semantic-ui-css/semantic.min.css'

 
 

function App() {
   

  
   
  

  return (
    <div className="App">
       <main role="main" className="container">
<img src="img/logo.png" style={{maxWidth:"220px"}}/>
 <h2>Covid19Vaccine Slots Tracker</h2>

  

  <CovidSlotDashboard  ></CovidSlotDashboard>

  </main>
  </div>

  );
}

export default App;
