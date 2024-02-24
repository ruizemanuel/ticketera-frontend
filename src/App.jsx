
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeContainer from './components/home/HomeContainer';
import Navigation from './components/layouts/Navigation';
import TicketCreate from './components/views/TicketCreate/TicketCreate';
import TicketEdit from './components/views/TicketEdit/TicketEdit';
import Error404 from './components/views/Error404/Error404';

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
        <Route
          exact
          path="/ticket/edit/:id"
          element={<TicketEdit/>}
        />
        <Route exact path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
