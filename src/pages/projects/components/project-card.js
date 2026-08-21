import { Box, Typography, Chip } from "@mui/material";
import { styled } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { AffiliationBadge } from "./affiliation-badge";

const CATEGORY_STYLE = {
  lyme: "linear-gradient(90deg, #0F7F90 -8.75%, #00B08A 113.12%)",
  psych: "linear-gradient(97.08deg, #F38B97 20.01%, #F4904D 75.82%)",
};

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

export const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    affiliation,
    tags,
    category,
    category_label,
    contact_name,
    contact_email,
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
          background: CATEGORY_STYLE[category] || CATEGORY_STYLE.lyme,
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
        <AffiliationBadge affiliation={affiliation} />
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

      {(contact_email || collection_id) && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "12px",
          }}
        >
          {contact_email && (
            <a
              href={`mailto:${contact_email}`}
              style={cardLinkStyle}
              title={`Email ${contact_name || "the lead investigator"}`}
            >
              Contact {contact_name || "lead investigator"}
            </a>
          )}
          {collection_id && (
            <RouterLink
              to={`/collection/${collection_id}`}
              style={cardLinkStyle}
              title={collection_name || "View file collection"}
            >
              View file collection
            </RouterLink>
          )}
        </Box>
      )}
    </Box>
  );
};
