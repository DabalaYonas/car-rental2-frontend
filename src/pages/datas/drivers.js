
import axios from "axios";

export async function getDrivers() {
    return axios.get('http://localhost:8000/book/driver/api/').then(response => response.data);
}