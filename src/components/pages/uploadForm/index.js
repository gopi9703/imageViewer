import React, { useCallback, useState } from "react";
import DropBox from "./dropBox";
import ShowImage from "./showImage";

const UploadFrom = ({ handleValue }) => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles &&
        acceptedFiles.map((file, index) => {
          const reader = new FileReader();

          reader.onload = function (e) {
            setImages((prevState) => [
              ...prevState,
              {
                id: index,
                regular: e.target.result,
                name: file.path,
                created_at: new Date(),
                updated_at: new Date(),
                user: {
                  first_name: file.path.substr(0, file.path.lastIndexOf(".")),
                },
                urls: { regular: e.target.result, small_s3: e.target.result },
              },
            ]);
          };

          reader.readAsDataURL(file);
          return file;
        });
    },
    [images]
  );

  const deleteSelectedImage = (image) => {
    const newFiles = [...images];
    newFiles.splice(newFiles.indexOf(image), 1);
    setImages(newFiles);
  };

  handleValue(images);

  return (
    <>
      <DropBox onDrop={onDrop} />
      <ShowImage images={images} deleteSelectedImage={deleteSelectedImage} />
    </>
  );
};

export default UploadFrom;
