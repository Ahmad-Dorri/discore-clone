"use client";
import { useEffect, useState } from "react";
import Modal from "../ui/modal";

const ServerModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      title="create a new server "
      description="enter valid data"
    />
  );
};

export default ServerModal;
