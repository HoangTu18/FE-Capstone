import request from "../../ultil/request";

export const view = async () => {
    try {
        const res = await request.get('/customers', {
        });
        return res.data;
    } catch (error) {
        console.log('View Customers Error', error);
    }
}