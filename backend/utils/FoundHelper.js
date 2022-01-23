exports.validateRequest = (
  name,
  email,
  itemName,
  foundDate,
  foundItemDetails,
  req
) => {
  if (
    !name ||
    !email ||
    !itemName ||
    !foundDate ||
    !foundItemDetails ||
    req.file === undefined
  )
    return false;
  return true;
};
