import apiRickandMorty from "../apis/apiRickandMorty";


export const getAllCharacters = async () => {
    try {
        const response = await apiRickandMorty.get('/character');
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};

export const getCharacterById = async (id) => {
    try {
        const response = await apiRickandMorty.get(`/character/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching character with ID ${id}:`, error);
        throw error;
    }
};
