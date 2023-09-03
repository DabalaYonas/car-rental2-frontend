import imgCar2 from "./images/red-car.png"
import BoxIcon from "./component/BoxIcon"
import Button from "./component/Button"
import Card from "./component/Card"
import { useState } from "react"
import BookStatus from "./BookStatus"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { CarViewFullSize } from "./component/CarViewFullSize";
import { Navbar } from "./component/Navigation"
import FooterView from "./component/FooterView"

const PEND = "PENDING"
const TELEBIRR = "TELEBIRR"
const BE = "CBE"
const CHAPA = "CHAPA"
const NOT_PAID = "NOT PAID"

async function updateDriver(driverItem) {
    return axios.post("http://127.0.0.1:8000/booking/driver/api/", driverItem).then(response=>response.data);
}

function Checkout(props) {
    const navigate = useNavigate();
    const state = useLocation().state;
    const {bookedCar, returndate, pickupdate, day_period} = state;
    const [inputs, setInputs] = useState({});
    const [method, setMethod] = useState(TELEBIRR);
    var totalPrice = bookedCar.price_per_day * day_period;

    var carDetails = [{"Car name": bookedCar.name, 
                "Car brand": bookedCar.brand,
                "Plate number": bookedCar.plate_number,
                "Pick up date": pickupdate,
                "Return date": returndate,
                "Rental peroid": day_period + " days",
                "price per day": bookedCar.price_per_day + " ETB",
            },
            {"Total": totalPrice + " ETB"}]

    function handlerChange(e) {
        if(e.target.name == "method") {
            setMethod(e.target.value);
        } else {
            var name = e.target.name;
            var value = e.target.value;
            setInputs(values => ({...values, [name]: value}))
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        var driverItem = {
            "id": null,
            "first_name": inputs.firstname,
            "last_name": inputs.lastname,
            "email": inputs.email,
            "phone_number": inputs.phonenumber,
            "age": inputs.age,
            "gender": inputs.gender
        };
        
        updateDriver(driverItem).then(r1=> {
            var bookingItem = {
                "id": null,
                "pick_up_date": pickupdate,
                "return_date": returndate,
                "booked_car": bookedCar.id,
                "booked_driver": r1.id,
                "status": PEND
            };

            axios.post("http://127.0.0.1:8000/booking/api/", bookingItem).then(response=>response.data).then(r2=>{
                var paymentItem = {
                    "id": null,
                    "amount": totalPrice,
                    "method": method,
                    "booking": r2.id,
                    "tnx_id": "",
                    "status": NOT_PAID,
                    "description": ""
                };

                axios.post("http://127.0.0.1:8000/booking/payment/api/", paymentItem).then(r3=>r3.data).then(r4=>{
                    navigate("/payment", {state: {driverDetails: inputs, carDetails: carDetails, payment: r4, bookedCar: bookedCar}});
                });

            });
        });

    }

    return <>

<Navbar bg="nav-bg box-shadow"></Navbar>
    <div className="center-align main">
        <div>
        <CarViewFullSize image={bookedCar.images} name={bookedCar.name} 
                  seat={bookedCar.seat_number}
                  engine={bookedCar.engine_type}
                  trans={bookedCar.transmission_type}></CarViewFullSize>

        <div className="my-card gap-small" style={{width: 700}}>
            <form className="my-card-body" onSubmit={handleSubmit}>
                <h3>Driver Detail</h3>
                <p className="small-text">As they appear on driving licence</p>
                <div className="input-container">
                    <label>First name</label>
                    <input type="text" placeholder="Dabala" className="input input-large" name="firstname" onChange={handlerChange}  value={inputs.firstname} required />
                </div>
                <div className="input-container">
                    <label>Last name</label>
                    <input type="text" placeholder="Yonas" className="input  input-large" name="lastname" onChange={handlerChange} value={inputs.lastname} required/>
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input type="email" placeholder="example@gmail.com" className="input  input-large" name="email" onChange={handlerChange} value={inputs.email} required/>
                </div>
                <div className="input-container">
                    <label>Gender</label>
                    <select className="input  input-large" onChange={handlerChange} name="gender" value={inputs.gender}>
                        <option value="">Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Age</label>
                    <input type="number" placeholder="30" className="input  input-large" name="age" onChange={handlerChange} value={inputs.age} required/>
                </div>
                <div className="input-container">
                    <label>Phone number</label>
                    <input type="number" placeholder="0987654321" className="input  input-large" name="phonenumber" onChange={handlerChange} value={inputs.phonenumber} required/>
                </div>
                <div className="input-container">
                    <label>Payment method</label>
                    <select className="input  input-large" onChange={handlerChange} name="method" value={method}>
                        <option value="TELEBIRR">Telebirr</option>
                        <option value="CBE">CBE</option>
                        <option value="CHAPA">Chapa</option>
                    </select>
                </div>
                <Button value="Book Now"></Button>
            </form>
        </div>
        </div>

        <Card title="Summary" cardDetails={carDetails[0]} cardFooter={carDetails[1]}></Card>
    </div>
    <FooterView></FooterView>
    </>
}

export default Checkout
