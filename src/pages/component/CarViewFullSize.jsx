import { useState } from "react";
import BoxIcon from "./BoxIcon";
import BoxIconSmall from "./BoxIconSmall";
import Button from "./Button";
import { getEngine, getTransmission } from "./datas/lookups";

export function CarViewFullSize(props) {
    const [engine, setEngine] = useState();
    const [engineClass, setEngineClass] = useState();
    const [transm, setTransm] = useState();
    const [transmClass, setTransmClass] = useState();

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

    return <div className="my-card" style={props.total ? {width: 900} : {width:700}}>
            <div className="my-card-body">
                <div className="my-row">
                    <img src={props.image} width="250px"/>

                    <div className="pd-h-2">
                        <h2>{props.name}</h2>
                        {props.withdriver && <div className="mr-t-1">
                            <BoxIconSmall title="With driver" iconClass="bi bi-person-fill-check"></BoxIconSmall></div>
                        }
                        <p className="small-text">{props.brand}</p>

                        <div className="container-fuild gap-small">
                            <BoxIcon title={props.seat + " Seats"} iconClass="bi bi-car-front-fill"></BoxIcon>
                            <BoxIcon title="AC" iconClass="bi bi-fan"></BoxIcon>
                            <BoxIcon title={transm} iconClass={transmClass}></BoxIcon>
                            <BoxIcon title={engine} iconClass={engineClass}></BoxIcon>
                        </div>
                        
                    </div>
                    {props.total && <div className="my-col">
                        <div className="text-center">
                            <p className="bold-text">{props.total} ETB Total</p>
                            <p className="medium-text pd-v-1">{props.price} ETB/day</p>
                            <Button value="Book Now" size="mr-t-1" onClick={props.onSelected}></Button>
                        </div>
                    </div> }

                </div>
            </div>
        </div>
}