import { FaBell } from "react-icons/fa";
import FarmerStyle from "./FarmerStyle.module.css";
import IFarmer from "../../interfaces/iFarmer";
import { FaCartShopping } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { addItem } from "../../Redux/Slices/CartSlice";
import { useDispatch } from "react-redux";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

function Notifications(farmer: any) {
  const api = `${process.env.REACT_APP_UPLOAD_URL}/`;
  const farmerr: IFarmer = farmer?.data;
  const dispatch = useDispatch()<any | object | AsyncThunkConfig>;

  return (
    <>
      <h4>
        الاشـعارات من قـبل المهـندس
        <FaBell
          style={{
            color: " #81ba00",
            marginRight: "10px",
            alignItems: "center",
            fontSize: "28px",
          }}
        />
      </h4>
      <div className={FarmerStyle.cardcontainer}>
        <div className={FarmerStyle.card}>
          {farmerr?.notes?.map((note: any) => {
            return (
              <div className={FarmerStyle.main}>
                <div style={{ textAlign: "center" }}>
                  <img
                    className={FarmerStyle.prdImage}
                    src={`${note?.productId?.imageUrl}`}
                    alt="product_image"
                  />
                </div>
                <h3
                  style={{
                    color: "rgb(95, 91, 91)",
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                >
                  {note?.productId?.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <p> السعر : {note?.productId?.price} جنيها</p>
                  <p>الكميه : {note?.productId?.quantity}</p>
                </div>
                <hr />
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <button style={{ backgroundColor: "#81ba00" }}>
                    <CgNotes
                      style={{ color: "#fff", margin: "6px", fontSize: "28px" }}
                    />
                  </button>
                  <button
                    style={{ backgroundColor: "#fff" }}
                    onClick={() => {
                      dispatch(addItem({ ...note?.productId, amount: 1 }));
                    }}
                  >
                    <FaCartShopping
                      style={{
                        color: "#81ba00",
                        margin: "6px",
                        fontSize: "28px",
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notifications;
