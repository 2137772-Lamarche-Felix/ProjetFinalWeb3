import { NextFunction, Request, Response, Router } from 'express';


import Paths from '../constants/Paths';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import MusiqueRoutes from './MusiqueRoutes';
import Musique from '../models/Musique';
// **** Variables **** //

const apiRouter = Router();

function validateMusique(req: Request, res: Response, next: NextFunction): void {
    const nouvelleMusique = new Musique(req.body.musique);
    //console.log(req.body);
    const error = nouvelleMusique.validateSync();
    //console.log(error);
    if (error !== undefined && error !== null) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({error});
        return;
    }
    else
    {
        next();
    }
}
// **** Functions **** //
const musiqueRouter = Router();

musiqueRouter.get(Paths.Musiques.Get, MusiqueRoutes.getAll);

musiqueRouter.get(Paths.Musiques.GetById, MusiqueRoutes.getById);

musiqueRouter.get(Paths.Musiques.GetByTitre, MusiqueRoutes.getByTitre);

musiqueRouter.get(Paths.Musiques.GetByNombreEcoute, MusiqueRoutes.getByNombreEcoute);

musiqueRouter.get(Paths.Musiques.GetMoyenneEcouteArtiste, MusiqueRoutes.getMoyenneEcouteArtiste);

musiqueRouter.get(Paths.Musiques.GetEcouteTotaleArtite, MusiqueRoutes.getEcouteTotaleArtiste);

musiqueRouter.post(Paths.Musiques.Add,validateMusique, MusiqueRoutes.add);

musiqueRouter.put(Paths.Musiques.Update,validateMusique, MusiqueRoutes.update);

musiqueRouter.delete(Paths.Musiques.Delete, MusiqueRoutes.delete_);



apiRouter.use(Paths.Musiques.Base, musiqueRouter);
// **** Export default **** //

export default apiRouter;
