import "../User/useredit.style.scss";
import { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";
function RestaurantEdit({ data, closeModel }) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(data.restaurantLocation);
  const [coordinates, setCoordinates] = useState({
    lat: data.latitude,
    lng: data.longitude,
  });
  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const ll = await getLatLng(result[0]);
    setCoordinates(ll);
    setAddress(value);
  };
  const handleEditRestaurant = useCallback(
    (values) => {
      let restaurant = {
        restaurantId: values.restaurantId,
        restaurantLocation: address,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        restaurantName: values.restaurantName,
        restaurantNumber: values.restaurantNumber,
        status: values.status,
      };
      dispatch(updateRestaurantRequest(restaurant));
      closeModel(false);
    },
    [dispatch, closeModel, coordinates.lat, coordinates.lng, address]
  );
  const formik = useFormik({
    initialValues: {
      restaurantId: data.restaurantId,
      restaurantLocation: data.restaurantLocation,
      latitude: data.latitude,
      longitude: data.longitude,
      restaurantName: data.restaurantName,
      restaurantNumber: data.restaurantNumber,
      status: data.status,
      staffList: data.staffList,
    },
    onSubmit: (values, { resetForm }) => {
      handleEditRestaurant(values);
      resetForm({ values: "" });
    },
  });
  console.log("DATE", data.staffList);
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <form
          action=""
          className="form-container"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div className="left">
            <img
              className="avatar"
              src={
                "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="right">
            <label>M?? nh?? h??ng:</label>
            <input
              type="text"
              disabled
              id="restaurantId"
              name="restaurantId"
              value={formik.values.restaurantId}
              onChange={formik.handleChange}
            />
            <label>
              T??n nh?? h??ng: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              value={formik.values.restaurantName}
              onChange={formik.handleChange}
            />

            <label>S??? ??i???n tho???i:</label>
            <input
              type="text"
              id="restaurantNumber"
              name="restaurantNumber"
              value={formik.values.restaurantNumber}
              onChange={formik.handleChange}
            />

            <label>
              Ng?????i qu???n l??: <span className="proirity">*</span>
            </label>
            <select
              id="staffList"
              name="staffList"
              value={formik.values.staffList}
              onChange={formik.handleChange}
            >
              {data.staffList &&
                data.staffList.map((item, index) => {
                  return (
                    <option value={item.staffId}>{item.staffFullName}</option>
                  );
                })}
            </select>

            <label>
              ?????a ch???: <span className="proirity">*</span>
            </label>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Nh???p ?????a ch??? ...",
                      className: "location-search-input",
                    })}
                    // name="restaurantLocation"
                    // id="restaurantLocation"
                    // value={formik.values.restaurantLocation}
                    // onChange={formik.handleChange}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? {
                            backgroundColor: "#fafafa",
                            cursor: "pointer",
                            border: "1px solid #c4c4c4",
                          }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <label>Kinh ?????:</label>
            <input
              disabled
              type="text"
              id="longitude"
              name="longitude"
              // onChange={formik.handleChange}
              value={coordinates.lng}
            />
            <label>V?? ?????:</label>
            <input
              disabled
              type="text"
              id="latitude"
              name="latitude"
              // onChange={formik.handleChange}
              value={coordinates.lat}
            />
            <label>Tr???ng th??i: </label>
            <br></br>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              defaultChecked={formik.values.status}
              onChange={formik.handleChange}
            />
            <div style={{ display: "flex", float: "right" }}>
              <button type="submit" className="btn">
                L??u
              </button>
              <button
                type="button"
                className="btn cancel"
                onClick={() => closeModel(false)}
              >
                Hu???
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestaurantEdit;
