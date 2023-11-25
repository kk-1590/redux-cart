import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems,addItem,updateItem,deleteItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAsync = createAsyncThunk(
  'cart/fetchItems',
  async () => {
    const response = await fetchItems();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addAsync = createAsyncThunk(
  'cart/addItem',
  async (item) => {
    const {id,title,brand,price,thumbnail} = item;
    const response = await addItem({id,title,brand,price,thumbnail,quantity:1});
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteAsync = createAsyncThunk(
  'cart/deleteItem',
  async (id) => {
    const response = await deleteItem(id);
    // The value we return becomes the `fulfilled` action payload
    return id;
  }
);

export const updateAsync = createAsyncThunk(
  'cart/updateItem',
  async ({id,change}) => {
    const response = await updateItem(id,change);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled,(state,action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => {
          return item.id == action.payload;
        })
        console.log(index);
        state.items.splice(index,1);
      })
      .addCase(updateAsync.fulfilled,(state,action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => {
          return item.id == action.payload.id;
        })
        console.log(index,action.payload);
        state.items.splice(index,1,action.payload);
      })
  },
});

// export const {  } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default cartSlice.reducer;
