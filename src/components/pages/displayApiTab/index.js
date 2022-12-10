import React, { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import ApiService from "../../services/dataRender.service";
import GridCard from "./GridCard";
import AutoSuggest from "react-autosuggest";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import ImageMetaData from "./metaData";

const RenderApiData = ({ uploadedData }) => {
  const [listData, setListData] = useState([]);
  const [dropdownData, setDropDownData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [metData, setMetaData] = useState(null);
  const clientId = "U1PmMZr3_SDeiSkjjrcFsw-mpc0q5CGFcsb2g117JjM";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMetaData = (newObj) => {
    setMetaData(newObj);
  };

  useEffect(() => {}, [page]);

  useEffect(() => {
    setLoading(true);
    ApiService.getGalleryData(clientId, page, 10)
      .then((response) => {
        setLoading(false);
        response.data.forEach(function (item) {
          item.user.first_name = item.user.first_name.toLowerCase();
        });

        uploadedData.forEach(function (item) {
          item.user.first_name = item.user.first_name.toLowerCase();
        });

        setListData([...response.data, ...uploadedData]);
        setDropDownData([...response.data, ...uploadedData]);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [uploadedData]);

  const lowerCasedCompanies = dropdownData.map((item) => {
    return {
      id: item.id,
      name: item.user?.first_name,
      tags: item.tags?.toString(),
      image: item.urls.small_s3,
    };
  });

  const getSuggestions = (value) => {
    return lowerCasedCompanies.filter(
      (val) =>
        val?.name?.includes(value.trim()) || val?.tags?.includes(value.trim())
    );
  };

  const loadMoreImages = () => {
    setLoading(true);
    const pageCount = page + 1;
    setPage(page + 1);
    ApiService.getGalleryData(clientId, pageCount, 10)
      .then((response) => {
        setLoading(false);
        response.data.forEach(function (item) {
          item.user.first_name = item.user.first_name.toLowerCase();
        });

        setListData([...listData, ...response.data]);
        setDropDownData([...listData, ...response.data]);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="my-3">
        <div className="d-flex flex-row-reverse">
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsClearRequested={() => {
              setDropDownData(dropdownData);
              setSuggestions([]);
            }}
            onSuggestionsFetchRequested={({ value }) => {
              setValue(value);
              setSuggestions(getSuggestions(value));
            }}
            onSuggestionSelected={(_, { suggestionValue }) => {
              const newList = dropdownData.filter(
                (item) =>
                  item?.user.first_name.includes(suggestionValue) ||
                  item?.tags?.includes(suggestionValue)
              );

              setListData(newList);
            }}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={(suggestion) => (
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flexrow align-items-center">
                  {suggestion.name}
                  {suggestion.tags && suggestion.tags.length > 0 && (
                    <span className="tags_list_suggestion mx-1">
                      {suggestion.tags}
                    </span>
                  )}
                </div>
                <span style={{ width: 50, height: 30 }}>
                  <img src={suggestion.image} alt="" className="w-100 h-100" />
                </span>
              </div>
            )}
            inputProps={{
              placeholder: "search here",
              value: value,
              onChange: (_, { newValue }) => {
                setValue(newValue);
                if (newValue === "") {
                  setListData(dropdownData);
                }
              },
            }}
            highlightFirstSuggestion={true}
          />
        </div>
      </div>
      <div className="scroll_view">
        {listData.map((item, i) => (
          <GridCard
            data={item}
            key={i}
            rowsPerColumn={6}
            handleShow={handleShow}
            handleMetaData={handleMetaData}
          />
        ))}
      </div>
      <div className="d-flex flex-row justify-content-center">
        <Button variant="outline-primary w-25 my-3" onClick={loadMoreImages}>
          Load More
        </Button>
      </div>
      {loading ? <Loader /> : null}
      <>
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Image Meta data</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <>
              <ImageMetaData
                metaData={metData}
                listData={listData}
                handleClose={handleClose}
              />
            </>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </>
  );
};

export default RenderApiData;
