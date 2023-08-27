import axios from "axios";
import { useState } from "react";
import Button from "./Button"


function TelebirrForm(props) {
    const [phonenumber, setPhonenumber] = useState("");
    const [paid, setPaid] = useState(false);

    function handlerChange(e) {
        setPhonenumber(e.target.value);
    }

    function handleClick(e) {
        e.preventDefault();
        if(phonenumber >= 9) {
            var paymentItem = props.payment;
            paymentItem.tnx_id = phonenumber;
            paymentItem.status = "PENDING";
            axios.put("http://127.0.0.1:8000/booking/payment/api/" + paymentItem.id + "/", paymentItem).then(data=>{
                setPaid(true);
            });
        }
    }

    return <div>
        {!paid && <><h2>Payment method Telebirr</h2>
        <div className="input-container">
            <label>Phone number</label>
            <input type="text" placeholder="0987654321" className="input  input-large" name="telebirr"  onChange={handlerChange}  value={phonenumber} />
        </div>

        <Button value="Confirm payment" iconClass="" onClick={handleClick}></Button></>}
    </div>
}

export default TelebirrForm