export function isEmailValid(email) {
  // eslint-disable-next-line
  const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!email) return false;

  if (email.length > 254) return false;

  const valid = emailRegex.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 63)) {
    return false;
  }

  return true;
}

export function validateRegister(req, res, next) {
  if (
    !req.body.username
    || req.body.username.length < 3
    || req.body.username.length > 16
  ) {
    return res.status(400).send({
      msg: 'Please enter a username with min. 3 chars and max. 16 chars'
    });
  }
  // password min 6 chars
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      msg: 'Please enter a password with min. 6 chars'
    });
  }

  if (!isEmailValid(req.body.email)) {
    return res.status(400).send({
      msg: 'Please enter a valid email address'
    });
  }

  return next();
}
