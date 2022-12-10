/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Image({ image, deleteSelectedImage }) {
  return (
    <div className="render_image_wrap">
      <img alt="" src={image.regular} className="render_image_view" />
      <div className="hover_image_content">
        <div className="d-flex flex-row align-items-center justify-content-center h-100">
          <a href="javascript:void(0)" onClick={deleteSelectedImage}>
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}

export default Image;
