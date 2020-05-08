import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../redux/actions";

import Modal from "react-bootstrap/Modal";

export default function Alert(props) {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);

  return (
    <Modal show={alert.show} onHide={() => dispatch(hideAlert())}>
      <Modal.Header closeButton>{alert.header}</Modal.Header>
      <Modal.Body>{alert.body}</Modal.Body>
    </Modal>
  );
}
