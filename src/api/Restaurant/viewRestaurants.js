import request from "../../ultil/request";

export const view = async () => {
    try {
        const res = await request.get('/restaurants', {
        });
        return res.data;
    } catch (error) {
        console.log('View Restaurants Error', error);
    }
}