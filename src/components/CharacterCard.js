import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import "../assets/style.css";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCharacter } from "../redux/slices/characterSlice";
import { useNavigate } from "react-router-dom";

function CharacterCard({ character }) {
  const [data, setData] = useState(character);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = () => {
    dispatch(setCharacter({ id: data.id }));
    navigate(`/detail`);
  };

  return (
    <Card sx={{ display: "flow" }} className="cardCharacter">
      <Grid>
        <CardMedia
          component="img"
          className="image"
          image={data.image}
          alt="Live from space album cover"
        />
      </Grid>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" className="name">
            {data.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            style={{ textAlign: "center" }}
          >
            <span style={{ fontWeight: "bold" }}>Especie:</span> {data.species}{" "}
            <br />
            <span style={{ fontWeight: "bold" }}>Estado:</span> {data.status}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={handleChange}>
            <AddIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

export default CharacterCard;
