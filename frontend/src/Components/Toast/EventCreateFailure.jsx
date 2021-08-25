import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const EventCreateFailure = ({ error }) => {
  useEffect(() => {
    toast.error(`${error}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }, []);
  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />
  );
};

export default EventCreateFailure;
