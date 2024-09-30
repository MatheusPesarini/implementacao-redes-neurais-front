import { useState } from "react";
import Dropzone from "react-dropzone";

export default function ImageUpload() {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  return (
    <form className="flex flex-col items-center">
      <Dropzone onDrop={onDrop} accept="image/*" maxSize={5242880}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 p-5 w-full text-center"
          >
            <input {...getInputProps()} />
            <p
              className={`${
                isDragActive ? "text-blue-500 font-semibold" : "text-gray-500"
              } p-5`}
            >
              {isDragActive ? "Solte a imagem aqui" : "Clique em mim ou arraste um arquivo"}
            </p>
          </div>
        )}
      </Dropzone>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Upload
      </button>

      <div className="flex flex-row items-center justify-center pt-5 flex-wrap">
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Imagem enviada ${index + 1}`}
            className="w-24 h-24 pr-2 object-cover hover:cursor-pointer"
            onClick={() => {
              setImages((prevImages) =>
                prevImages.filter((_, i) => i !== index)
              );
            }}
          />
        ))}
      </div>
    </form>
  );
}
