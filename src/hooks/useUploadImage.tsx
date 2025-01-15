import { useState } from "react";

const useImageUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string[]>([]);

  const handleClick = () => {
    // Rasm yuklash jarayoni bu yerda
    setLoading(true);
    // Fayl tanlash funksiyasi
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        const fileArray = Array.from(files);
        // Bu yerda rasm yuklash jarayoni bo'lishi mumkin
        const uploadedImages = fileArray.map((file) =>
          URL.createObjectURL(file)
        );
        setResult(uploadedImages);
      }
      setLoading(false);
    };
    input.click();
  };

  return { handleClick, loading, result };
};

export default useImageUpload;
