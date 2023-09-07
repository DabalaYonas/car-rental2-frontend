import RateView from "./RateView"
import BoxIcon from "./BoxIcon"
import Button from "./Button"

function CarServiceItem(props) {
  
    return <div className="car-services-item">
      <img src={props.image} className="car-services-img" />
      <div className="car-services-box">
        <div className="center-vertical">
            <div>
              <h2>{props.name}</h2>
              <RateView rate={props.rate}></RateView>
            </div>
            <div className="text-center">
              <p className="bold-text">{props.total != null && (props.total + " ETB " + "Total")}</p>
              <p className="medium-text">{props.price} ETB/day</p>
            </div>
        </div>
        <div className="space-around gap-small">
          <BoxIcon title="4 Seats" iconClass="bi bi-car-front-fill"></BoxIcon>
          <BoxIcon title="AC" iconClass="bi bi-car-front-fill"></BoxIcon>
          <BoxIcon title="Auto" iconClass="bi bi-car-front-fill"></BoxIcon>
          <BoxIcon title="Petrol" iconClass="bi bi-car-front-fill"></BoxIcon>
        </div>
        <div className="item-center">
        <Button value="Book Now" size="full-width" onClick={props.onSelected} iconClass="bi bi-car-front-fill"></Button>
        </div>
      </div>
    </div>
  } 

  
export default CarServiceItem