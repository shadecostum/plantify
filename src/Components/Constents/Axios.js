import axios from "axios";
import { baseURL } from "./Conste";

const instance = axios.create({
    baseURL: baseURL
    
  });
  export default instance;