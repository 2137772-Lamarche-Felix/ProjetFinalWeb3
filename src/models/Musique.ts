import mongoose,{ Date, Schema, model } from 'mongoose';
import { platform } from 'os';



export interface IMusique {
    _id: string;
    titre: string;
    artiste: {
            nomArtiste: string; 
            nom:string;
            prenom:string;
            nombreAnneeCarriere: number;
            dateNaissance: Date;
            origine: string;
    };
    album: [

        {
            name: string;
            url: string;
        }
    ];
    genre: string;
    dateDeSortie: Date;
    duree: number;
    paroles: string;
    compositeur: string;
    producteur: string;
    enCollaboration: boolean;
    artistesEnCollaboration?: [
        Artiste:
        {
            nomArtiste: string; 
            nom:string;
            prenom:string;
            nombreAnneeCarriere: number;
            dateNaissance: Date;
            origine: string;
        }
    ];
    nombreDecoute: number;
    evaluations: [
        {
            note: number;
        }
    ];
    commentaires?: string[];
    imageDeCouverture?: string;
    fichierAudio?: string;
    source?: string;
    estFavoris?: boolean;
}


    


function validaterTableau(array: string[]): boolean {
    if (array === undefined || array === null) {
        return false;
    }
    if (array.length > 0) {
        return true;
    }
    else if (array.length === 0) {
        return false;
    }
    else {
        return false;
    }

    
}
const MusiqueSchema = new Schema({
    
    titre: {type: String, required: [true, 'Le titre est requis']},
    artiste: 
        {
            nomArtiste: {type: String, required: [true, 'Le nom de l\'artiste est requis']}, 
            nom:{type: String, required: [true, 'Le nom est requis']},
            prenom:{type: String, required: [true, 'Le prenom est requis']},
            nombreAnneeCarriere: {type: Number, required: [true, 'Le nombre d\'année de carrière est requis']},
            dateNaissance: {type: Date, required: [true, 'La date de naissance est requise'], max : "2023-12-31"},
            origine: {type: String, required: [true, 'L\'origine est requise']}
        },
    album: {type: Array, required: [true, 'L\'album est requis'],items:{
        name: {type: String,required: [true, 'Le nom de l\'album est requis']},
        url: {type: String}
        
    }
    ,validate: {
        validator: validaterTableau,
        message: 'Le tableau d\'album doit contenir au moins un élément.', // Message d'erreur personnalisé
      },},
    genre: {type: String},
    dateDeSortie: {type: Date, required: [true, 'La date de sortie est requise'], max : "2023-12-31"},
    duree: {type: Number, required: [true, 'La durée est requise']},
    paroles: {type: String},
    compositeur: {type: String},
    producteur: {type: String},
    enCollaboration: {type: Boolean},
    artistesEnCollaboration: [
        {
            Artiste:
            {
                nomArtiste: {type: String, required: [true, 'Le nom de l\'artiste est requis']}, 
                nom:{type: String, required: [true, 'Le nom est requis']},
                prenom:{type: String, required: [true, 'Le prenom est requis']},
                nombreAnneeCarriere: {type: Number, required: [true, 'Le nombre d\'année de carrière est requis']},
                dateNaissance: {type: Date, required: [true, 'La date de naissance est requise'], max : "2023-12-31"},
                origine: {type: String, required: [true, 'L\'origine est requise']}
            }
        }
    ],
    nombreDecoute: {type: Number,min: [0,"Le nombre d'écoute ne peut pas être plus petite que 0"],required: [true, 'Le nombre d\'écoute est requis']},
    evaluations: [
        {
            note: {type: Number,min:[0,"La note ne peut pas être plus petite que 0"],max:[5,"La note ne peut pas être plus grande que 5"],required: [true, 'La note est requise'] }
        }
    ],
    commentaires: {type: [String] ,validate: {
        validator: validaterTableau,
        message: 'Le tableau de commentaire doit contenir au moins un élément.', // Message d'erreur personnalisé
      },},
    imageDeCouverture: {type: String},
    fichierAudio: {type: String},
    source: {type: String},
    estFavoris: {type: Boolean} 
});
    

export default model<IMusique>('Musique', MusiqueSchema);