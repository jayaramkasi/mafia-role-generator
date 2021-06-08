import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-bootstrap/Toast";
import { hideToast } from "../../redux/actions";

export default function ShortToast(props) {
  const dispatch = useDispatch();
  const { show, header, body } = useSelector(state => state.toast);

  return (
    <Toast
      style={{
        position: "absolute",
        top: 70,
        right: 20
      }}
      autohide
      show={show}
      delay={5000}
      onClose={() => {
        dispatch(hideToast());
      }}>
      <Toast.Header>{header}</Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  );
}
