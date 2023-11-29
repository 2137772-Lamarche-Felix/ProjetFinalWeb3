import { ReturnDocument } from 'mongodb';
import Musique, { IMusique } from '../models/Musique';

async function getAll(): Promise<IMusique[]> {
    return await Musique.find();
    
}
async function add(musique: IMusique): Promise<IMusique> {
    const nouvelleMusique = new Musique(musique);
    return await Musique.create(nouvelleMusique);
}
async function delete_(id:string): Promise<void> {
    await Musique.deleteMany({_id: id});
}

async function update(musique: IMusique): Promise<IMusique | null> {
    let musiqueUpdate = await Musique.findByIdAndUpdate(musique._id, musique ,{
        returnDocument: 'after'
    });
    if (musiqueUpdate === null) {
        throw new Error('Musique non trouvé');
      }
    
    return await musiqueUpdate
}

async function getById(id:string): Promise<IMusique | null> {
    const musique = Musique.findOne({_id : id});
    return musique;
}

async function getByTitre(titre:string): Promise<IMusique | null> {
    const musique = Musique.findOne({titre: titre});
    return musique;
}

async function getByNombreEcoute(min:number,max:number): Promise<IMusique[] | null> {
    const musique = Musique.find({nombreDecoute: {$gte: min, $lte: max}});
    return musique;
}
async function getMoyenneEcouteArtiste(artiste:string): Promise<number> {
    const musique = await Musique.aggregate([
        {
            $match: {
                'artiste.nomArtiste': artiste
            }
        },
        {
            $group: {
                _id: null,
                moyenneEcoute: {
                    $avg: '$nombreDecoute'
                }
            }
        }
    ]);
    var nombreEcoute = musique[0].moyenneEcoute;
    return nombreEcoute;
}

async function getEcouteTotaleArtiste(artiste:string): Promise<number> {
    const musique = await Musique.aggregate([
        {
            $match: {
                'artiste.nomArtiste': artiste
            }
        },
        {
            $group: {
                _id: null,
                nombreEcouteTotale: {
                    $sum: '$nombreDecoute'
                }
            }
        }
    ]);
    
    var nombreEcouteTotale = musique[0].nombreEcouteTotale;
    return nombreEcouteTotale;
}


async function testId(id:string): Promise<boolean> {
    const musique = Musique.findById(id);

  return musique !== null;
}


export default {
    getAll,
    add,
    delete_,
    update,
    getById,
    testId,
    getByTitre,
    getByNombreEcoute,
    getMoyenneEcouteArtiste,
    getEcouteTotaleArtiste
    
};