import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallproducts } from "../../Redux/Slices/ProductSlice";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import Trend from "./Slider.module.css";
import { IProduct } from "../../interfaces/iProduct";
import { RootState } from "../../Redux/Store";
import { useAppSelector } from "../../Redux/hooks";

function SliderHome() {
  const api = `${process.env.REACT_APP_UPLOAD_URL}/`;
  const [arr, setArr] = useState<Array<IProduct>>([]);
  const dispatch = useDispatch()<any | object | AsyncThunkConfig>;

  useEffect(() => {
    dispatch(getallproducts())
      .then((result: any) => {
        setArr([...result.payload.data]);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const [isImgExpanded, setIsImgExpanded] = useState<boolean>(false);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isMoreOpened, setIsMoreOpened] = useState<boolean>(false);
  const [isPopularOpened, setIsPopularOpened] = useState<boolean>(false);

  const handleMenuBtnClick = () => {
    setIsImgExpanded(!isImgExpanded);
    setIsMenuOpened(!isMenuOpened);
    setIsMoreOpened(!isMoreOpened);
    document.querySelectorAll(".card").forEach((item) => {
      item.classList.toggle("opened");
    });
    setIsPopularOpened(false);
  };

  return (
    <div className={Trend.profile_card}>
      <div className={Trend.wrapper}>
        <div className={Trend.outer}>
          {arr.map((item: IProduct, index: number) => (
            <div
              key={item.name}
              className={`${Trend.card} ${isImgExpanded ? "img-expand" : ""} ${
                isMenuOpened ? "opened" : ""
              }`}
              style={{ "--delay": `-${index}` } as React.CSSProperties}
            >
              <div className={Trend.content}>
                <div className={Trend.img}>
                  <img src={`${item.imageUrl}`} alt="" />
                </div>
                <div className={Trend.a}>
                  <h4>
                    اسم المنتج : <span>{item.name}</span>
                  </h4>
                  <h5>
                    السعر : <span>{item.price}</span>
                  </h5>
                  <h5>
                    النوع : <span>{item.category}</span>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SliderHome;
