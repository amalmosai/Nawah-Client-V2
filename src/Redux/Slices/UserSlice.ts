import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";

interface userState {
  user: object | any;
}

const url = `${process.env.REACT_APP_BASE_URL}/user`;
const id: any = localStorage.getItem("userId");
const parsedId = JSON.parse(id);
console.log(parsedId);

const token: any = localStorage.getItem("token");
const parsedToken = JSON.parse(token);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(`${url}/${id}`);
      console.log(res.data);
      return res.data;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "please double check your credentials";
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (data: any, { rejectWithValue, dispatch }) => {
    console.log(data);
    try {
      const res = await axios.patch(`${url}/${data?.id}`, data?.form, {
        headers: {
          authorization: `Bearer ${parsedToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(getUser(parsedId));
      return res.data;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "please double check your credentials";
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  } as userState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.user = action.payload;
        console.log("pending");
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        console.log("fulfilled");
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = action.payload;
        console.log("rejected");
      })
      .addCase(editProfile.pending, (state, action) => {
        state.user = action.payload;
        console.log("pending");
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
        console.log("fulfilled");
        dispatch(getUser(parsedId));
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.user = action.payload;
        console.log("rejected");
      });
  },
});

export default userSlice.reducer;

function dispatch(arg0: AsyncThunkAction<any, string, AsyncThunkConfig>) {
  throw new Error("Function not implemented.");
}
