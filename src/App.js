import React, { useState, useEffect } from 'react';
import axios from 'axios'; //npm i axios
import './style/variable.scss';

const URL = process.env.REACT_APP_URI  //variable de entorno  

const App = () => {
 
  const [ busquedas, setBusquedas ] = useState([])
  // const [ id, setId ] = useState('')
  // const [ CIUDAD, setCiudad ] = useState('')
  // const [ IATA, setIata ] = useState('')
  // const [ REGION, setRegion ] = useState('') 
  const [ buscarC, setBuscarC ] = useState('')
  const [ buscarI, setBuscarI ] = useState('')
  const [ buscarR, setBuscarR ] = useState('')
  const [ texto, setTexto ] = useState('')
/*   const [ bandera, setBandera ] = useState(true) */

  useEffect(() => {
  getBusquedas()
},[])

function filtro (e){
  switch (e) {
    case "c":
      return busquedas.filter((busqueda) =>
         busqueda.CIUDAD.toLowerCase().indexOf(buscarC.toLowerCase()) > -1)
    case "i":
      return busquedas.filter((busqueda) =>
         busqueda.IATA.toLowerCase().indexOf(buscarI.toLowerCase()) > -1)
    case "r":
      return busquedas.filter((busqueda) =>
         busqueda.REGION.toLowerCase().indexOf(buscarR.toLowerCase()) > -1)
    default:
      break;
  }    
}

function retroceder (e){
  
  if (e.key !== 'Backspace'){
    console.log(e.key);    
  }else{
    refresh();
  }
}

const getfiltro = async () =>{
  const res = await axios.get(URL+'/'+texto)
  setBusquedas(res.data)
}

function refresh (){
  getBusquedas()
  setBuscarC('')
  setBuscarI('')
  setBuscarR('')
}

const buscandoC = (e) => {
    setBusquedas(filtro("c"))
    console.log(e);
}
const buscandoI = (e) => {
    setBusquedas(filtro("i"))
}
const buscandoR = (e) => {
    setBusquedas(filtro("r"))
}

const getBusquedas = async () => {
    const res = await axios.get(URL) 
    setBusquedas(res.data) 
}

// const AgregarBusqueda = async () => {
//   let obj = { CIUDAD,REGION,IATA} 
//   const res = await axios.post(URL, obj) 
//   console.log(res.data)
//   setCiudad('')
//   setRegion('')
//   setIata('')
// }

// const deleteLibro = async (id) => {
//     const res = await axios.delete(URL+'/'+id)
//     console.log(res.data)
//     getLibros()
// }

// const getLibro = async (id) => {
//     const res = await axios.get(URL+'/obtener/'+id)
//     setId(res.data._id)
//     setNombre(res.data.nombre)
//     setEdicion(res.data.edicion)
//     setBandera(false)
// }

// const addOrUpdateLibro = () => {
//     bandera? addLibro() : update()   
// }

// const update = async () => {
//     const obj = { id, nombre, edicion }
//     const res = await axios.put(URL, obj)
//     console.log(res.data)
//     setBandera(true)
//     setNombre('')
//     setEdicion('')
//     getLibros()
// }


  return (
    <div className="container cont">   
    
     <nav className="navbar navbar-dark barra justify-content-center">
      
        <img className="tamano-img" src="https://www.cloudanalysts.com/wp-content/uploads/2020/06/astro.png"/>
       <a className="navbar-brand text-dark tamano-letra" href="/">Consulta de Geo
      </a>
    
    </nav>

     <div className="row">

       <div className="col-md-4"> 
         <h1 className="color-text sub-letra-t ">Buscar Ciudad</h1>
         
         <input
             className="form-control mb-2" placeholder="Ciudad" value={buscarC}
             onChange={(e) => setBuscarC(e.target.value)}
             onKeyUp={buscandoC} onKeyDown={retroceder}
          />
          <button 
              className="btn botton-color" 
              onClick={refresh}>REFRESH</button>
        </div>
       <div className="col-md-4"> 
         <h1 className="color-text sub-letra-t">Buscar IATA</h1>
         
         <input
             className="form-control mb-2" placeholder="Iata" value={buscarI}
             onChange={(e) => setBuscarI(e.target.value)}
             onKeyUp={buscandoI} onKeyDown={retroceder}
          />
        </div>
       <div className="col-md-4"> 
         <h1 className="color-text sub-letra-t">Buscar Region</h1>
         
         <input
             className="form-control mb-2" placeholder="Region" value={buscarR}
             onChange={(e) => setBuscarR(e.target.value)}
             onKeyUp={buscandoR} onKeyDown={retroceder}
          />
        </div>
     </div>
     
     <div className="row mt-4 ">   
         { busquedas.map(item => (
          <div key={item._id}  className="col-md-4">
            <div className="card p-3 m-2 border-color tarjeta">
               <p>Ciudad: {item.CIUDAD}</p>
               <p>IATA: {item.IATA}</p>  
               <p>Region: {item.REGION}</p>  
               <p>Comuna: {item.COMUNA}</p>  
               {/* <div className="d-flex flex-row-reverse">
               <button 
                 className="btn btn-danger" 
                 onClick={() => deleteLibro(item._id)}>DELETE</button> 
               <button 
                 className="btn btn-success mr-2" 
                 onClick={() => getLibro(item._id)}>UPDATE</button> 
                 </div>   */}
            </div>
          
          </div>

        ))} 
        </div> 
    </div>
  );
}

export default App;
