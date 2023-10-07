import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import  FooterView from "./component/FooterView";
import { SearchView } from "./component/SearchView";
import { getCars } from "./component/datas/cars";
import CarServiceItem from "./component/CarServiceItem";
import Pagination from "./component/Pagination/Pagination";
import { SearchCarView } from "./component/SearchCarView";

function CarList() {
  const navigate = useNavigate();
  const state = useLocation().state;
  
  const [returndate, setReturndate] = useState([]);
  const [pickupdate, setpickupdate] = useState([]);
  const [day_period, setday_period] = useState([]);
  const [category, setcategory] = useState([]);

  const [carsList, setCarsList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [pages, setPages] = useState([[]]);
  const [currentPage, setCurrentPage] = useState(0);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    let mounted = true;
    getCars().then(data => {
      if(mounted) {
        setSearchList(data);
        var j = 0;
        let carsPageList = [];
        var a = [];

        for (let i = 0; i < data.length; i++) {
          if (data[i].is_available) {
            a.push(data[i]);
            if ((a.length) % 9 === 0) {
              carsPageList[j] = a;
              j = j + 1;
              a = [];
            }
            if (i === (data.length - 1) && a.length > 0) {
              carsPageList[j] = a;
            }     
        }
        }
        setPages(carsPageList);
        setCarsList(carsPageList);
      }
    });

    // filterSearch(inputs);
    return () => mounted = false;
  }, [inputs]);

  function filterSearch() {

      // var result = [];
      // let searchs =[[], [], []];
      // var filted = searchList;
      // inputs.forEach(input => {
        // switch (input.value) {
        //   case "with_driver":
        //     if (name == "with_driver") {
        //       value ? filtered.push(current.filter(item => item.with_driver === true)) : filtered = current;
        //     } else if (name == "with_out_driver") {
        //       value ? filtered.push(current.filter(item => item.with_driver === false)) : filtered = current;
        //     }
        //     break;
        
        //   default:
        //     break;
        // }
      // })
      let filtered = pages[currentPage];
      Object.entries(inputs).map(([key, value]) => {
        console.log(key + " " + value);
        switch (key) {
          case "with_driver":
            filtered = filtered.filter(item => item.with_driver == value);
            break;

          case "hybrid":
            filtered = filtered.filter(item => item.engine_type == 2);
            break;
        }

      });
  }

  function handlerChange(e, category) {
    var name = e.target.name;
    var value = e.target.checked;
    setInputs(values => ({...values, [name]: value}));
    filterSearch();
  }

  function handleSearch(e, make, model, year) {
    e.preventDefault();
    if (make == "all") {
      setPages(carsList); 
    } else {
      setPages([carsList[currentPage].filter(car => car.brand == make && car.model == model && car.model_year == year)]);
      
      if (model == "all") {
        setPages([carsList[currentPage].filter(car => car.brand == make)]);  
      } else if (year == "all") {
        setPages([carsList[currentPage].filter(car => car.brand == make && car.model == model)]);  
      }
    }
  }

    return  <div>
        <div className="main">
        <SearchCarView handleSearch={handleSearch}></SearchCarView>
      {/* <div className="search-filter-card my-card pd-v-2 mr-t-4" style={{width: "340px", float: "left", marginLeft: "20px"}}>
        <h2>Filter</h2>
        <hr />
        <ul>
          <h3 className="pd-v-1">Driver</h3>
          <li><label className="small-text"><input type="checkbox" className="checkbox" name="with_driver" onChange={(e) => handlerChange(e, "with_driver")} value="true"/> With driver</label></li>
          <li><label className="small-text"><input type="checkbox" className="checkbox" name="without_driver" onChange={(e) => handlerChange(e, "with_driver")} value="false" /> Without driver</label></li>
        </ul>
        <hr />
        <ul>
          <h3 className="pd-v-1">Engine</h3>
          <li><label className="small-text"><input type="checkbox" className="checkbox" name="hybrid" onChange={(e) => handlerChange(e, "engine_type")} value={inputs.petrol}/> Hybrid</label></li>
          <li><label className="small-text"><input type="checkbox" className="checkbox" name="petrol" onChange={(e) => handlerChange(e, "engine_type")} value={inputs.withdriver}/> Petrol</label></li>
          <li><label className="small-text"><input type="checkbox" className="checkbox" name="diesel" onChange={(e) => handlerChange(e, "engine_type")} value={inputs.diesel}/> Diesel</label></li>
          <li><label className="small-text"><input type="checkbox" className="checkbox" name="electric" onChange={(e) => handlerChange(e, "engine_type")} value={inputs.electric}/> Electric</label></li>
        </ul>
        <hr />
        <ul>
          <h3 className="pd-v-1">Transmission</h3>
          <li><label className="small-text"><input type="checkbox" className="checkbox" name="automatic" onChange={(e) => handlerChange(e, "transmission_type")} value={inputs.automatic}/> Automatic</label></li>
          <li><label className="small-text"><input type="checkbox" className="checkbox" name="manual" onChange={(e) => handlerChange(e, "transmission_type")} value={inputs.manual}/> Manual</label></li>
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
      </div> */}
    <div className="center-align">
      <div className="car-list">
        <div className="my-row center-align">
            {pages.length !== 0 && pages[currentPage].filter(item => (item.is_available == true)).map(car => (
                <div key={car.id} className="pd-v-1">
                    <CarServiceItem 
                      key={car.id} 
                      image={car.images} 
                      name={car.name} 
                      price={car.price_per_day} 
                      rate="4"
                      seat={car.seat_number}
                      engine={car.engine_type}
                      trans={car.transmission_type}
                      withdriver={car.with_driver}
                      carID={car.id}></CarServiceItem>
                </div>)
              )}
        </div>
        <Pagination total={pages.length} currentPage={currentPage} changeCurrentPage={setCurrentPage}></Pagination>
      </div>
    </div>
  </div>
  <FooterView></FooterView>
  </div>
}

export default CarList;