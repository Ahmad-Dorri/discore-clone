"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import React from "react";

import "@uploadthing/react/styles.css";
import Image from "next/image";
import { X } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endPoint: "serverImage" | "messageFile" | "profileImage";
  value: string;
}

const FileUpload = ({ onChange, endPoint, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <>
        <p className="text-sm font-bold uppercase text-zinc-500">your Image</p>
        <div className="relative mx-auto flex h-20  w-20 flex-col gap-12 ">
          <Image fill src={value} alt="upload" className=" rounded-full" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </>
    );
  }
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].fileUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
