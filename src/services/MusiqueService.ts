import MusiqueRepo from "../repos/MusiqueRepo";
import {IMusique} from "../models/Musique";
import { RouteError } from '../other/classes';
import HttpStatusCodes from '../constants/HttpStatusCodes';

// **** Variables **** //

export const MUSIQUE_NOT_FOUND = 'JMusique recherché non trouvé';
 
// **** Functions **** //
function getAll(): Promise<IMusique[]> {
    return MusiqueRepo.getAll();
}

function addOne(jeu: IMusique): Promise<IMusique> {
    return MusiqueRepo.add(jeu);
}
function deleteOne(id:string): Promise<void> {
    const musiqueExiste = MusiqueRepo.testId(id);
    if (!musiqueExiste) {
        throw new RouteError(HttpStatusCodes.NOT_FOUND,MUSIQUE_NOT_FOUND);
    }
    return MusiqueRepo.delete_(id);
}
function updateOne(jeu: IMusique): Promise<IMusique | null> {
    
    return MusiqueRepo.update(jeu);
}
function getById(id:string): Promise<IMusique | null> {
    return MusiqueRepo.getById(id);
}
function getByTitre(titre:string): Promise<IMusique[] | null> {
    return MusiqueRepo.getByTitre(titre);
}

function getByNombreEcoute(min:number,max:number): Promise<IMusique[] | null> {
    return MusiqueRepo.getByNombreEcoute(min, max);
}

function getMoyenneEcouteArtiste(artiste:string): Promise<number> {
    return MusiqueRepo.getMoyenneEcouteArtiste(artiste);
}

function getEcouteTotaleArtiste(artiste:string): Promise<number> {
    return MusiqueRepo.getEcouteTotaleArtiste(artiste);
}

export default {
    getAll,
    addOne,
    deleteOne,
    updateOne,
    getById,
    getByTitre,
    getByNombreEcoute,
    getMoyenneEcouteArtiste,
    getEcouteTotaleArtiste
};
