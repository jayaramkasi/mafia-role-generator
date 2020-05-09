import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../redux/actions";

import Modal from "react-bootstrap/Modal";

export default function StopAlert(props) {
  const dispatch = useDispatch();
  const { show, header, body } = useSelector(state => state.alert);

  return (
    <Modal show={show} onHide={() => dispatch(hideAlert())}>
      <Modal.Header closeButton>{header}</Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
}
