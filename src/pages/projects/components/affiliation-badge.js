import { Box } from "@mui/material";
import { gradientForCategory } from "../category-colors";

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

export const AffiliationBadge = ({ affiliation, category }) => {
  return (
    <Box
      sx={{
        width: "40px",
        height: "40px",
        minWidth: "40px",
        borderRadius: "50%",
        background: gradientForCategory(category),
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
