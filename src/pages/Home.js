import image from "./images/rent-toyota-corolla.png";
import imgCar2 from "./images/red-car.png";
import Button from "./component/Button";
import FooterView from "./component/FooterView";
import CarServiceItem from "./component/CarServiceItem";
import DiscriptionBox from "./component/DiscriptionView";
import { useEffect, useState } from "react";
import { getCars } from "./component/datas/cars";
import { Navbar } from "./component/Navigation";
import { SearchView } from "./component/SearchView";


function HeroSection() {

  return <div className="hero-section">
    {/* <Navbar bg="nav-bg"></Navbar> */}
    <div className="hero-content">
      <div className="my-row">
        <div className="my-col">
          <div className="hero-pd-t pd-h-4">
            <h3 className="hero-sub-title">Book your future car now</h3>
            <h1 className="hero-title">Easy And <span>Fast Way To Rent</span> Your Car</h1>
            <p className="small-text gap word-spacing">Unlock the freedom of the open road with our premier car rental service. Experience seamless journeys, unparalleled convenience, and exceptional value. Book your dream ride today. </p>
            <Button onClick={() => {window.location.href='#bottomBtn'}} value="Book Now" iconClass="bi bi-car-front-fill"></Button>
            <p id="bottomBtn" className="invisible">hidden</p>
          </div>
        </div>
        <div className="my-col">
          <img src={image} className="hero-img"/>
        </div>
      </div>
    </div>
  </div>
}


function Home() {
    var [carsList, setCarsList] = useState([]);

    useEffect(() => {
      let mounted = true;
      getCars().then(data => {
        if(mounted) {
          setCarsList(data);
        }
      });
      return () => mounted = false;
    }, []);
    
  return <div className="smooth-scroll">
        <HeroSection></HeroSection>
        <div className="mr-b-5">
          <SearchView header="Make your trip" subtitle="Rent a your comfartable car from our 90+ cars choice." />
        </div>
        <div className="content">
          <h3 className="sub-title text-center">Plan your trip</h3>
          <h2 className="title text-center">How It Works</h2>

          <div className="my-row">
            <div className="my-row container-center">
            <div className="my-col">
              <DiscriptionBox title="Select Your Car" iconClass="bi bi-car-front-fill">
              Choose your rental dates for both the pick-up and return of the vehicle, then select a car and enter your driver information then confirm your payment.</DiscriptionBox>
              </div>
            <div className="my-col">
              <p className="gap-txt">----------------</p>
            </div>
            <div className="my-col">
            <DiscriptionBox title="Contact Operator" iconClass="bi bi-headset">
                Our best operators contact you after you confirm your payment by calling on your entered phone number.</DiscriptionBox>
                </div>
            <div className="my-col">
              <p className="gap-txt">----------------</p>
            </div>
            <div className="my-col">
              <DiscriptionBox title="Let's Drive" iconClass="bi bi-car-front-fill">
                Drive your car for selected period of dates. Experience seamless journeys, unparalleled convenience, and exceptional value.</DiscriptionBox>
              </div>
              </div>
          </div>
        </div>

        <div className="content content-secondary">
          <h3 className="sub-title text-center">Pick your choice</h3>
          <h2 className="title text-center">Our Best Cars</h2>

          <div className="my-row center-align">
            {carsList.filter(item => item.is_available == true).map((car,id) => id < 3 && 
            <CarServiceItem 
                key={id} 
                image={car.images} 
                name={car.name} 
                price={car.price_per_day} 
                rate="4"
                seat={car.seat_number}
                engine={car.engine_type}
                trans={car.transmission_type}
                withdriver={car.with_driver}
                carID={car.id}></CarServiceItem>)}
          </div>
          {/* <div className="container-fluid arrow-container">
            <i className="bi bi-arrow-left-circle-fill"></i>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </div> */}
        </div>

        <div className="content my-row">
          <div className="col-6" style={{marginLeft: "-300px"}}>
            <img src={imgCar2} className="section-img"/>
          </div>

          <div className="col-6 half-col">
            <h3 className="sub-title">Why choose us</h3>
            <h1 className="content-title">Feel The <span>Best Experience</span> With Our <span>Rental Deals</span></h1>
            <div className="row mr-t-2">
              <div className="box box-large box-circle item-center">
                <i className="bi bi-car-front-fill"></i>
              </div>
              <div className="disc">
                <h3>Customer Satisfaction</h3>
                <p className="small-text">We offer a diverse range of vehicles to suit every preference and requirement.</p>
              </div>
            </div>
            <div className="row mr-t-2">
              <div className="box box-large box-circle item-center">
                <i className="bi bi-car-front-fill"></i>
              </div>
              <div className="disc">
                <h3>Competitive Pricing and Transparent Rates</h3>
                <p className="small-text">We understand the importance of affordability and transparency when it comes to car rentals.</p>
              </div>
            </div>
            <div className="row mr-t-2">
              <div className="box box-large box-circle item-center">
                <i className="bi bi-car-front-fill"></i>
              </div>
              <div className="disc">
                <h3>User-Friendly Booking Process</h3>
                <p className="small-text">We prioritize convenience and ease of use, which is reflected in our user-friendly booking process.</p>
              </div>
            </div>
            
          </div>
        </div>
       <FooterView></FooterView>
        </div>
}

export default Home;
