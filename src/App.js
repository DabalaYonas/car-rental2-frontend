import Home from "./pages/Home";
import "bootstrap-icons/font/bootstrap-icons.css"
// import "bootstrap/dist/css/bootstrap.css"
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import "./App.css"
import BookStatus from "./pages/BookStatus";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { Navbar } from "./pages/component/Navigation";

function App() {
  return <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/about" Component={AboutPage} />
      <Route path="/contact" Component={ContactPage} />
      <Route path="/booking" Component={Booking} />
      <Route path="/checkout" Component={Checkout} />
      <Route path="/payment" Component={BookStatus} />
    </Routes>
  </BrowserRouter>
}

export default App;
