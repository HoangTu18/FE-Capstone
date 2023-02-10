import request from "../../ultil/request";

export const add = async (data) => {
    try {
        const res = await request.post(`/staffs`, {
        });
        return res;
    } catch (error) {
        console.log("Add Staffs Error", error);
    }
};
