
import axios from "axios";

export async function getBrands() {
    return axios.get('http://localhost:8000/cars/lookup/api/brands').then(response => response.data);
}

export async function getBrand(id) {
    return axios.get('http://localhost:8000/cars/lookup/api/brands/' + id).then(response => response.data);
}

export async function getCategories() {
    return axios.get('http://localhost:8000/cars/lookup/api/categories').then(response => response.data);
}

export async function getEngines() {
    return axios.get('http://localhost:8000/cars/lookup/api/engines').then(response => response.data);
}

export async function getEngine(id) {
    return axios.get('http://localhost:8000/cars/lookup/api/engines/' + id).then(response => response.data);
}

export async function getTransmissions() {
    return axios.get('http://localhost:8000/cars/lookup/api/transmissions').then(response => response.data);
}

export async function getTransmission(id) {
    return axios.get('http://localhost:8000/cars/lookup/api/transmissions/' + id).then(response => response.data);
}

export async function getModels() {
    return axios.get('http://localhost:8000/cars/lookup/api/models').then(response => response.data);
}
