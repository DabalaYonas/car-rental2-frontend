import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button"
import calcDiff from "./utils/utils"

export function SearchView(props) {
    const [inputs, setInputs] = useState({pickupdate:props.input2, returndate:props.input3});
    const [type, setType] = useState(props.input1);
    const navigate = useNavigate();
  
    function handlerChange(e) {
      if(e.target.name === "type") {
        setType(e.target.value);
    } else {var name = e.target.name;
        var value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
  }
  
    function handleSubmit(e) {
        e.preventDefault();
        const days = calcDiff(inputs.pickupdate, inputs.returndate);
        navigate("/booking", {state: {day_period: days, pickupdate: inputs.pickupdate, returndate: inputs.returndate, category: type}});
      }
  
      return <div className="small-container">
      <div className="container" id="search">
  
        <div className="gap-meduim">
          <h2>{props.header}</h2>
          <p className="small-text">{props.subtitle}</p>
        </div>
          <form className="center-vertical-2" onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="large-label"><i className="bi bi-calendar"></i>Select car type</label>
              <select className="input" onChange={handlerChange} name="type" value={type} required>
                  <option value="">Select car type</option>
                  <option value="all">All</option>
                  <option value="SMALL">Small</option>
                  <option value="MIDSIZE">Midsize</option>
                  <option value="SUV">SUV</option>
                  <option value="PREMUIM">Premuim</option>
                  <option value="VAN">Van</option>
              </select>
            </div>

            <div className="input-container">
              <label className="large-label"><i className="bi bi-calendar"></i>Pick up date</label>
              <input type="date" placeholder="01/01/2023" className="input" name="pickupdate" onChange={handlerChange} value={inputs.pickupdate} min={new Date().toLocaleDateString('fr-ca')} required/>
            </div>
  
            <div className="input-container">
              <label className="large-label"><i className="bi bi-calendar"></i>Return date</label>
              <input type="date" placeholder="01/01/2023" className="input" name="returndate" onChange={handlerChange} value={inputs.returndate} min={inputs.pickupdate == null ?  (new Date().toLocaleDateString('fr-ca')) : inputs.pickupdate } required/>
            </div>
  
          <Button value="Search Car" iconClass="bi bi-car-front-fill"></Button>
        </form>
      </div>
      </div>
  }