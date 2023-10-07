import imgCar2 from "./images/red-car.png"
import BoxIcon from "./component/BoxIcon"
import Button from "./component/Button"
import Card from "./component/Card"
import { useEffect, useState } from "react"
import BookStatus from "./BookStatus"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { CarViewFullSize } from "./component/CarViewFullSize";
import { Navbar } from "./component/Navigation"
import FooterView from "./component/FooterView"
import UploadView from "./component/UploadView/UploadView"
import { getBrand } from "./component/datas/lookups"

const PEND = "PENDING"
const TELEBIRR = "TELEBIRR"
const BE = "CBE"
const CHAPA = "CHAPA"
const NOT_PAID = "NOT PAID"

async function addDriver(driverForm) {
    return axios.post("http://127.0.0.1:8000/booking/driver/api/", driverForm).then(response=>response.data);
}

async function addCustomer(customerForm) {
    return axios.post("http://127.0.0.1:8000/booking/customer/api/", customerForm, {headers: {'content-type': 'multipart/form-data'}}).then(response=>response.data);
}

async function addBooking(bookingForm) {
    return axios.post("http://127.0.0.1:8000/booking/api/", bookingForm).then(response=>response.data);
}

async function addPayment(paymentForm) {
    return axios.post("http://127.0.0.1:8000/booking/payment/api/", paymentForm).then(response=>response.data);
}

function Checkout() {
    const navigate = useNavigate();
    const state = useLocation().state;
    const { bookedCar, returndate, pickupdate, day_period } = state;

    const [inputs, setInputs] = useState({});
    const [method, setMethod] = useState(TELEBIRR);
    var totalPrice = bookedCar.price_per_day * day_period;
    const [brand, setBrand] = useState();
    const [driverID, setDriverID] = useState();
    const [driverDetail, setDriverDetail] = useState({});
    const [imageInput, setImageInput] = useState();

    getBrand(bookedCar.brand).then(data => {
        setBrand(data.brand)
    });

    var carDetails = [{"Car name": bookedCar.name, 
                "Car brand": brand,
                "Plate number": bookedCar.plate_number,
                "Pick up date": pickupdate,
                "Return date": returndate,
                "Rental peroid": day_period + " days",
                "price per day": bookedCar.price_per_day + " ETB",
            },
            {"Total": totalPrice + " ETB"}]
    
  useEffect(() => {
    let mounted = true;
    // Load a driver details if car have a driver
    if (mounted && bookedCar.with_driver) { 
        axios.get('http://localhost:8000/booking/driver/api/' + bookedCar.driver + "/").then(response => response.data).then(r => {
            setDriverID(r.id);
            setDriverDetail({
            "Full name": r.first_name + " " + r.last_name, 
            "Age": r.age,
            "Phone number": r.phone_number,
            "Email": r.email,
        })});
    }
    
    return () => mounted = false;
    }, []);

    function handlerChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        if(name === "image") {
            setImageInput(e.target.files[0]);
        } else {
            setInputs(values => ({...values, [name]: value}));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        let bookingForm = new FormData();
        bookingForm.append("pick_up_date", pickupdate);
        bookingForm.append("return_date", returndate);
        bookingForm.append("booked_car", bookedCar.id);
        bookingForm.append("status", PEND);

        let customerForm = new FormData();
        customerForm.append("first_name", inputs.firstname);
        customerForm.append("last_name", inputs.lastname);
        customerForm.append("email", inputs.email);
        customerForm.append("phone_number", inputs.phonenumber);
        customerForm.append("age", inputs.age);
        customerForm.append("gender", inputs.gender);
        // customerForm.append("driver_license", imageInput, imageInput.name);

        let paymentForm = new FormData();
        paymentForm.append("amount", totalPrice);
        paymentForm.append("method", method);
        paymentForm.append("tnx_id", "");
        paymentForm.append("status", NOT_PAID);
        paymentForm.append("description", "");

        // Add customer details to database
        addCustomer(customerForm).then(customerResponse => {
            bookingForm.append("customer", customerResponse.id);
            
            // Add booking details to database
            addBooking(bookingForm).then(bookingResponse=>{
                paymentForm.append("booking", bookingResponse.id);

                // Add payment details to database
                addPayment(paymentForm).then(r4=>{
                    if (bookedCar.with_driver) {
                        navigate("/payment", {state: {driverDetails: driverDetail, carDetails: carDetails, payment: r4, bookedCar: bookedCar}});
                    } else {
                        navigate("/payment", {state: {driverDetails: inputs, carDetails: carDetails, payment: r4, bookedCar: bookedCar}});
                    }
                    // navigate("/payment", {state: {driverDetails: driverDetail, carDetails: carDetails, payment: r4, bookedCar: bookedCar}});
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
                    trans={bookedCar.transmission_type}
                    withdriver={bookedCar.with_driver}></CarViewFullSize>

            <div className="my-card gap-small" style={{width: 700}}>
                <form className="my-card-body" onSubmit={handleSubmit}>
                    
                    <h3>{bookedCar.with_driver ? "Enter your Details" : "Driver Details"}</h3>
                    <p className="small-text">{bookedCar.with_driver ? "Your personal informations" : "As they appear on driving licence"}</p>
                    <div className="input-container">
                        <label>First name</label>
                        <input type="text" placeholder="Dabala" className="input input-large" name="firstname" onChange={handlerChange}  value={inputs.firstname} required />
                    </div>
                    <div className="input-container">
                        <label>Last name</label>
                        <input type="text" placeholder="Yonas" className="input  input-large" name="lastname" onChange={handlerChange} value={inputs.lastname} required/>
                    </div>
                    <div className="input-container">
                        <label>Phone number</label>
                        <input type="number" placeholder="0987654321" className="input  input-large" name="phonenumber" onChange={handlerChange} value={inputs.phonenumber} required/>
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
                    {!bookedCar.with_driver &&
                        <div className="input-container">
                        <label>Driver licence</label>
                            <UploadView setImageInput={setImageInput}></UploadView>
                        </div>
                    }
                    <div className="input-container">
                        <label>Payment method</label>
                        <select className="input  input-large" onChange={handlerChange} name="method" value={inputs.method} required>
                            <option value="TELEBIRR">Telebirr</option>
                            <option value="CBE">CBE</option>
                            <option value="CHAPA">Chapa</option>
                        </select>
                    </div>
                    <Button value="Book Now"></Button>
                </form>
            </div>
            </div>
            <div>
                {bookedCar.with_driver && <Card title="Driver Details" cardDetails={driverDetail}/>}
                <div className="gap-meduim">
                    <Card title="Summary" cardDetails={carDetails[0]} cardFooter={carDetails[1]}></Card>
                </div>
            </div>
        </div>
        <FooterView></FooterView>
    </>
}

export default Checkout
