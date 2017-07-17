import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import moment from 'moment';
import nodemailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';
import User from '../models/user.model';
import { setUserInfo, generateToken } from '../lib/auth';

const transport = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: process.env.MANDRILL_API_KEY,
  },
}));

export const register = (req, res) => {
  req.sanitize('username').trim();
  req.sanitize('email').trim();
  req.sanitize('password').trim();

  req.checkBody('username', 'Invalid username').notEmpty().isLength({ min: 3, max: 25 });
  req.checkBody('email', 'Invalid email address').notEmpty().isLength({ min: 3, max: 225 }).isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 8 });
  req.checkBody('displayName', 'Invalid display name').notEmpty().isLength({ max: 50 });

  const salt = bcrypt.genSaltSync(10);
  const username = req.body.username;
  const email = req.body.email;
  const displayName = req.body.displayName;
  const active = true;
  const password = bcrypt.hashSync(req.body.password, salt);
  const createdAt = moment().format();

  const newUser = {
    username,
    email,
    password,
    active,
    display_name: displayName,
    created_at: createdAt,
  };

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return User
      .query()
      .insert(newUser)
      .then((user) => {
        const userInfo = setUserInfo(user);
        res.status(201).json({
          token: generateToken(userInfo),
          user: userInfo,
        });
      })
      .catch(error => res.status(500).json({ error }));
  });
};

export const login = (req, res) => {
  req.sanitize('emailOrUsername').trim();
  req.sanitize('password').trim();

  req.checkBody('emailOrUsername', 'Enter a email or username').notEmpty();
  req.checkBody('password', 'Enter a password').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    const userInfo = setUserInfo(req.user);
    return res.status(200).json({
      token: generateToken(userInfo),
      user: userInfo,
    });
  });
};

export const forgotPassword = (req, res, next) => {
  req.sanitize('email').trim();
  req.checkBody('email', 'Invalid email address').notEmpty().isEmail();

  const userEmail = req.body.email;
  const expireDate = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return crypto.randomBytes(48, (err, buffer) => {
      if (err) return next(err);
      const resetToken = buffer.toString('hex');

      return User
        .query()
        .where('email', userEmail)
        .patch({
          reset_password_token: resetToken,
          reset_password_expires: expireDate,
        })
        .then((data) => {
          if (data !== 1) return res.status(404).json({ error: `${userEmail} does not exist` });

          const buttonHtml = `<a href="http://localhost:8000/api/v1/auth/reset-password/${resetToken}" class="btn-primary" itemprop="url" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Reset your password</a>`;

          return transport.sendMail({
            mandrillOptions: {
              template_name: 'reset-password',
              template_content: [
                {
                  name: 'button',
                  content: buttonHtml,
                },
              ],
            },
            from: 'noreply@battlerapfix.com',
            to: userEmail,
            subject: 'Reset Password',
          }, (error, info) => {
            if (error) console.error(error);
            const { email, status } = info.accepted[0];

            return res.status(200).json({ email, status });
          });
        })
        .catch(error => res.status(500).json({ error }));
    });
  });
};

export const resetPassword = (req, res) => {
  req.sanitize('password').trim();
  req.checkBody('password', 'Invalid password').notEmpty();

  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(req.body.password, salt);
  const token = req.params.token;
  const currentDate = moment().format();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return User
      .query()
      .where('reset_password_token', token)
      .andWhere('reset_password_expires', '>', currentDate)
      .patch({
        password,
        reset_password_token: null,
        reset_password_expires: null,
      })
      .then((data) => {
        if (data !== 1) return res.status(404).json({ error: 'Token has expired' });
        return res.status(200).json({ message: 'Password successfully changed.' });
      })
      .catch(error => res.status(500).json({ error }));
  });
};
