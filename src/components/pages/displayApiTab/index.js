import React, { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import ApiService from "../../services/dataRender.service";
import GridCard from "./GridCard";
import AutoSuggest from "react-autosuggest";

const RenderApiData = ({ uploadedData }) => {
  const [listData, setListData] = useState([]);
  const [dropdownData, setDropDownData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const clientId = "U1PmMZr3_SDeiSkjjrcFsw-mpc0q5CGFcsb2g117JjM";

  useEffect(() => {
    setLoading(true);
    ApiService.getGalleryData(clientId)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
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
        console.log(e);
      });
  }, [uploadedData]);

  const lowerCasedCompanies = dropdownData.map((name) => {
    return {
      id: name.id,
      name: name.user?.first_name,
      image: name.urls.small_s3,
    };
  });

  const getSuggestions = (value) => {
    return lowerCasedCompanies.filter((val) => val.name.includes(value.trim()));
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
              const newList = dropdownData.filter((item) =>
                item.user.first_name.includes(suggestionValue)
              );
              setListData(newList);
            }}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={(suggestion) => (
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span>{suggestion.name}</span>
                <span style={{ width: 50, height: 30 }}>
                  <img src={suggestion.image} alt="" className="w-100 h-100" />
                </span>
              </div>
            )}
            inputProps={{
              placeholder: "search here",
              value: value,
              onChange: (_, { newValue, method }) => {
                setValue(newValue);
                console.log("newValue", newValue);
                if (newValue === "") {
                  setListData(dropdownData);
                }
              },
            }}
            highlightFirstSuggestion={true}
          />
        </div>
      </div>
      {listData.map((item, i) => (
        <GridCard data={item} key={i} rowsPerColumn={6} />
      ))}
      {loading ? <Loader /> : null}
    </>
  );
};

export default RenderApiData;
