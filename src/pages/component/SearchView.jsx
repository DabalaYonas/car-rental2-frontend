import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button"
import calcDiff from "./utils/utils"
import { getCategories } from "./datas/lookups";

export function SearchView(props) {
    const [inputs, setInputs] = useState({pickupdate:props.input2, returndate:props.input3});
    const [category, setCategory] = useState(props.input1);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    
    useEffect(() => {
      let mounted = true;
      getCategories().then(data => {
        if(mounted) {
          setCategories(data);
        }
      });
      return () => mounted = false;
    }, []);
  
    function handlerChange(e) {
      if(e.target.name === "category") {
        setCategory(e.target.value);
      } else {var name = e.target.name;
          var value = e.target.value;
          setInputs(values => ({...values, [name]: value}))
      }
    }
  
    function handleSubmit(e) {
        e.preventDefault();
        const days = calcDiff(inputs.pickupdate, inputs.returndate);
        navigate("/booking", {state: {day_period: days, pickupdate: inputs.pickupdate, returndate: inputs.returndate, category: category}});
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
              <select className="input" onChange={handlerChange} name="category" value={category} required>
                  <option value="">Select a car type</option>
                  <option value="all">All</option>
                  {categories.map((e, i) => (<option key={i} value={e.id}>{e.category}</option>))}
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