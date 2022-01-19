//Third party import
import React from "react";
//local import
import Loading from "Components/Loading";

const ImageWrapper = ({
  imgSrc,
  imgAlt,
  isLoading,
  loader,
  className,
  onLoadHandler,
  onClickHandler,
}) => {
  return isLoading ? (
    loader || <Loading loading={isLoading} />
  ) : (
    <img src={imgSrc} alt={imgAlt} />
  );
};

export default ImageWrapper;
