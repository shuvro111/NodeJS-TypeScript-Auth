import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', (req, res) =>
  res.send('<a href="/api/auth/google"> Auth With Google </a>')
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
  (req, res) => res.send(200)
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/users',
    failureRedirect: '/api/auth/login',
  }),
  (req, res) => res.redirect('http://localhost:3000/menu')
);

router.get('/status', (req, res) => {
  return req.user
    ? res.send(req.user)
    : res.status(401).send({ msg: 'Unauthorized' });
});

export default router;
