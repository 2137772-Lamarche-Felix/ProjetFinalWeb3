import MusiqueService from "../services/MusiqueService";
import {IMusique} from "../models/Musique";
import { IReq, IRes } from "./types/express/misc";
import HttpStatusCodes from "../constants/HttpStatusCodes";

// **** functions **** //
async function getAll(req: IReq, res: IRes): Promise<void> {
    const musiqueAll = await MusiqueService.getAll();
    res.status(HttpStatusCodes.OK).json({musiqueAll});
}
async function add(req:IReq<{musique:IMusique}>, res:IRes): Promise<void> {
    let musique = req.body.musique;
    console.log(musique);
    musique = await MusiqueService.addOne(musique);
    res.status(HttpStatusCodes.CREATED).json({musique});
}
async function update(req:IReq<{id:string,musique:IMusique}>, res:IRes): Promise<void> {
    let {musique} = req.body;
    console.log(musique);
    let musiqueUpdated = await MusiqueService.updateOne(musique);
    res.status(HttpStatusCodes.OK).json({musiqueUpdated});
}
async function delete_(req:IReq<{id:string}>,res:IRes){
    const id = req.params.id;
    await MusiqueService.deleteOne(id);
    res.status(HttpStatusCodes.OK).json({message:"Musique avec l'id "+ id + " est supprimé"});
}
async function getById(req:IReq<{id:string}>,res:IRes){
    const id = req.params.id;
    console.log(id);
    const musique = await MusiqueService.getById(id);
    console.log(musique);
    res.status(HttpStatusCodes.OK).json({musique});
}
async function getByTitre(req:IReq<{titre:string}>,res:IRes){
    const titre = req.params.titre;
    const musique = await MusiqueService.getByTitre(titre);
    res.status(HttpStatusCodes.OK).json({musique});
}
async function getByNombreEcoute(req:IReq<{min:number,max:number}>,res:IRes){
    const min = +req.params.min;
    const max = +req.params.max;
    console.log(min);
    console.log(max);
    const musique = await MusiqueService.getByNombreEcoute(min,max);
    res.status(HttpStatusCodes.OK).json({musique});
}
async function getMoyenneEcouteArtiste(req:IReq<{artiste:string}>,res:IRes){
    const artiste = req.params.artiste;
    const nbEcoute = await MusiqueService.getMoyenneEcouteArtiste(artiste);
    res.status(HttpStatusCodes.OK).json({"Nombre d'écoute Moyen" : artiste + " a une moyenne d'écoute de "+ nbEcoute});
}
async function getEcouteTotaleArtiste(req:IReq<{artiste:string}>,res:IRes){
    const artiste = req.params.artiste;
    const nombreEcouteTotale = await MusiqueService.getEcouteTotaleArtiste(artiste);
    res.status(HttpStatusCodes.OK).json({"Nombre d'écoute Totale" : artiste + " a une moyenne d'écoute de "+ nombreEcouteTotale});
}


export default {
    getAll,
    add,
    update,
    delete_,
    getById,
    getByTitre,
    getByNombreEcoute,
    getMoyenneEcouteArtiste,
    getEcouteTotaleArtiste};