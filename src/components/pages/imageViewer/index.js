import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UploadFrom from "../uploadForm";
import RenderApiData from "../displayApiTab";

const ImageViewer = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Image Viewer</Tab>
        <Tab>Display API Data</Tab>
      </TabList>

      <TabPanel>
        <UploadFrom />
      </TabPanel>
      <TabPanel>
        <RenderApiData />
      </TabPanel>
    </Tabs>
  );
};

export default ImageViewer;
