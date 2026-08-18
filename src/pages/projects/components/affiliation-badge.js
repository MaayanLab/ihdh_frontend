import { Box } from "@mui/material";

const GRADIENTS = [
  "linear-gradient(90deg, #0F7F90 -8.75%, #00B08A 113.12%)",
  "linear-gradient(97.08deg, #F38B97 20.01%, #F4904D 75.82%)",
];

const STOPWORDS = new Set([
  "of",
  "the",
  "and",
  "at",
  "for",
  "inc",
  "institute",
  "foundation",
  "research",
]);

const initialsFor = (affiliation) => {
  const words = (affiliation || "")
    .split(/[^a-zA-Z0-9]+/)
    .filter((word) => word.length > 0 && !STOPWORDS.has(word.toLowerCase()));
  const source = words.length ? words : [(affiliation || "?")];
  return source
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const gradientFor = (affiliation) => {
  let hash = 0;
  for (let i = 0; i < (affiliation || "").length; i++) {
    hash = (hash * 31 + affiliation.charCodeAt(i)) % GRADIENTS.length;
  }
  return GRADIENTS[hash];
};

export const AffiliationBadge = ({ affiliation }) => {
  return (
    <Box
      sx={{
        width: "40px",
        height: "40px",
        minWidth: "40px",
        borderRadius: "50%",
        background: gradientFor(affiliation),
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
      title={affiliation}
    >
      {initialsFor(affiliation)}
    </Box>
  );
};
