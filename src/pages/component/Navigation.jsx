import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./images/logo3.png";

export function Navbar(props) {
  var loction = useLocation();
  var navigate = useNavigate();
  var [ username, setUsername] = useState();

  useEffect(()=>{
    var links = document.getElementsByClassName("nav-link");
    for(let link of links) {
        link.classList.remove("active");
        if (link.pathname === loction.pathname) {
              link.classList.toggle("active");
        }
    }
}, [loction]);

  function handleClick(e) {
    var btn = e.target.name;
    if(btn == "login") {
      navigate("/login");
    } else if(btn == "register") {
      navigate("/register");
    }
  }
    return <nav className={"navbar nav-bg pd-v-2 pd-h-6 " + props.bg}>
      <a className="nav-logo" href="#"><img src={logo} /></a>
      <ul className="nav-item-list">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page" id="home-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/cars" className="nav-link">Car List</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">Contact us</Link>
        </li>
      {/* {username != null ? <div className="container-fluid">
        <img src={imgProfile} className="profile-img" />
        <p>{username}</p>
      </div> : <>
      <button className="btn-round" onClick={handleClick} name="login">Login</button>
      <button className="btn-round btn-color-second" onClick={handleClick} name="register">Sign up</button></>
      } */}
      
    </ul>
  </nav>
}