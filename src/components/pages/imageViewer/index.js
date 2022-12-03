import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UploadFrom from "../uploadForm";
import RenderApiData from "../displayApiTab";

const ImageViewer = () => {
  const [key, setKey] = useState("Image Viewer");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="Image Viewer" title="Image Viewer">
        <UploadFrom />
      </Tab>
      <Tab eventKey="Display Content" title="Display Api Data">
        <RenderApiData />
      </Tab>
    </Tabs>
  );
};

export default ImageViewer;
