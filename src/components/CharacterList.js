import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "../assets/style.css";
import { getAllCharacters } from "../services/services/rickAndMortyService";
import CharacterCard from "./CharacterCard";
import ReplayIcon from "@mui/icons-material/Replay";

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
  const [pageSize, setPageSize] = useState(10);
  // const pageSize = 10;

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

  const handleChange = (e) => {
    e.preventDefault();
    const items = e.target.value;
    setPageSize(items);
  };

  const handleChangeReload = () => {
    window.location.reload();
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography className="titulo" textAlign={"center"}>
        Personajes de Rick and Morty
      </Typography>

      {!isNaN(totalPages) && paginatedCharacters?.length > 0 && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item style={{ marginTop: "10px" }}>
            <Button
              variant="outlined"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{ marginRight: "5px" }}
            >
              {"<<"}
            </Button>
          </Grid>
          <Grid item style={{ marginTop: "10px" }}>
            <Typography variant="body1">
              Pag. {currentPage} / {totalPages}
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: "10px" }}>
            <Button
              variant="outlined"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "5px" }}
            >
              {">>"}
            </Button>
          </Grid>
          <Grid item className="cantPersonaje">
            <InputLabel
              id="pageSize-label"
              style={{ marginLeft: "15px", fontWeight: "bold" }}
            >
              Cantidad de Personajes
            </InputLabel>
            <Select
              labelId="pageSize-label"
              id="pageSize-select"
              value={pageSize}
              onChange={handleChange}
              className="selectCant"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Grid>
        </Grid>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : paginatedCharacters && paginatedCharacters.length > 0 ? (
        <Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
              <Grid container spacing={10} justifyContent="center">
                {paginatedCharacters.map((character) => (
                  <Grid item xs={12} sm={6} md={4} key={character.id}>
                    <CharacterCard character={character} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            style={{
              marginTop: "10px",
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <InputLabel id="pageSize-label" style={{ fontWeight: "bold" }}>
              Recargue la página
            </InputLabel>
            <IconButton onClick={handleChangeReload}>
              <ReplayIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Typography className="Titulo">
          No hay personajes de Rick and Morty para mostrar.
        </Typography>
      )}
    </Box>
  );
}

export default CharacterList;
