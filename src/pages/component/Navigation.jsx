import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar(props) {
  var navigate = useNavigate();
  var [ username, setUsername] = useState();

  useEffect(e => {
    setUsername();
  }, [username]);

  function handleClick(e) {
    var btn = e.target.name;
    if(btn == "login") {
      navigate("/login");
    } else if(btn == "register") {
      navigate("/register");
    }
  }
    return <nav className={"navbar pd-v-2 pd-h-6 " + props.bg}>
    <a className="nav-logo" href="#">Car Rental</a>
    <ul className="nav-item-list">
      <li className="nav-item">
        <Link to="/" className="nav-link" aria-current="page" href="#">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/about" className="nav-link" href="#">About</Link>
      </li>
      <li className="nav-item">
        <Link to="/services" className="nav-link" href="#">Services</Link>
      </li>
      <li className="nav-item">
        <Link to="/car-list" className="nav-link" href="#">Car List</Link>
      </li>
      <li className="nav-item">
        <Link to="/contact" className="nav-link" href="#">Contact</Link>
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