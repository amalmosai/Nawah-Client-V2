import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Product.module.css";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Redux/hooks";
import { addItem } from "../../Redux/Slices/CartSlice";
import { addFavItem } from "../../Redux/Slices/WishSlice";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { IProduct } from "../../interfaces/iProduct";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import DetailModal from "./DetailModal";

function Productcard(item: any) {
  const [data, setaData] = useState<IProduct | any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch()<any | object | AsyncThunkConfig>;
  const api = `${process.env.REACT_APP_UPLOAD_URL}/`;
  const nav = useNavigate();

  const authUser: any = useAppSelector((state) => state.auth);

  useEffect(() => {
    setaData(item.product);
    console.log(item);
    authUser.isAuthenticated ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [authUser]);
  console.log(isLoggedIn);

  return (
    <div className={styles.item}>
      <div className={styles["item__img"]}>
        <img src={`${data?.imageUrl}`} alt="" />
      </div>
      <div className={`${styles.item_dec}`}>
        <div className={styles["item_dec_text"]}>
          <h4> اسـم الـمـنـتـج : {data?.name} </h4>
        </div>
        <div className={styles["item_dec_text"]}>
          <h4>نوع الـمـنـتـج : {data?.category} </h4>
        </div>
        <div className={styles["item_dec_price"]}>
          <p>الـسـعر : {data?.price} </p>
        </div>
        <div className={styles["button-group"]}>
          <button
            className={styles["btn_cart"]}
            type="button"
            title=" أضف إلى عربة التسوق"
            onClick={() =>
              isLoggedIn
                ? dispatch(addItem({ ...data, amount: 1 }))
                : nav("/welcome")
            }
          >
            <FaCartShopping />
          </button>
          <button
            className={styles["btn_cart"]}
            type="button"
            title=" أضف إلى المفضلة"
            onClick={() => {
              dispatch(addFavItem({ ...data, amount: 1 }));
            }}
          >
            <FaHeart />
          </button>

          <DetailModal details={data} />
        </div>
      </div>
    </div>
  );
}

export default Productcard;
