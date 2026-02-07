const catchAsync = (fn) => {
  return (req, res, next) => {
    // run the main function if gets error , will send it to next
    fn(req, res, next).catch((err) => next(err));
  };
};

export default catchAsync;
