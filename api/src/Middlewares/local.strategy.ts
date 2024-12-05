import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const localStrategy = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(err); // Si hay un error, pasa el error a la función next
    }
    if (!user) {
      return res.status(404).json({ error: info.message });
    }
    req.user = user;
    next(); // Continúa con el siguiente middleware o controlador
  })(req, res, next); // Pasa req, res y next a passport.authenticate
};

export default localStrategy;