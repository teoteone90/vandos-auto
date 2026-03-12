"use client";

import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove?: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const handleRemove = (url: string) => {
    if (onRemove) {
      onRemove(url);
    } else {
      onChange(value.filter((v) => v !== url));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "vandos_preset";
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      alert("Cloudinary non configurato. Aggiungi NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME nelle variabili d'ambiente su Vercel.");
      return;
    }

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          onChange([...value, data.secure_url]);
        }
      } catch (err) {
        console.error("Errore upload:", err);
      }
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[150px] rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
            <div className="z-10 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors shadow-md"
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

        {/* Pulsante upload */}
        <label className="group flex flex-col items-center justify-center w-[200px] h-[150px] border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
          <ImagePlus className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600">Carica Foto</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
