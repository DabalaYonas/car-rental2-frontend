import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./component/Card";
import { CarViewFullSize } from "./component/CarViewFullSize";
import { Navbar } from "./component/Navigation";
import { SucceessfulCard } from "./component/SuccessfulCard";
import TelebirrForm from "./component/TelebirrForm";
import { getPayments } from "./component/datas/payments";
import axios from "axios";
import Button from "./component/Button";
import FooterView from "./component/FooterView";
 
const PENDING = 'PENDING';
const PAID = 'PAID';
const NOT_PAID = 'NOT PAID';

 function BookStatus() {
    const state = useLocation().state;
    const { driverDetails, carDetails, payment, bookedCar } = state;
    
    var [ status, setStatus ] = useState(payment.status);
    var [ statusColor, setStatusColor ] = useState("red");
    var [ tnxId, setTnxId ] = useState(payment.tnxId);
    const [phonenumber, setPhonenumber] = useState("");

    function handlerChange(e) {
        setPhonenumber(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(phonenumber >= 9) {
            var paymentItem = payment;
            paymentItem.tnx_id = phonenumber;
            paymentItem.status = PENDING;
            axios.put("http://127.0.0.1:8000/booking/payment/api/" + paymentItem.id + "/", paymentItem).then(data=>{
                setStatus(PENDING);
                setTnxId(phonenumber);
                changeStatusColor(PENDING);
            });
        }
    }

    function changeStatusColor(s) {
        switch (s) {
            case NOT_PAID:
                setStatusColor("red");
                break;

            case PENDING:
                setStatusColor("green");
                break;

            case PAID:
                setStatusColor("blue");
                break;
        }
    }

    useEffect(() => {
        getPayments().then(result => {
            result.forEach(p => {
                if (p.id == payment.id) {
                    setStatus(p.status);
                    setTnxId(p.tnx_id);
                    changeStatusColor(p.status);
                }
            });
        });

    }, []);
    
    let driverDetail;
    if (bookedCar.with_driver) {
        driverDetail = driverDetails;
    } else {
        driverDetail = {
            "Full name": driverDetails.firstname + " " + driverDetails.lastname, 
            "Age": driverDetails.age,
            "Phone number": driverDetails.phonenumber,
            "Email": driverDetails.email,
        };
    }

    return <><div className="main">
        <div className="center-align">
            <div>
                <CarViewFullSize 
                  image={bookedCar.images} 
                  name={bookedCar.name} 
                  seat={bookedCar.seat_number}
                  engine={bookedCar.engine_type}
                  trans={bookedCar.transmission_type}
                  withdriver={bookedCar.with_driver}
                  ></CarViewFullSize>
                <div className="gap-meduim">
                    {(status == "NOT PAID") ? 
                    <form onSubmit={handleSubmit}>
                        <h3>Payment method Telebirr</h3>
                        <div className="input-container">
                            <label>Phone number</label>
                            <input type="text" placeholder="0987654321" className="input  input-large" name="telebirr"  onChange={handlerChange}  value={phonenumber} required/>
                        </div>
                        <Button value="Confirm payment"></Button>
                    </form>
                    : (status == "PENDING" ? <SucceessfulCard header="Thank You!">We received your purchase request; <br/> we'll be in touch shortly!</SucceessfulCard>:
                    <SucceessfulCard header="Successful!">Your paid successfully thank you for your order; <br/> You can now drive your car.</SucceessfulCard>)
                    }
                </div>
                
                </div>
            <div>
                <Card title="Book Details" cardDetails={carDetails[0]} cardFooter={carDetails[1]} />
                <div className="gap-meduim">
                    <Card title="Driver Details" cardDetails={driverDetail}/>
                </div>
                <Card title="Payment Details" cardDetails={{"Tnx Id": tnxId}} cardFooter={{"Status": status}} cardFooterColor={statusColor} />
            </div>
        </div>

    </div>

    <FooterView></FooterView>
    </>
 }

 export default BookStatus