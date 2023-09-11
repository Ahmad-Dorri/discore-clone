import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "CreateServer";

export interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
}

const initialState: ModalState = {
  type: null,
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<ModalType>) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.type = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpen, onClose } = modalSlice.actions;

export default modalSlice.reducer;
