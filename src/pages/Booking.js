import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CarViewFullSize } from "./component/CarViewFullSize"
import  FooterView from "./component/FooterView"
import { Navbar } from "./component/Navigation"
import { SearchView } from "./component/SearchView"
import { getCars } from "./datas/cars"

function Booking() {
  const state = useLocation().state;
  const { returndate, pickupdate, day_period, category } = state;
  const navigate = useNavigate();
  const [carsList, setCarsList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    let mounted = true;
    getCars().then(data => {
      if(mounted) {
        setCarsList(data);
        setSearchList(data);
      }
    });

    filterSearch(inputs);
    return () => mounted = false;
  }, [inputs]);

  function filterSearch(input) {
    // console.log(input);
      var result = [];
      input.forEach(i => {
        if(i.checked) {
          var a = carsList.filter(item => (item.transmission_type == i.name.toUpperCase() || item.engine_type == i.name.toUpperCase()));
          a.forEach(element => {  
            if(!result.includes(element)) {
              result.push(element);
            }
          });
        }
      })

      console.log(result);
  }

  function handlerChange(e) {
    var name = e.target.name;
    var checked = e.target.checked;
    setInputs(values => ([...values, e.target]));
  }
// 
  function handleClick(car_id) {
    carsList.forEach(car => {
      if(car.id == car_id) {
        navigate("/checkout", {state: { bookedCar: car, day_period: day_period, pickupdate: pickupdate, returndate: returndate}});
      }
    });
  }

    return <div className="content-secondary">
      <Navbar bg="nav-bg box-shadow"></Navbar>
      <div className="main">
      <SearchView input1={category} input2={pickupdate} input3={returndate}></SearchView>
      <div className="center-align">
        <div className="my-card pd-v-2 mr-t-1" style={{width: "360px"}}>
          <h2>Filter</h2>
          <hr />
          <ul>
            <h3 className="pd-v-1">Driver</h3>
            <li><label className="small-text"><input type="checkbox" className="checkbox" name="withdriver" onChange={handlerChange} value={inputs.withdriver}/> With driver</label></li>
            <li><label className="small-text"><input type="checkbox" className="checkbox" name="withoutdriver" onChange={handlerChange} value={inputs.withoutdriver} /> Without driver</label></li>
          </ul>
          <hr />
          <ul>
            <h3 className="pd-v-1">Engine</h3>
            <li><label className="small-text"><input type="checkbox" className="checkbox" name="hybrid" onChange={handlerChange} value={inputs.petrol}/> Hybrid</label></li>
            <li><label className="small-text"><input type="checkbox" className="checkbox" name="petrol" onChange={handlerChange} value={inputs.withdriver}/> Petrol</label></li>
            <li><label className="small-text"><input type="checkbox" className="checkbox" name="diesel" onChange={handlerChange} value={inputs.diesel}/> Diesel</label></li>
            <li><label className="small-text"><input type="checkbox" className="checkbox" name="electric" onChange={handlerChange} value={inputs.electric}/> Electric</label></li>
          </ul>
          <hr />
          <ul>
            <h3 className="pd-v-1">Transmission</h3>
            <li><label className="small-text"><input type="checkbox" className="checkbox" name="automatic" onChange={handlerChange} value={inputs.automatic}/> Automatic</label></li>
            <li><label className="small-text"><input type="checkbox" className="checkbox" name="manual" onChange={handlerChange} value={inputs.manual}/> Manual</label></li>
          </ul>
          <hr />
          <ul>
            <h3 className="pd-v-1">Price per day</h3>
            <li><label className="small-text"><input type="checkbox" className="checkbox" /> ETB 1000 - ETB 1500</label></li>
            <li><label className="small-text"><input type="checkbox" className="checkbox" /> ETB 1500 - ETB 2000</label></li>
            <li><label className="small-text"><input type="checkbox" className="checkbox" /> ETB 2000 - ETB 2500</label></li>
            <li><label className="small-text"><input type="checkbox" className="checkbox" /> ETB 2500 - ETB 3000</label></li>
            <li><label className="small-text"><input type="checkbox" className="checkbox" /> ETB 3000 + </label></li>
          </ul>
        </div>
        <div className="car-list pd-v-2">
        {category != "all" ? searchList.filter(item => (item.is_available == true && item.category == category)).map(car => (
              <div key={car.id}  className="pd-v-1">
                <CarViewFullSize
              image={car.images} 
              name={car.name} 
              price={car.price_per_day} rate="4" 
              total={car.price_per_day * day_period} 
              seat={car.seat_number}
              engine={car.engine_type}
              trans={car.transmission_type}
              onSelected={() => handleClick(car.id)}></CarViewFullSize>
              </div>)
            ) : searchList.filter(item => item.is_available == true).map(car => (
              <div key={car.id}  className="pd-v-1">
                <CarViewFullSize
              image={car.images} 
              name={car.name} 
              price={car.price_per_day} rate="4" 
              total={car.price_per_day * day_period} 
              seat={car.seat_number}
              engine={car.engine_type}
              trans={car.transmission_type}
              onSelected={() => handleClick(car.id)}></CarViewFullSize>
              </div>)
            )}
        </div>
      </div>
    </div>
    <FooterView></FooterView>
    </div>
}

export default Booking