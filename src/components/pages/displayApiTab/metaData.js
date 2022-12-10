import React, { useState } from "react";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toast";

const ImageMetaData = ({ metaData, handleClose }) => {
  const [validated, setValidated] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const showError = () =>
    toast.error("Enter value existed, please try some other tags");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (tags.includes(inputValue)) {
        showError();
      } else {
        setTags([...tags, inputValue]);
      }
      setInputValue("");
      setValidated(false);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const ApplyTagChanges = () => {
    if (metaData.hasOwnProperty("tags")) {
      const updatedArray = tags;
      metaData.tags?.push(updatedArray);
    } else {
      metaData["tags"] = tags;
    }

    handleClose();
  };

  return (
    <>
      {" "}
      <div className="d-flex flex-row py-2">
        <label> Name</label> :{" "}
        <label className="fw-bold px-1 text-capitalize">
          {metaData?.user.first_name} {metaData?.user.last_name}
        </label>
      </div>
      {metaData?.user.bio !== null ? (
        <div className="d-flex flex-row py-2">
          <label>Bio</label> :{" "}
          <label className="fw-bold px-1">{metaData?.user.bio}</label>
        </div>
      ) : null}
      <div className="d-flex flex-row py-2">
        <label>Created</label> :{" "}
        <label className="fw-bold px-1">
          {moment(metaData?.created_at).format("MM-DD-YYYY, h:mm:ss a")}
        </label>
      </div>
      <div className="d-flex flex-row py-2">
        <label>Created</label> :{" "}
        <label className="fw-bold px-1">
          {" "}
          {moment(metaData?.updated_at).format("MM-DD-YYYY, h:mm:ss a")}
        </label>
      </div>
      {tags && tags.length > 0 && (
        <div className="d-flex flex-row py-2">
          <label>Tags</label> :
          <div className="d-flex flex-wrap">
            {tags.map((item) => (
              <div
                key={item}
                className="bg-primary text-white mx-1 px-2 py-1 rounded-1 cursor-pointer mb-2"
                style={{ fontSize: "13px !important" }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      <Form
        className="my-3"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tag name"
            onChange={handleChange}
            value={inputValue}
            required
          />
        </Form.Group>

        <Button variant="btn btn-outline-primary" type="submit">
          Add
        </Button>
      </Form>
      {tags && tags.length > 0 && (
        <div className="py-3 d-flex flex-row-reverse">
          <Button
            variant="btn btn-outline-success"
            type="button"
            className="w-50"
            onClick={ApplyTagChanges}
          >
            Apply
          </Button>
        </div>
      )}
      <ToastContainer delay={3000} position="top-right" />
    </>
  );
};

export default ImageMetaData;
