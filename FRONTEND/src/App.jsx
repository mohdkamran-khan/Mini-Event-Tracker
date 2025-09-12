import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Error from "./Pages/Error.jsx";
import { MainContextProvider } from "./context/MainContext.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from "./layout/ProtectedLayout.jsx";
import AddEvent from "./Pages/AddEvent.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <MainContextProvider>
          <ToastContainer />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route Component={ProtectedLayout}>
                  <Route path="/" Component={Dashboard} />
                  <Route path="/add-event" Component={AddEvent} />
                </Route>
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="*" Component={Error} />
              </Routes>
            </main>
            <Footer />
          </div>
        </MainContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
