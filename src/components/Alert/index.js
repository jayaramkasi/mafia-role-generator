import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../../redux/actions";

import Modal from "react-bootstrap/Modal";

export default function Alert(props) {
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toast);

  return (
    <Modal show={toast.show} onHide={() => dispatch(hideToast())}>
      <Modal.Header closeButton>{toast.header}</Modal.Header>
      <Modal.Body>{toast.body}</Modal.Body>
    </Modal>
  );
}
