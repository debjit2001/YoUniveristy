//Third party import
import React from "react";
//local import
import Loading from "Components/Loading";
import { useState } from "react";

const ImageWrapper = ({
  imgSrc,
  imgAlt,
  // isLoading,
  loader,
  className,
  idName,
  width,
  height,
  onLoadHandler,
  onClickHandler,
}) => {
  //state declaration
  const [isLoading, _isLoading] = useState(true);
  
  //method declaration
  /**
   * @DESC: set the loaded state onLoad of image
   */
  const _getImgSrc = () => {
    
    return imgSrc || "/assets/icons/no-image.svg";
  };
  const _getImgAlt = () => {

    // _isLoading((prev) => (prev = false));
    return imgAlt || "image";
  };
  const _getClassName = () => {
    return className || "imageClass";
  };
  const _getIdName = () => {
    return idName || "imageId";
  };
  const _getWidth = () => {
    return width || "1080";
  };
  const _getHeight = () => {
    return height || "1920";
  };
  const _getOnLoadHandler = () => {
    return onLoadHandler || console.log("Your image is loading...");
  };
  const _getOnClickHandler = () => {
    return onClickHandler;
  };
  
  
  const handleImageLoad = () => {
    _isLoading((prev) => (prev = false));
    // console.log("Loading ... ")
   
  };
   
  return  (
    <>    <img
      src={_getImgSrc()}
      alt={_getImgAlt()}
      className={ _getClassName()}
      id={_getIdName()}
      width={ _getWidth()}
      height={ _getHeight()}
      onLoad={()=>handleImageLoad()}
      onClick={ _getOnClickHandler()}
    />

    {
      isLoading&&(loader || <Loading loading={isLoading} />)
    }
    </>
  );
};

export default ImageWrapper;
