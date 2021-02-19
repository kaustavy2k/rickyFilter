import "./modal.css";
import React from "react"
const Modal = React.memo((props) => {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <span className="close" onClick={props.handleClose}>
          &times;
        </span>
        <div className="imageInfo">
          <img className="desImage" src={props.image} />

          <div className="wrapperInfo">
            <h3>{props.name}</h3>
            <h4>
              {props.status}-{props.species}
            </h4>
          </div>
        </div>
        <div className="description">
          <div className="desList">
            <div className="des1">
              <h4>Gender</h4>
              <h3>{props.gender}</h3>
            </div>

            <div className="des2">
              <h4>Location</h4>
              <h3>{props.location}</h3>
            </div>
          </div>

          <div className="desList">
            <div className="des1">
              <h4>Species</h4>
              <h3>{props.species}</h3>
            </div>

            <div className="des2">
              <h4>Origin</h4>
              <h3>{props.origin}</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
export default Modal;
