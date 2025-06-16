import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteProduct, getallproducts } from "../../Redux/Slices/ProductSlice";
import FarmerStyle from "./FarmerStyle.module.css";
import { IProduct } from "../../interfaces/iProduct";
import { useAppSelector } from "../../Redux/hooks";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import EditProductModal from "./EditProductModal";

export default function FarmerProduct(id: any) {
  const api = `${process.env.REACT_APP_UPLOAD_URL}/`;
  const dispatch = useDispatch()<any | object | AsyncThunkConfig>;
  const { farmerprds } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(getallproducts());
  }, []);

  return (
    <div className={FarmerStyle.prdCard}>
      {farmerprds &&
        farmerprds?.map((item: IProduct, index: number) => (
          <div className={FarmerStyle.nft}>
            <div className={FarmerStyle.main}>
              <img
                className={FarmerStyle.tokenImage}
                src={`${item?.imageUrl}`}
                alt="NFT"
              />
              <h2 style={{ color: "rgb(95, 91, 91)", marginTop: "15px" }}>
                {item?.name}
              </h2>
              <div className={FarmerStyle.tokenInfo}>
                <div className={FarmerStyle.price}>
                  <p> السعر : {item?.price} جنيها</p>
                </div>
                <div className={FarmerStyle.duration}>
                  <p>الكميه : {item?.quantity}</p>
                </div>
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <button
                  className={FarmerStyle.prdbtn}
                  onClick={() => {
                    dispatch(deleteProduct(item?._id));
                  }}
                >
                  <span style={{ fontSize: "20px", color: "rgb(95, 91, 91)" }}>
                    حذف
                  </span>
                </button>
                <EditProductModal data={item} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
