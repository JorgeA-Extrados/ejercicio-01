import apiRickandMorty from "../apis/apiRickandMorty";



// Obtener todos los personajes
export const getAllCharacters = async () => {
    try {
        const response = await apiRickandMorty.get('/character');
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};

// // Obtener un personaje por ID
// export const getCharacterById = async (id) => {
//     try {
//         const response = await apiRickandMorty.get(`/character/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching character with ID ${id}:`, error);
//         throw error;
//     }
// };

// // Obtener todos los episodios
// export const getAllEpisodes = async () => {
//     try {
//         const response = await apiRickandMorty.get('/episode');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching episodes:', error);
//         throw error;
//     }
// };

// // Obtener un episodio por ID
// export const getEpisodeById = async (id) => {
//     try {
//         const response = await apiRickandMorty.get(`/episode/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching episode with ID ${id}:`, error);
//         throw error;
//     }
// };

// // Obtener todos los lugares
// export const getAllLocations = async () => {
//     try {
//         const response = await apiRickandMorty.get('/location');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching locations:', error);
//         throw error;
//     }
// };

// // Obtener un lugar por ID
// export const getLocationById = async (id) => {
//     try {
//         const response = await apiRickandMorty.get(`/location/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching location with ID ${id}:`, error);
//         throw error;
//     }
// };