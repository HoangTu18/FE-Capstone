import request from "../../ultil/request";

export const remove = async (staffId) => {
  try {
    const res = await request.delete(`/staffs/${staffId}`, {
    });
    return res;
  } catch (error) {
    console.log("Delete Staffs Error", error);
  }
};
