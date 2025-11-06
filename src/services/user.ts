import axios from "axios"

const API_URL = "https://klick-jet-api.vercel.app/api/users"

export const getUsers = async () => {
    const res = await axios.get(API_URL)
    return res.data.users
}