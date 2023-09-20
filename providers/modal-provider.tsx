"use client";
import { useEffect, useState } from "react";

import {
  CreateServerModal,
  InviteModal,
  ServerSettingsModal,
  ManageMembersModal,
  CreateChannelModal,
  DeleteServerModal,
  LeaveServerModal,
  DeleteChannelModal,
  EditChannelModal,
} from "@/components/modals";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <ServerSettingsModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <DeleteServerModal />
      <LeaveServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};

export default ModalProvider;
