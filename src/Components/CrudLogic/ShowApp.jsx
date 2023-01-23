import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebaseconfig' 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { NavbarApp } from '../Navbar/Navbar'
import { FooterApp } from '../Footer/FooterApp'

const MySwal = withReactContent(Swal)


const ShowApp = () => {
    //1. configuración de hooks
    const [user, setUser] = useState([]);

    //2. referencia a la DB firestore
    const usersCollection = collection(db, 'usuarios');

    //3. funcion para mostrar todos los documentos

   const getUsers = async () => {
        const data = await getDocs(usersCollection);
        // console.log(data.docs);
        setUser(
          data.docs.map((doc) => ({...doc.data(),id:doc.id}))
        )
        // console.log(user);
    }

    //4. funcion para eliminar un registro

    const deleteUser = async (id) => {
      const userDoc = doc(db, "usuarios", id)
      await deleteDoc(userDoc)
      getUsers()
    } 

    //5 funcion de confirmación del sweet alert 
    const confirmDelete = () => {
      Swal.fire({
        title: `¿Desea eliminar a jugador?`,
        text: "¡ No podrás revertir esto !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Se llama a la funcion para eliminar el usuario
          // Solucionar: esta dando problemas. no se identifica el id
          // deleteUser(id)
          Swal.fire(
            'Jugador eliminado',
            'Sus datos fueron eliminados exitosamente',
            'success'
          )
        }
      })
    }

    //6 useEffect
    useEffect(() => {
        getUsers();
    }, []);

  
  return (
    <>
      <NavbarApp/>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <div className='w-auto d-flex gap-2'>
                <Link to="/create" className='btn btn-warning mt-2 mb-2 text-white'>Agregar</Link>
                <Link to="/rulet" className='btn btn-primary mt-2 mb-2 text-white'><i class="fa-solid fa-dice"></i></Link>
              </div>
              <table className='table table-hover table-bordered border-warning'>
                  <thead className='table-dark'>
                    <tr>
                      <th>NOMBRES</th>
                      <th>APELLIDOS</th>
                      <th>MONTO - DINERO</th>
                      <th>EDITAR</th>
                      <th>ELIMINAR</th>
                    </tr>
                  </thead>

                  <tbody>
                    {user.map( (users) => (
                      <tr key={users.id}>
                        <td>{users.nombre}</td>
                        <td>{users.apellido}</td>
                        <td>${users.c_dinero}</td>
                        <td>
                          <Link to={`/edit/${users.id}`} className="btn btn-primary"><i className="fa-regular fa-pen-to-square"></i></Link>
                        </td>
                        <td>
                         <button onClick={ ()=>{deleteUser(users.id)}} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FooterApp/>
    </>
  )
}

export default ShowApp
