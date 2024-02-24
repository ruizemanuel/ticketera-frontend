
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeContainer from './components/home/HomeContainer';
import Navigation from './components/layouts/Navigation';
import TicketCreate from './components/views/TicketCreate/TicketCreate';

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          exact
          path="/"
          element={<HomeContainer />}
        />
        <Route
          exact
          path="/ticket/create"
          element={<TicketCreate />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
