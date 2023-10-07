import { useState } from "react";
import Button from "./component/Button";
import calcDiff from "./component/utils/utils";
import  FooterView from "./component/FooterView";
import { CarViewFullSize } from "./component/CarViewFullSize";
import rav4 from "./images/rav4.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getCar } from "./component/datas/cars";

function ChooseDate() {
    const state = useLocation().state;
    const { carID } = state;
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    function handlerChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        const dayPeriod = calcDiff(inputs.pickupdate, inputs.returndate);
        getCar(carID).then(data => {
            navigate("/checkout", {state: { bookedCar: data, day_period: dayPeriod, pickupdate: inputs.pickupdate, returndate: inputs.returndate}});    
        });
    }

    return <><div className="main">
        <div className="center-align">
    <div className="container" id="search">
      <div className="gap-meduim">
        <h2>Select a Date</h2>
        <p className="small-text">Select a pickup date and return date for your rent car.</p>
      </div>

        <form className="center-vertical-2" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="large-label"><i className="bi bi-calendar"></i>Pick up date</label>
            <input type="date" placeholder="01/01/2023" className="input" name="pickupdate" onChange={handlerChange} value={inputs.pickupdate} min={new Date().toLocaleDateString('fr-ca')} required/>
          </div>

          <div className="input-container">
            <label className="large-label"><i className="bi bi-calendar"></i>Return date</label>
            <input type="date" placeholder="01/01/2023" className="input" name="returndate" onChange={handlerChange} value={inputs.returndate} min={inputs.pickupdate == null ?  (new Date().toLocaleDateString('fr-ca')) : inputs.pickupdate } required/>
          </div>

        <Button value="Book Now" iconClass="bi bi-arrow-right"></Button>
      </form>
    </div>
    </div>
    </div>
    <FooterView></FooterView>
    </>
}

export default ChooseDate;