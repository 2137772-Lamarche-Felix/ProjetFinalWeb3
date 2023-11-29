/**
 * Express router paths go here.
 */

export default {
  Base: '/',
  Musiques: {
    Base: '/musiques',
    Get: '/', // Marche a1
    GetById: '/:id', // Marche a1
    GetByTitre: '/titre/:titre', // Marche a1
    GetByNombreEcoute: '/nombreEcoute/:min/:max',  // Marche a1
    GetMoyenneEcouteArtiste: '/moyenne/:artiste', // ?
    GetEcouteTotaleArtite: '/total/:artiste', // ?
    Add: '/', // marche a1
    Update: '/', // marche a1
    Delete: '/:id', // marche a1
  },
} as const;
