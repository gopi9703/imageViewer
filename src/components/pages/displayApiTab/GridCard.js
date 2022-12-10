const GridCard = ({ data, rowsPerColumn, handleShow, handleMetaData }) => {
  const getSelectedData = () => {
    handleShow();
    handleMetaData(data);
    console.log(data);
  };

  let widthValue = 100 / rowsPerColumn;
  return (
    <>
      <div
        className="my-2 px-2 d-inline-block grid_card_view"
        style={{ width: widthValue + "%" }}
      >
        <div
          className="bg_cover"
          style={{
            background: `url(${data.urls.regular})`,
            width: "100%",
            height: 150,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="hover_tags" onClick={getSelectedData}>
            Add Tags
          </div>
        </div>
        <p className="fs-6 text-truncate fw-semibold">{data.user.first_name}</p>
        {data.tags && data.tags.length > 0 && (
          <p className="fs-6 d-flex flex-row align-items-center">
            <span style={{ fontSize: "13px" }}>Tags:</span>
            <div className="d-flex flex-wrap">
              {data.tags &&
                data.tags.length > 0 &&
                data.tags.map((item) => (
                  <div
                    key={item}
                    className="btn btn-primary text-white mx-1 px-2 py-1 rounded-1 cursor-pointer d-inline-block tags_view my-1"
                  >
                    {item}
                  </div>
                ))}
            </div>
          </p>
        )}
      </div>
    </>
  );
};

export default GridCard;
