const { validationResult } = require("express-validator");

// search more about express-validator
const validate = (req, res, next) => {
  const erros = validationResult(req);

  if (erros.isEmpty()) {
    return next();
  }

  const extractedErros = [];

  erros.array().map((err) => extractedErros.push(err.msg));

  return res.status(422).json({
    erros: extractedErros,
  });
};

module.exports = validate;
