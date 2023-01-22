import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebaseconfig'
import { NavbarApp } from '../Navbar/Navbar'


export const CreateApp = () => {

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dinero, setDinero] = useState(10000)
  const navigate = useNavigate()

  const usuariosCollection = collection(db, 'usuarios')
  const store = async (e) => {
    e.preventDefault()
    await addDoc(usuariosCollection, {nombre: nombre, apellido: apellido, c_dinero: dinero})
    navigate('/')
  }

  return (
    <>
      <NavbarApp/>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-4 card mt-4 pb-4">
            <h1 className='mb-2 mt-4 text-center'>AGREGAR JUGADOR</h1>
            <form onSubmit={store}>
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
                <input type="number" onChange={(e) => setDinero(e.target.value)} className="form-control" value={dinero} disabled/>
              </div>

              <button type='submit' className='btn btn-primary'>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
