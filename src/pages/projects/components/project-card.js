import { Box, Typography, Chip, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { AffiliationBadge } from "./affiliation-badge";
import { gradientForCategory } from "../category-colors";

const TagChip = styled(Chip)({
  background: "#EFF4F5",
  color: "rgba(0, 81, 99, 1)",
  fontSize: "13px",
  fontWeight: 400,
  margin: "4px 4px 0 0",
});

const cardLinkStyle = {
  background: "linear-gradient(97.08deg, #F38B97 20.01%, #F4904D 75.82%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  fontWeight: 500,
  fontSize: "13px",
  lineHeight: "16px",
  textDecoration: "none",
  width: "fit-content",
};

const disabledCardLinkStyle = {
  color: "rgba(0, 53, 65, 0.38)",
  fontWeight: 500,
  fontSize: "13px",
  lineHeight: "16px",
  width: "fit-content",
  cursor: "not-allowed",
};

export const ProjectCard = ({ project, isLoggedIn }) => {
  const {
    title,
    description,
    affiliation,
    tags,
    category,
    category_label,
    contact_name,
    has_collection,
    collection_id,
    collection_name,
  } = project;

  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        borderRadius: "8px",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          background: gradientForCategory(category),
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
          fontWeight: 700,
          fontSize: "12px",
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        {category_label}
      </Typography>

      <Typography variant="text1" sx={{ marginBottom: "12px" }}>
        {title}
      </Typography>

      {description ? (
        <Typography variant="body3" sx={{ flexGrow: 1, marginBottom: "20px" }}>
          {description}
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1, marginBottom: "20px" }} />
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: tags.length ? "20px" : 0,
        }}
      >
        {tags.map((tag) => (
          <TagChip key={tag} label={tag} size="small" />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: "16px",
          borderTop: "1px solid #E4EBEC",
        }}
      >
        <AffiliationBadge affiliation={affiliation} category={category} />
        <Box sx={{ marginLeft: "12px" }}>
          <Typography variant="body3">{affiliation}</Typography>
          {contact_name && (
            <Typography
              variant="body4"
              sx={{ fontSize: "13px", color: "rgba(0, 53, 65, 0.6)" }}
            >
              led by {contact_name}
            </Typography>
          )}
        </Box>
      </Box>

      {collection_id ? (
        <Box sx={{ marginTop: "12px" }}>
          <RouterLink
            to={`/collection/${collection_id}`}
            style={cardLinkStyle}
            title={collection_name || "View file collection"}
          >
            View file collection
          </RouterLink>
        </Box>
      ) : (
        has_collection &&
        !isLoggedIn && (
          <Box sx={{ marginTop: "12px" }}>
            <Tooltip title="Please log in to view associated data">
              <Box component="span" sx={disabledCardLinkStyle}>
                View file collection
              </Box>
            </Tooltip>
          </Box>
        )
      )}
    </Box>
  );
};
