import './App.css'
// Importación de componentes
import { CreateApp } from './Components/CrudLogic/Create';
import { EditApp } from './Components/CrudLogic/Edit';
import Show from './Components/CrudLogic/ShowApp';
// Importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return ( 
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/create" element={<CreateApp />} />
          <Route path="/edit/:id" element={<EditApp/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
