"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove
}) => {
  const onUpload = (result: any) => {
    onChange([...value, result.info.secure_url]);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-gray-200 shadow-sm">
            <div className="z-10 absolute top-2 right-2">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="p-1 bg-red-500 rounded-md text-white hover:bg-red-600 transition-colors shadow-md"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Immagine auto"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget 
        onSuccess={onUpload} 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "vandos_preset"}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <button
              type="button"
              onClick={onClick}
              className="group flex flex-col items-center justify-center w-[200px] h-[150px] border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
            >
              <ImagePlus className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mb-2" />
              <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600">Carica Foto</span>
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
