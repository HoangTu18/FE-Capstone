import request from "../../ultil/request";

export const view = async () => {
    try {
        const res = await request.get('/roles', {
        });
        return res.data;
    } catch (error) {
        console.log('Get Role Error', error);
    }
}