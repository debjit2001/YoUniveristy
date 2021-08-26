import React from "react";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import style from "./styles.module.css";

const Loading = ({ loading }) => {
  return loading ? (
    <div className={style.LoadingCard}>
      <Loader
        type="Watch"
        color="#00BFFF"
        height={100}
        width={100}
        visible={loading ? true : false}
      />
    </div>
  ) : null;
};

export default Loading;
