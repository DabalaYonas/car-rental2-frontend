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
import CarList from "./pages/CarList";
import ScrollToTop from "./pages/component/ScrollToTop";
import ChooseDate from "./pages/ChooseDate";

function App() {
  return <BrowserRouter>
  <Navbar />
  <ScrollToTop />
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/about" Component={AboutPage} />
      <Route path="/cars" Component={CarList} />
      <Route path="/contact" Component={ContactPage} />
      <Route path="/booking" Component={Booking} />
      <Route path="/checkout" Component={Checkout} />
      <Route path="/choice-date" Component={ChooseDate} />
      <Route path="/payment" Component={BookStatus} />
    </Routes>
  </BrowserRouter>
}

export default App;
