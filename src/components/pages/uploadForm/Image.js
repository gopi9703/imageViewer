import React from "react";

function Image({ image }) {
  return (
    <div className="render_image_wrap">
      <img alt="" src={image.regular} className="render_image_view" />
    </div>
  );
}

export default Image;
