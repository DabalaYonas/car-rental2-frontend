import BoxIcon from "./BoxIcon";
import Button from "./Button";

export function CarView2(props) {
    let engine = props.engine;
    let engineClass = props.engine;
    let transm = props.trans;
    let transmClass = props.trans;

    switch (props.engine) {
        case "PETROL":
            engine = "Petrol"
            engineClass = "bi bi-fuel-pump-fill"
            break;

        case "ELECTRIC":
            engine = "Electric"
            engineClass = "bi bi-ev-station-fill"
            break;

        case "HYBRID":
            engine = "Hybrid"
            engineClass = "bi bi-fuel-pump-fill"
            break;

        case "DIESEL":
            engine = "Diesel"
            engineClass = "bi bi-fuel-pump-diesel-fill"
            break;
    }
    
    switch (props.trans) {
        case "AUTOMATIC":
            transm = "Auto"
            transmClass = "bi bi-ev-front-fill"
            break;

        case "MANUAL":
            transm = "Manu"
            transmClass = "bi bi-car-front"
            break;
    }

    return <div className="my-card" style={props.total ? {width: 900} : {width:700}}>
            <div className="my-card-body">
                <div className="my-row">
                    <img src={props.image} width="250px"/>

                    <div className="pd-h-2">
                        <h2>{props.name}</h2>
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