import React, { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import ApiService from "../../services/dataRender.service";
import GridCard from "./GridCard";

const RenderApiData = () => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ApiService.getApiData(1)
      .then((response) => {
        setLoading(false);
        setListData(response.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  return (
    <>
      {listData.map((item, i) => (
        <GridCard data={item} key={i} rowsPerColumn={6} />
      ))}
      {loading ? <Loader /> : null}
    </>
  );
};

export default RenderApiData;
