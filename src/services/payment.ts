import axios from "axios"

const API_URL = "https://klick-jet-api.vercel.app/api/payment"

export const getPayments = async () => {
    console.log(API_URL);
    const res = await axios .get(API_URL)
    console.log(res);
    
    return res.data.payments
    
}