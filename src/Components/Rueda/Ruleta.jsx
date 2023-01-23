import React from "react";
import { NavbarApp } from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from '../../../firebaseconfig' 
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'

import './style.css';

export const Ruleta = () => {
  
  const valor0 = 0;
  const valor1 = 1;
  const valor2 = 2;

  const [user, setUser] = useState([]);

  const usersCollection = collection(db, 'usuarios');

  const getUsers = async () => {
    const data = await getDocs(usersCollection);
    // console.log(data.docs);
    setUser(
      data.docs.map((doc) => ({...doc.data(),id:doc.id}))
      )
      // console.log(user);
    }

    // Desestructuramos getUsers para sacar el id del usuario 
    useEffect(() => {
      getUsers();
    }, []);
    
    //Objeto para mapear los colores
    const colores = {
      0: 'Rojo',
      1: 'verde',
      2: 'negro'
    };

    // Use state para guardar el numero aleatorio
    const [numero, setNumero] = useState(1);
    // Funcion para generar un numero aleatorio en rango de 3 digitos
    function numeroAleatorio() {
    const num = Math.trunc(Math.random() * 3);
    setNumero(num)
  }

  return (
    <>
       <NavbarApp/>
       <main className="contenedor">
            <div className='w-100 d-flex gap-2 flex-start px-4'>
                <Link to="/" className='btn btn-success mt-2 mb-2 text-white'>Jugadores</Link>
                <Link to="/rulet" className='btn btn-primary mt-2 mb-2 text-white'><i class="fa-solid fa-dice"></i></Link>
            </div>
        
         <div>
           <h2 className="title_numero">Número Aleatorio</h2>
          <p>{numero}</p>
          
            <div className="w-auto d-flex flex-row gap-2">
              <p>0 = {colores[0]}</p>
              <p>1 = {colores[1]}</p>
              <p>2 = {colores[2]}</p>
            </div>
            <div className="contenedor__jugadores">
            <table className='table table-hover table-bordered border-warning'>
                  <thead className='table-dark'>
                    <tr>
                      <th>NOMBRES</th>
                      <th>NÚMERO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map( (users) => (
                      <tr key={users.id}>
                        <td>{users.nombre}</td>
                        <td>
                          <select name="" id="">
                            <option value="">{valor0}</option>
                            <option value="">{valor1}</option>
                            <option value="">{valor2}</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
              
            </div>
            <button onClick={numeroAleatorio} className='btn btn-primary mt-2 mb'>Girar</button>
         </div>
       </main>
    </>
  );
};
