import React from "react";

function PageTitle(props) {
  return (
    <div className="flex justify-start">
      <h2 style={{color:"black"}} className="font-bold text-3xl ">{props.title}</h2>
    </div>
  );
}

export default PageTitle;
