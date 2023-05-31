import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/user";
import { isEmpty } from "lodash";
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  "local",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const dataUserFromToken = jwt_payload.user;
      const user = await User.findOne({
        where: { username: dataUserFromToken.username },
      });
      if (isEmpty(user)) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
