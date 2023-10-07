
import axios from "axios";

export async function getCars() {
    return axios.get('http://localhost:8000/cars/api/').then(response => response.data);
}

export async function getCar(id) {
    return axios.get('http://localhost:8000/cars/api/' + id + "/").then(response => response.data);
}