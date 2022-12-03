const GridCard = ({ data, rowsPerColumn }) => {
  let widthValue = 100 / rowsPerColumn;
  return (
    <>
      <div
        className="my-2 px-2 d-inline-block"
        style={{ width: widthValue + "%" }}
      >
        <img src={data.thumbnailUrl} alt="" className="w-100" />
        <p className="fs-6 text-truncate fw-semibold">{data.title}</p>
      </div>
    </>
  );
};

export default GridCard;
