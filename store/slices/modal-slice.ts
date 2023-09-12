import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ServerWithMembersWithProfiles } from "@/types";

export type ModalType = "CreateServer" | "Invite";

interface ModalData {
  server?: ServerWithMembersWithProfiles;
}

export interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
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
    onOpen: {
      reducer: (state, action: PayloadAction<ModalState>) => {
        state.data = action.payload.data;
        state.type = action.payload.type;
        state.isOpen = true;
      },
      prepare(type: ModalType, data: ModalData = {}) {
        const isOpen = true;
        return {
          payload: { type, data, isOpen },
        };
      },
    },

    onClose: (state) => {
      state.isOpen = false;
      state.data = {};
      state.type = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpen, onClose } = modalSlice.actions;

export default modalSlice.reducer;
