"use client";
import Modal from "@/components/ui/modal";

import { useLoginModal } from "@/hooks/use-login-modal";

import Login from "@/components/login";

export default function LoginModal() {
  const loginModal = useLoginModal();

  return (
    <Modal
      title="آیا مطمينید؟"
      description="این اتفاق نمیتواند غیرکامل رها شود!"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
    >
      <Login />
    </Modal>
  );
}
