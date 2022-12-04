import Image from "./Image";

const ShowImage = ({ images }) => {
  const show = (image) => {
    return <Image image={image} key={image} />;
  };
  console.log(images);
  return (
    <div className="d-flex flex-row px-2 flex-wrap">
      {images && images.length > 0 && images.map(show)}
      {images.length === 0 && (
        <div
          className="d-flex flex-col align-items-center justify-content-center w-100"
          style={{ height: "90vh" }}
        >
          Drag 'n' drop files here or click to select file(s)
        </div>
      )}
    </div>
  );
};

export default ShowImage;
