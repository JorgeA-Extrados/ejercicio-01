import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "../assets/style.css";
import { getAllCharacters } from "../services/services/rickAndMortyService";
import CharacterCard from "./CharacterCard";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getAllCharacters();
        setCharacters(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(characters?.length / pageSize);
  const paginatedCharacters = characters?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <>
      <Grid>
        <Typography className="titulo" textAlign={"center"}>
          Personajes de Rick and Morty
        </Typography>

        {loading ? (
          <CircularProgress style={{ margin: "auto" }} />
        ) : paginatedCharacters && paginatedCharacters.length > 0 ? (
          <Box>
            {paginatedCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
              />
            ))}
          </Box>
        ) : (
          <Typography className="Titulo">
            No hay personajes de Rick and Morty para mostrar.
          </Typography>
        )}

        {!isNaN(totalPages) && paginatedCharacters?.length > 0 && (
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="outlined"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {"<<"}
            </Button>
            <Typography variant="body1" style={{ margin: "5px 10px 0px 10px" }}>
              Pag.{currentPage} /{totalPages}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {">>"}
            </Button>
          </Box>
        )}
      </Grid>
    </>
  );
}

export default CharacterList;
