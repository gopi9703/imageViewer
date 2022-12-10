import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const ContainerView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: transapent;
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function DropBox({ onDrop }) {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const lists = acceptedFiles.map((list) => (
    <li key={list.path}>
      {list.path} - {list.size} bytes
    </li>
  ));

  return (
    <>
      {" "}
      <section className="dropbox" onClick={open}>
        <ContainerView
          className="dropbox d-flex m-auto"
          {...getRootProps({ isDragAccept, isFocused, isDragReject })}
        >
          <input {...getInputProps()} />
          {/* <p>Drag 'n' drop files here</p>
          <span className="mb-2 mt-0 fs-6">OR</span>
          <Button variant="outline-primary" onClick={open}>
            Click to select file(s)
          </Button> */}
        </ContainerView>
      </section>
      {lists && lists.length > 0 && (
        <aside className="mt-4 px-2 py-2">
          <h4>Uploaded List</h4>
          {/* <p>{lists}</p> */}
        </aside>
      )}
    </>
  );
}

export default DropBox;
