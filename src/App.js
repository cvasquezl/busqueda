import React, { useState, useEffect } from 'react';
import axios from 'axios'; //npm i axios
import './style/variable.scss';

const URL = process.env.REACT_APP_URI  //variable de entorno  

function App(){

  const [ciudades, setCiudades]= useState([]);
  const [grupoCiudades, setGrupoCiudades]= useState([]);
  const [busqueda, setBusqueda]= useState("");

  const peticionGet = async() =>{
    await axios.get(URL)
    .then (res =>{
      setCiudades(res.data);
      setGrupoCiudades(res.data);
    }).catch(error => {
      console.log(error);
    })
  }

const handleChange=e=>{
  setBusqueda(e.target.value);
  filter(e.target.value);
}

const filter =(terminoBusqueda)=>{
  var resultadoBusqueda=grupoCiudades.filter((elemento)=>{
    if(elemento.CIUDAD.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento.IATA.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ||elemento.REGION.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
      return elemento;
    }
  });

  setCiudades(resultadoBusqueda);
}
const REFRESH =()=>{
  setCiudades(grupoCiudades);
  setBusqueda("");
}

useEffect(()=>{
  peticionGet();
},[])

  return (
    <div className="container cont">   
    
     <nav className="navbar navbar-dark barra justify-content-center">
      
        <img className="tamano-img" src="https://www.cloudanalysts.com/wp-content/uploads/2020/06/astro.png"/>
       <a className="navbar-brand text-dark tamano-letra" href="/">Consulta de Geo
      </a>
    
    </nav>

     <div className="row justify-content-center">

       <div className="col-md-5 text-center"> 
         <h1 className="color-text sub-letra-t ">Buscar Ciudad</h1>
         <form id="formBusqueda">
          <input
              className="form-control mb-2 text-center" placeholder="Ciudad, IATA y Region" value={busqueda}
              onChange={handleChange}
              
            />
         </form>
          <button 
              className="btn botton-color "
              onClick={REFRESH}>REFRESH</button>
        </div>
        </div>
      
     <div className="row mt-4 ">   
         { ciudades.map(item => (
          <div key={item._id}  className="col-md-4">
            <div className="card p-3 m-2 border-color tarjeta">
               <p>Ciudad: {item.CIUDAD}</p>
               <p>IATA: {item.IATA}</p>  
               <p>Region: {item.REGION}</p>  
               <p>Comuna: {item.COMUNA}</p>  
              
            </div>
          
          </div>

        ))} 
        </div> 
    </div>
  );
}
export default App;
