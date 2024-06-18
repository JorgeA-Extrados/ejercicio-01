import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCharacterById } from "../services/services/rickAndMortyService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

function CharacterDetail() {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const characters = useSelector((state) => state.character);
  const navigate = useNavigate();

  useEffect(() => {
    if (characters && characters.id) {
      const fetchCharacter = async () => {
        try {
          const data = await getCharacterById(characters.id);
          setCharacter(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchCharacter();
    }
  }, [characters]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  if (!character) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  return (
    <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
    <Grid item xs={12} md={10} lg={8}>
      <Card sx={{ width: "100%", maxWidth: "80%", margin: "auto" }}>
            <IconButton onClick={handleBackClick} sx={{ margin: 2 }}>
              <ArrowBackIcon />
            </IconButton>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
                alignItems="center"
                style={{margin: 'auto'}}
            >
              <Avatar
                src={character.image}
                sx={{
                  height: { xs: "150px", sm: "200px", md: "250px" },
                  width: { xs: "150px", sm: "200px", md: "250px" },
                  marginRight: { xs: 2, md: 4 },
                  marginLeft: { xs: 2, md: 0 },
                  marginBottom: { xs: 2, md: 0 },
                }}
              />
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ textAlign: "center", flex: 1 }}
              >
                <Typography variant="h4" sx={{ fontSize: "2rem" }} className="name">
                  {character.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="h6"
                  sx={{ fontSize: "1.25rem" }}
                >
                  <span style={{ fontWeight: "bold" }}>Especie:</span>{" "}
                  {character.species} <br />
                  <span style={{ fontWeight: "bold" }}>Estado:</span>{" "}
                  {character.status}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="h6"
                  sx={{ fontSize: "1.25rem" }}
                >
                  <span style={{ fontWeight: "bold" }}>Genero:</span>{" "}
                  {character.gender}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  );
}

export default CharacterDetail;
