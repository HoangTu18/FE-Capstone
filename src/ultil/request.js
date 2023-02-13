import axios from "axios";
const request = axios.create({
    baseURL:
        "https://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(async (config) => {
    return config;
});


export const get = async (path, option = {}) => {
    const response = await request.get(path, option);
    return response.data;
}

export const remove = async (path, option) => {
    const response = await request.delete(path, option);
    return response.data;
}

export default request;