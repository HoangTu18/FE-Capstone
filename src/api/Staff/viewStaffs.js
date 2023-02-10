import request from "../../ultil/request";

export const view = async () => {
    try {
        const res = await request.get('/staffs', {
        });
        return res.data;
    } catch (error) {
        console.log('View Staffs Error', error);
    }
}