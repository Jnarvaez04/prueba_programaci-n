import React from 'react'
import { db } from '../../../firebaseconfig'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { NavbarApp } from '../Navbar/Navbar'

export const EditApp = () => {

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dinero, setDinero] = useState(0)

  const navigate = useNavigate()
  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const usuarios = doc(db, 'usuarios', id)
    // capturamos la informacion de los inputs
    const data = {nombre: nombre, apellido: apellido, c_dinero: dinero}
    // Inicializamos function de firestore para capturar la info de bd y la informacion de los inputs
    await updateDoc(usuarios, data)
    navigate(`/`)
  }

  const getUsersById = async (id) => {
    const usuario = await getDoc(doc(db, 'usuarios', id))
    if(usuario.exists()){
      // console.log(usuario.data())
      setNombre(usuario.data().nombre)
      setApellido(usuario.data().apellido)
      setDinero(usuario.data().dinero)
    }else{
      console.log('usuario no encontrado')
    }
  }

  useEffect( () => {
    getUsersById(id)
  }, [])

  return (
    <>
      <NavbarApp/>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-4 card mt-4 pb-4">
            <h1 className='mb-2 mt-4 text-center fs-2'>ACTUALIZAR DATOS DEL JUGADOR</h1>
            <form onSubmit={update}>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input type="text" onChange={(e) => setNombre(e.target.value)} className="form-control" value={nombre}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Apellidos</label>
                <input type="text" onChange={(e) => setApellido(e.target.value)} className="form-control" value={apellido}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Monto de Dinero</label>
                <input type="number" onChange={(e) => setDinero(e.target.value)} className="form-control" value={dinero}/>
              </div>

              <button type='submit' className='btn btn-primary'>Actualizar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
