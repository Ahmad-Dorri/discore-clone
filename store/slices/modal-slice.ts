import { Server } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ModalType = "CreateServer" | "Invite";

interface modalData {
  server?: Server;
}

export interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  data: modalData;
}

const initialState: ModalState = {
  type: null,
  isOpen: false,
  data: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<ModalType>, data = {}) => {
      state.isOpen = true;
      state.type = action.payload;
      state.data = data;
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
