import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacter(state, action) {
      return action.payload;
    }
  }
});

export const { setCharacter } = characterSlice.actions;
export default characterSlice.reducer;
