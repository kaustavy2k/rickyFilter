import "./list.css";
import React, { Suspense } from "react";
import { useState } from "react";
const Modal = React.lazy(() => import("../Modal/modal"));
const List = React.memo((props) => {
  const [modalShow, setModalShow] = useState(false);
  const showModal = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };
  return (
    <React.Fragment>
      <div onClick={showModal} className="list">
        <div className="info">
          <img className="image" src={props.image} />
          <h3>{props.name}</h3>
        </div>
        <div className="info2">
          <span className="dot"></span>
          <h3>{props.status}-</h3>
          <h3>{props.species}</h3>
        </div>
      </div>
      {modalShow ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            location={props.location}
            image={props.image}
            name={props.name}
            status={props.status}
            species={props.species}
            origin={props.origin}
            gender={props.gender}
            show={modalShow}
            handleClose={hideModal}
          ></Modal>
        </Suspense>
      ) : null}
    </React.Fragment>
  );
});

export default List;
