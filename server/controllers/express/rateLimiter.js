const redisClient = require("../../redis");

const rateLimiter =
  (secondsLimit, limitAmount) => async (req, res, next) => {
    const ip = req.connection.remoteAddress;
    [response] = await redisClient
      .multi()
      .incr(ip)
      .expire(ip, secondsLimit)
      .exec();

    if (response[1] > limitAmount)
      res.json({
        loggedIn: false,
        status: "Полегче! Попробуй через минуту.",
      });
    else next();
  };

module.exports = rateLimiter;
