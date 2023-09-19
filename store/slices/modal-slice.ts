import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChannelType } from "@prisma/client";

import { ServerWithMembersWithProfiles } from "@/types";

export type ModalType =
  | "CreateServer"
  | "Invite"
  | "EditServer"
  | "ManageMembers"
  | "CreateChannel"
  | "DeleteServer"
  | "LeaveServer";

interface ModalData {
  server?: ServerWithMembersWithProfiles;
  channelType?: ChannelType;
}

export interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
}

interface ModalAction {
  type: ModalType | null;
  data?: ModalData;
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
      reducer: (state, action: PayloadAction<ModalAction>) => {
        action.payload.data
          ? (state.data = action.payload.data)
          : (state.data = {});
        state.type = action.payload.type;
        state.isOpen = true;
      },
      prepare(type: ModalType, data: ModalData = {}) {
        return {
          payload: { type, data },
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
