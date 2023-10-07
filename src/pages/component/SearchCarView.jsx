import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button"
import calcDiff from "./utils/utils"
import { getBrands, getCategories, getModels } from "./datas/lookups";
import { getCars } from "./datas/cars";

export function SearchCarView(props) {
    const [inputs, setInputs] = useState({});
    const [makes, setMakes] = useState([]);   
    const [models, setModels] = useState([]);
    const [cars, setCars] = useState([]);
  
    useEffect(() => {
      let mounted = true;

      getCars().then(data => {
        if(mounted) {
            let year = data.model_year;
          setCars(data);
          console.log(data);
        }
      });

      getModels().then(data => {
          setModels([]);
          setModels(data);
      });

      getBrands().then(data => {
          setMakes([]);
          setMakes(data);
      });
      
      return () => mounted = false;
    }, []);

    function handlerChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
  
      return <div className="small-container">
      <div className="container" id="search">
  
        <div className="gap-meduim">
          <h2>{props.header}</h2>
          <p className="small-text">{props.subtitle}</p>
        </div>
          <form className="center-vertical-2" onSubmit={(e) => props.handleSearch(e, inputs.make, inputs.model, inputs.year)}>
            <div className="input-container">
              <label className="large-label"><i className="bi bi-car-front-fill"></i>Select Make</label>
                <select className="input" id="input-car-make" name="make" onChange={handlerChange} value={inputs.make} required>
                    <option value="">Select a Vehicle Maker</option>
                  <option value="all">All</option>
                    {makes.map((e, i) => (<option key={i} value={e.id}>{e.brand}</option>))}
                </select>
            </div>

            <div className="input-container">
                <label className="large-label"><i className="bi bi-car-front-fill"></i>Select Model</label>
                <select className="input" id="input-car-brand" name="model" onChange={handlerChange} value={inputs.model} required>
                <option value="">Select a Vehicle Model</option>
                  <option value="all">All</option>
                {inputs.make && models.filter(model => model.maker == inputs.make).map((e, i) => (<option key={i} value={e.id}>{e.model}</option>))}
                </select>
              </div>
  
            <div className="input-container">
              <label className="large-label"><i className="bi bi-calendar"></i>Select Year</label>
              <select className="input" name="year" onChange={handlerChange} value={inputs.year} required>
                  <option value="">Select a car year</option>
                  <option value="all">All</option>
                  {inputs.make && cars.filter(car => car.brand == inputs.make && car.model == inputs.model).map((e, i) => (<option key={i} value={e.model_year}>{e.model_year}</option>))}
              </select>  
            </div>
  
          <Button value="Search Car" iconClass="bi bi-car-front-fill"></Button>
        </form>
      </div>
      </div>
  }