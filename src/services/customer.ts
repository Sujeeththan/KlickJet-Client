import axios from "axios"

const API_URL = "https://klick-jet-api.vercel.app/api/customers"

export const getCustomers = async () => {
    console.log(API_URL);
    const res = await axios .get(API_URL)
    return res.data.customers
    
}