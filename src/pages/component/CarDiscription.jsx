import BoxIcon from "./BoxIcon"

function CarDiscription(props) {
    return <div className="my-card" style={{width: 700}}>
    <div className="my-card-body">
        <div className="my-row">
            <img src={props.image} width="300px"/>
            <div>
                <h2>{props.name}</h2>
                <p className="small-text">{props.model}</p>
                <div className="container-fuild gap-small">
                <BoxIcon title="4 Seats" iconClass="bi bi-car-front-fill"></BoxIcon>
                <BoxIcon title="AC" iconClass="bi bi-car-front-fill"></BoxIcon>
                <BoxIcon title="Auto" iconClass="bi bi-car-front-fill"></BoxIcon>
                <BoxIcon title="Petrol" iconClass="bi bi-car-front-fill"></BoxIcon>
                </div>
            </div>
        </div>
    </div>
</div>
}

export default CarDiscription