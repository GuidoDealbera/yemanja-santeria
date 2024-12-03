import "dotenv/config";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL } = process.env;
import bcrypt from 'bcrypt';
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { UserAttributes } from "../Interfaces/interfaces";
import {getUserByEmail} from "../Controllers/";

passport.use(
  new GoogleStrategy(
    {
      clientID: `${GOOGLE_CLIENT_ID}`,
      clientSecret: `${GOOGLE_CLIENT_SECRET}`,
      callbackURL: `${BACKEND_URL}/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const user: Partial<UserAttributes> = {
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails && profile.emails[0].value,
        profilePhoto: profile.photos && profile.photos[0].value,
      }
      return done(null, user)
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user: UserAttributes = await getUserByEmail(username);
        if(!user) {
          return done(null, false, {message: 'Usuario no encontrado'})
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
          return done(null, false, {message: "Contraseña incorrecta"});
        };

        return done(null, user)
      } catch (error: any) {
        console.log(error.message);
        return done(error)
      }
    }
  ),
)

passport.serializeUser((user: any, done) => {
  done(null, user);
});
passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;