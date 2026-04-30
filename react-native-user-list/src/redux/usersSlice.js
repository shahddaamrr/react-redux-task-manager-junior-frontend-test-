import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    const users = data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
    }));

    await AsyncStorage.setItem("users", JSON.stringify(users));

    return users;
  } catch (error) {
    const cachedUsers = await AsyncStorage.getItem("users");

    if (cachedUsers) {
      return JSON.parse(cachedUsers);
    }

    throw error;
  }
});

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load users";
      });
  },
});

export default usersSlice.reducer;
