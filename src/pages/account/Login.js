import { useState } from "react";
import Button from "../component/Button";
import image from "./images/rent-toyota-corolla.png"
import imgCar from "./images/rav4.png"
import imgCar2 from "./images/red-car.png"
import { Link } from "react-router-dom";

function Login() {

    const [inputs, setInputs] = useState({});

    function handlerChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    function handleClick(e) {
        e.preventDefault();
    }
    return <div>
        <div className="full-container center-vertical">
            <div className="container">
                <div className="gap-meduim">
                    <h3 className="header">Login</h3>
                    <p className="small-text">Login to book your car.</p>
                </div>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" placeholder="dabala" className="input  input-large" name="username" onChange={handlerChange} value={inputs.username}/>
                </div>
                <div className="gap-small">
                    
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" placeholder="Password" className="input  input-large" name="password" onChange={handlerChange} value={inputs.password}/>
                </div>
                <div className="gap-small">
                    <Button value="Login" onClick={handleClick}></Button>
                </div>
                <div className="gap"></div>
                <p className="small-text">I don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
        </div>
    </div>
}

export default Login;