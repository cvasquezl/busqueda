import React, { useState, useEffect } from 'react';
import axios from 'axios'; //npm i axios



const URL = process.env.REACT_APP_URI  //variable de entorno  

const App = () => {
 
  const [ busquedas, setBusquedas ] = useState([])
/*   const [ id, setId ] = useState('')
  const [ ciudad, setCiudad ] = useState('')
  const [ iata, setIata ] = useState('')
  const [ region, setRegion ] = useState('') */
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

const getfiltro = async () =>{
  const res = await axios.get(URL+'/'+texto)
  setBusquedas(res.data)
}

const refresh = () =>{
  getBusquedas()
  setBuscarC('')
  setBuscarI('')
  setBuscarR('')
}

const buscandoC = (e) => {
    setBusquedas(filtro("c"))
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

// const addLibro = async () => {
//     let obj = { nombre, edicion } 
//     const res = await axios.post(URL, obj) 
//     console.log(res.data)
//     setNombre('')
//     setEdicion('')
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
    <div className="container bg-success">   

     <nav className="navbar navbar-dark bg-primary justify-content-center">
       <a className="navbar-brand text-dark" href="/">Consulta de Geo
      </a>
    </nav>

     <div className="row">

       <div className="col-md-4"> 
         <h1 className="text-primary">Buscar Ciudad</h1>
         
         <input
             className="form-control mb-2" placeholder="Ciudad" value={buscarC}
             onChange={(e) => setBuscarC(e.target.value)}
             onKeyUp={buscandoC} 
          />
          <button 
              className="btn btn-primary" 
              onClick={refresh}>REFRESH</button>
        </div>
       <div className="col-md-4"> 
         <h1 className="text-primary">Buscar IATA</h1>
         
         <input
             className="form-control mb-2" placeholder="Iata" value={buscarI}
             onChange={(e) => setBuscarI(e.target.value)}
             onKeyUp={buscandoI} 
          />
        </div>
       <div className="col-md-4"> 
         <h1 className="text-primary">Buscar Region</h1>
         
         <input
             className="form-control mb-2" placeholder="Region" value={buscarR}
             onChange={(e) => setBuscarR(e.target.value)}
             onKeyUp={buscandoR} 
          />
        </div>
     </div>
     
     <div className="row mt-4 ">   
         { busquedas.map(item => (
          <div key={item._id}  className="col-md-4">
            <div className="card p-3 m-2 border-primary bg-secondary bg-transparent">
               <p>Ciudad: {item.CIUDAD}</p>
               <p>IATA: {item.IATA}</p>  
               <p>Region: {item.REGION}</p>  
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
