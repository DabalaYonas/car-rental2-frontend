import { useState } from "react";
import Button from "../component/Button";
import image from "./images/rent-toyota-corolla.png"
import imgCar from "./images/rav4.png"
import imgCar2 from "./images/red-car.png"
import { Link } from "react-router-dom";

function Register() {

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
                    <h3 className="header">Register</h3>
                    <p className="small-text">Create your account.</p>
                </div>
                <div className="input-container">
                    <label>First name</label>
                    <input type="text" placeholder="Dabala" className="input  input-large" name="firstname" onChange={handlerChange} value={inputs.firstname}/>
                </div>
                <div className="gap-small">
                    
                </div>
                <div className="input-container">
                    <label>Last Name</label>
                    <input type="text" placeholder="Yonas" className="input  input-large" name="lastname" onChange={handlerChange} value={inputs.lastname}/>
                </div>
                <div className="gap-small">
                    
                </div>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" placeholder="dabala" className="input  input-large" name="username" onChange={handlerChange} value={inputs.username}/>
                </div>
                <div className="gap-small">
                    
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input type="email" placeholder="example@gmail.com" className="input  input-large" name="email" onChange={handlerChange} value={inputs.email}/>
                </div>
                <div className="gap-small">
                    
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" placeholder="Password" className="input  input-large" name="password" onChange={handlerChange} value={inputs.password}/>
                </div>
                <div className="gap-small">
                    <Button value="Register" onClick={handleClick}></Button>
                </div>
                <div className="gap"></div>
                <p className="small-text">I have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    </div>
}

export default Register;