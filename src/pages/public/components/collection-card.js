import { Grid, Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getCollection } from "../../../api/collection";
import collectionIcon from "../../../image/collection-icon.svg";
import { Link } from "react-router-dom";

export const CollectionCard = ({ id }) => {
  const {
    data: collection,
    isLoading,
    error,
  } = useQuery(["collections", id], () => getCollection(id));

  if (isLoading)
    return (
      <Box
        sx={{
          height: "332px",
          width: "70%",
          maxWidth: "350px",
          minWidth: "300px",
          backgroundColor: "#FAFAFA",
          margin: "10px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            margin: "40% auto",
            justifyContent: "center",
          }}
        >
          "Loading..."
        </Typography>
      </Box>
    );
  if (error) return "Collection Missing";
  
  return (
    <Grid
      item
      sx={{
        width: "70%",
        maxWidth: "350px",
        height: "332px",
        margin: "10px",
        backgroundColor: "#FAFAFA",
        padding: "48px 24px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box sx={{ height: "44px", width: "auto" }}>
        <img
          src={collection.image_url ? collection.image_url : ""}
          alt={`Collection logo `}
          style={{ width: "auto", height: "100%" }}
        />
      </Box>
      <Typography variant="text1">
        {collection.name ? collection.name : ""}
      </Typography>
      <Typography variant="body3">
        {collection.description ? collection.description : ""}
      </Typography>
      <Typography variant="body3">
        {collection.owner.affiliation ? collection.owner.affiliation : ""}
      </Typography>
      <Grid container alignItems="center" marginTop="45px">
        <Grid item sx={{ margin: "0 10px 0 0" }}>
          {" "}
          <img src={collectionIcon} alt="collection icon" />
        </Grid>
        <Grid item>
          <Link
            to={`/collection/${id}`}
            style={{
              background:
                "linear-gradient(97.08deg, #F38B97 20.01%, #F4904D 75.82%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
              textDecoration: "none",
              width: "fit-content",
              "&:hover": {
                borderBottom: "1px solid #F4904D",
              },
            }}
          >
            View collection
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
