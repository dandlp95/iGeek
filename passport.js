const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const AccountModel = require("./db/accountModel");
require("dotenv").config();

/*We passed passport as a parameter in the app.js file*/
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newAccount = {
          googleId: profile.id,
          userName: profile._json.email,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: profile._json.email,
        };

        try {
          let account = await AccountModel.findOne({ googleId: profile.id });
          if (account) {
            done(null, account);
          } else {
            const account = await AccountModel.create(newAccount);
            done(null, account);
          }
        } catch (err) {
          // console.error(err);
          next(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    AccountModel.findById(id, (err, account) => {
      done(err, account);
    });
  });
};

// id: '105099342750208784438',
//   displayName: 'Daniel De la Peña',
//   name: { familyName: 'De la Peña', givenName: 'Daniel' },
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/AATXAJzdCgFnBMLP652W2S4bjpuprRowP1VvdqXyZ1lE=s96-c'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "105099342750208784438",\n' +
//     '  "name": "Daniel De la Peña",\n' +
//     '  "given_name": "Daniel",\n' +
//     '  "family_name": "De la Peña",\n' +
//     '  "picture": "https://lh3.googleusercontent.com/a/AATXAJzdCgFnBMLP652W2S4bjpuprRowP1VvdqXyZ1lE\\u003ds96-c",\n' +
//     '  "locale": "en"\n' +
//     '}',
//   _json: {
//     sub: '105099342750208784438',
//     name: 'Daniel De la Peña',
//     given_name: 'Daniel',
//     family_name: 'De la Peña',
//     picture: 'https://lh3.googleusercontent.com/a/AATXAJzdCgFnBMLP652W2S4bjpuprRowP1VvdqXyZ1lE=s96-c',
//     locale: 'en'
//   }
