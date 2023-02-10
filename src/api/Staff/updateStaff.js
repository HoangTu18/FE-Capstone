import request from "../../ultil/request";

export const update = async (data) => {
    try {
        const res = await request.put(`/staffs`, {
        });
        return res;
    } catch (error) {
        console.log("Update Staffs Error", error);
    }
};
