
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeContainer from './components/home/HomeContainer';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<HomeContainer/>}
          />
        </Routes>
    </BrowserRouter>
  )
}

export default App
