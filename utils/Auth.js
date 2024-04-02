import { apiUrl } from "@/Env"
import axios from "axios"

export const loginUser = async (body) => {
    try {
        // Body consists of email and password
        const resp = await axios.post(`${apiUrl}api/auth/login`, body)
        return resp
    } catch (err) {
        return err
    }
}

export const signupUser = async (body) => {
    try {
        const resp = await axios.post(`${apiUrl}api/auth/signup`, body)
        return resp
    } catch (err) {
        return err
    }
}