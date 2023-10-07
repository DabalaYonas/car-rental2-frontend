import { useState } from "react";
import RateView from "./RateView";
import BoxIcon from "./BoxIcon";
import Button from "./Button";
import { getEngine, getTransmission } from "./datas/lookups";
import BoxIconSmall from "./BoxIconSmall";
import { useNavigate } from "react-router-dom";

function CarServiceItem(props) {
  const [engine, setEngine] = useState();
  const [engineClass, setEngineClass] = useState();
  const [transm, setTransm] = useState();
  const [transmClass, setTransmClass] = useState();
  const navigate = useNavigate();

  getEngine(props.engine).then(data => {
      switch (data.engine) {
          case "PETROL":
              setEngine("Petrol");
              setEngineClass("bi bi-fuel-pump-fill");
              break;
  
          case "ELECTRIC":
              setEngine("Electric");
              setEngineClass("bi bi-ev-station-fill");
              break;
  
          case "HYBRID":
              setEngine("Hybrid");
              setEngineClass("bi bi-fuel-pump-fill");
              break;
  
          case "DIESEL":
              setEngine("Diesel");
              setEngineClass("bi bi-fuel-pump-diesel-fill");
              break;
      }
  });
  
  getTransmission(props.trans).then(data => {
      switch (data.transmission) {
          case "AUTOMATIC":
              setTransm("Auto");
              setTransmClass("bi bi-ev-front-fill");
              break;

          case "MANUAL":
              setTransm("Manu");
              setTransmClass("bi bi-car-front");
              break;
      }
  });

  function handleClick() {
    navigate("/choice-date", {state: {carID: props.carID}});
  }

return <div className="car-services-item">
      <img src={props.image} className="car-services-img" />
      <div className="car-services-box">
        <div className="space-between">
            <div>
              <h2>{props.name}</h2>
              <RateView rate={props.rate}></RateView>
              
            </div>
            <div className="text-center">
              <p className="bold-text">{props.total != null && (props.total + " ETB " + "Total")}</p>
              <p className="medium-text">{props.price} ETB/day</p>
              
              {props.withdriver ? <div className="mr-t-1">
                  <BoxIconSmall title="With driver" iconClass="bi bi-person-fill-check"></BoxIconSmall></div>:
                  <div className="pd-2"></div>
              }
            </div>
        </div>
        <div className="space-around gap-small">
              <BoxIcon title={props.seat + " Seats"} iconClass="bi bi-car-front-fill"></BoxIcon>
              <BoxIcon title="AC" iconClass="bi bi bi-fan"></BoxIcon>
              <BoxIcon title={transm} iconClass={transmClass}></BoxIcon>
              <BoxIcon title={engine} iconClass={engineClass}></BoxIcon>
        </div>
        <div className="item-center">
        <Button value="Book Now" size="full-width" onClick={handleClick} iconClass="bi bi-car-front-fill"></Button>
        </div>
      </div>
    </div>
  } 

  
export default CarServiceItem;