import React from "react";

const Home = (props) => {
  const [hoverRowIndex, setHoverRowIndex] = React.useState(-1);

  return (
    <div className="container">
      <h2>Files</h2>
      <p>
        List of all files that is present inside{" "}
        <strong>HomeDirectory ("{props.homeDirectory}") </strong> amd was
        modified in last <strong>24hrs(1 day) </strong>
      </p>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Directory</th>
            <th>Created At</th>
            <th>Modified At</th>
          </tr>
        </thead>
        <tbody>
          {props.files.map((file, index) => (
            <tr
              onMouseEnter={() => {
                setHoverRowIndex(index);
              }}
              onMouseLeave={() => {
                setHoverRowIndex(-1);
              }}
              key={index}
            >
              <td>{file.name.toString()}</td>
              <td>
                {index === hoverRowIndex ? file.dir.toString() : "------"}
              </td>
              <td>
                {index === hoverRowIndex ? file.created.toString() : "------"}
              </td>
              <td>
                {index === hoverRowIndex ? file.modified.toString() : "-------"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
