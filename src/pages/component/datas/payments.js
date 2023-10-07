import axios from "axios";

export async function getPayments() {
    return axios.get('http://localhost:8000/booking/payment/api/').then(response => response.data);
}
