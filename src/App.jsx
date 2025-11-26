import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './Components/Navbar'

function App() {


  return (
    
     <Router>
      <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
      </>
     </Router>
    
  )
}

export default App
