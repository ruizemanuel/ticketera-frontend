
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeContainer from './components/home/HomeContainer';
import Navigation from './components/layouts/Navigation';
import TicketCreate from './components/views/TicketCreate/TicketCreate';
import TicketEdit from './components/views/TicketEdit/TicketEdit';
import Error404 from './components/views/Error404/Error404';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { status: statusApp, message } = useSelector((state) => state.app);

  useEffect(() => {
    if (statusApp !== null && message !== null) {
      toast[statusApp](`${message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

  }, [statusApp]);

  return (
    <BrowserRouter>
      <ToastContainer />
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
          element={<TicketEdit />}
        />
        <Route exact path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
