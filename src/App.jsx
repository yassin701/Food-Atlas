import Details from "./pages/Details"; 

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {


  return (
  <BrowserRouter>
  <Routes>

       <Route path="/recipes/:id" element={<Details />} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
