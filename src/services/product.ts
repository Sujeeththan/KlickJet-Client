import axios from "axios"

const API_URL = "https://klick-jet-api.vercel.app/api/products"

export const getProduct = async () => {
    console.log(API_URL);
    const res = await axios .get(API_URL)
    console.log(res);
    
    return res.data.products
    
}