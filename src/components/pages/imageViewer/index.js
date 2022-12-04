import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UploadFrom from "../uploadForm";
import RenderApiData from "../displayApiTab";

const ImageViewer = () => {
  const [key, setKey] = useState("Image Viewer");
  const [uploadedData, setUploadedData] = useState([]);

  const handleValue = (newValue) => {
    console.log("newValue", newValue);
    setUploadedData(newValue);
  };
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => {
        setKey(k);
        setUploadedData(uploadedData);
      }}
      className="mb-3"
    >
      <Tab eventKey="Image Viewer" title="Image Viewer">
        <UploadFrom handleValue={handleValue} />
      </Tab>
      <Tab eventKey="Display Unsplash Data" title="Display Unsplash Data">
        <RenderApiData uploadedData={uploadedData} />
      </Tab>
    </Tabs>
  );
};

export default ImageViewer;
