const checkHeaderFromRequest = (req, header, value) => {
  const v = req.headers[header];
  return v === value;
};

const checkAccessCookie = (req, name, value) => {
  const v = req.cookies[name];
  return v === value;
};

export function authCheck() {
  return (req, res, next) => {
    // check gateway
    if (
      checkHeaderFromRequest(
        req,
        process.env.GATEWAY_INIT_HEADER_NAME, // x-gateway
        process.env.GATEWAY_INIT_HEADER_VALUE // superSecretGatewaySecret
      )
    ) {
      next();
      return;
    }

    // check authorization
    if (
      checkHeaderFromRequest(
        req,
        "authorization",
        `Bearer ${process.env.SIGNED_ACCESS_TOKEN}` // fakeSignedAccessToken
      ) &&
      checkAccessCookie(
        req,
        process.env.SIGNED_COOKIE_NAME, // x-fake-signed-cookie
        process.env.SIGNED_COOKIE_TOKEN // fakeSignedCookieToken
      )
    ) {
      next();
      return;
    }

    // send not authorized error
    res.status(401);
    res.json({});
  };
}
