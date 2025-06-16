import tableCartStyles from "./Tablecart.module.css";
import { increase, decrease, removeItem } from "../../Redux/Slices/CartSlice";
import { useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaXmark } from "react-icons/fa6";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

function TableCartRow(item: any) {
  const api = `${process.env.REACT_APP_UPLOAD_URL}/`;
  const dispatch = useDispatch()<any | object | AsyncThunkConfig>;

  return (
    <>
      <tr>
        <td className={tableCartStyles.item}>
          <img src={`${item.data.imageUrl}`} alt="" />
        </td>
        <td>{item.data.name}</td>
        <td>{item.data.category}</td>
        <td>{item.data.price}</td>
        <td>
          <button
            className={tableCartStyles.pluse}
            onClick={() => {
              dispatch(increase(item.data._id));
            }}
          >
            <FaPlus />
          </button>
        </td>
        <td className="font-weight-bold">{item.data.amount}</td>
        <td>
          <button
            className={tableCartStyles.pluse}
            onClick={() => {
              dispatch(decrease(item.data._id));
            }}
          >
            <FaMinus />
          </button>
        </td>
        <td className="font-weight-bold">
          {item.data.amount * item.data.price}
        </td>
        <td>
          <button
            className={tableCartStyles.delete}
            onClick={() => {
              dispatch(removeItem(item.data));
            }}
          >
            <FaXmark />
          </button>
        </td>
      </tr>
    </>
  );
}

export default TableCartRow;
