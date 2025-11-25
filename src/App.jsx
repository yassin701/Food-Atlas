import { BrowserRouter , Routes , Route  } from 'react-router';
import Home from './pages/Home';
import Recipes from './pages/Recipes';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route  path='/Recipes' element={<Recipes/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
