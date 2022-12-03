import Image from "./Image";

const ShowImage = ({ images }) => {
  const show = (image) => {
    return <Image image={image} key={image} />;
  };

  return <div className="container d-flex flex-row">{images.map(show)}</div>;
};

export default ShowImage;
