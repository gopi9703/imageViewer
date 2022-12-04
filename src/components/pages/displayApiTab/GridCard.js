const GridCard = ({ data, rowsPerColumn }) => {
  let widthValue = 100 / rowsPerColumn;
  return (
    <>
      <div
        className="my-2 px-2 d-inline-block"
        style={{ width: widthValue + "%" }}
      >
        <img src={data.urls.regular} alt="" className="w-100" height={150} />
        <p className="fs-6 text-truncate fw-semibold text-capitalize">
          {data.user.first_name}
        </p>
      </div>
    </>
  );
};

export default GridCard;
