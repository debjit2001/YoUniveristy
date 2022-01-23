exports.validateRequest = (
  name,
  email,
  itemName,
  lostDate,
  lostItemDetails,
  req
) => {
  if (
    !name ||
    !email ||
    !itemName ||
    !lostDate ||
    !lostItemDetails ||
    req.file === undefined
  )
    return false;
  return true;
};
