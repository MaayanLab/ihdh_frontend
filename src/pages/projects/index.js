import { useState, useEffect, useMemo } from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../api/user";
import { getProjects } from "../../api/projects";
import { UserMenu } from "../dashboard/components/user-menu";
import { FooterSection } from "../../layout/compactfooter";
import { ProjectCard } from "./components/project-card";
import data from "../../data/config.json";

const AppBar = styled(MuiAppBar)({
  boxShadow: "none",
  background: "#EFF4F5",
  height: "93px",
});

const KeywordChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ selected }) => ({
  margin: "4px",
  fontSize: "13px",
  fontWeight: selected ? 700 : 400,
  cursor: "pointer",
  background: selected
    ? "linear-gradient(90deg, #0F7F90 -8.75%, #00B08A 113.12%)"
    : "#EFF4F5",
  color: selected ? "#fff" : "rgba(0, 81, 99, 1)",
}));

// Fixed sizing (independent of selected state) so toggling a filter never
// changes button dimensions and shifts neighboring buttons in the row.
const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ selected }) => ({
  margin: "0 8px",
  padding: "14px 28px",
  minWidth: "auto",
  borderRadius: "80px",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "16px",
  textTransform: "capitalize",
  background: selected
    ? "linear-gradient(90deg, #0F7F90 -8.75%, #00B08A 113.12%)"
    : "#FAFAFA",
  color: selected ? "#fff" : "#005163",
  outline: selected ? "4px solid rgba(0, 81, 99, 0.1)" : "4px solid #EFF4F5",
  boxShadow: selected ? "0px 4px 9px rgba(0, 176, 138, 0.22)" : "none",
  "&:hover": {
    background: selected
      ? "linear-gradient(90deg, #0F7F90 -8.75%, #00B08A 113.12%)"
      : "#EFF4F5",
  },
}));

const CATEGORIES = [
  { key: "lyme", label: "Lyme Disease" },
  { key: "psych", label: "Psychedelic Research" },
];

export const ProjectsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/logout");
    }, 60 * 1000 * 10);
    return () => clearTimeout(timer);
  }, [navigate]);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery(["user/getLoggedUser"], () => getLoggedUser());

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useQuery(["projects"], () => getProjects(), { enabled: !!user });

  const [category, setCategory] = useState(null);
  const [keywords, setKeywords] = useState([]);

  const availableKeywords = useMemo(() => {
    const scoped = (projects || []).filter(
      (project) => !category || project.category === category
    );
    const unique = new Set();
    scoped.forEach((project) => project.tags.forEach((tag) => unique.add(tag)));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [projects, category]);

  const resetFilters = () => {
    setCategory(null);
    setKeywords([]);
  };

  const toggleCategory = (key) => {
    setCategory((current) => (current === key ? null : key));
    setKeywords([]);
  };

  const toggleKeyword = (keyword) => {
    setKeywords((current) =>
      current.includes(keyword)
        ? current.filter((k) => k !== keyword)
        : [...current, keyword]
    );
  };

  if (userLoading) return "Loading...";
  if (userError) {
    setTimeout(() => navigate("/logout"), 0);
    return "There was a problem loading this page";
  }

  const filteredProjects = (projects || []).filter(
    (project) =>
      (!category || project.category === category) &&
      (keywords.length === 0 ||
        project.tags.some((tag) => keywords.includes(tag)))
  );

  const noFiltersActive = !category && keywords.length === 0;

  return (
    <>
      <Helmet>
        <title>{data.general.project_title} | Projects</title>
        <link rel="icon" type="image/png" href={data.general.project_icon} />
        <meta
          name="description"
          content="Browse research projects funded by the Cohen Lyme & Tickborne Disease Initiative and psychedelic research programs."
        />
      </Helmet>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <UserMenu landingPage />
        </AppBar>
      </Box>
      <Box sx={{ paddingTop: "93px", maxWidth: "1200px", margin: "0 auto" }}>
        <Box sx={{ padding: "60px 24px 20px 24px" }}>
          <Typography variant="subtitle1" sx={{ fontSize: "40px" }}>
            Research Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "700px", margin: "0 auto 32px auto", textAlign: "center" }}
          >
            Explore the funded research projects behind our data collections,
            including their focus areas and affiliated institutions.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <FilterButton selected={noFiltersActive} onClick={resetFilters}>
              All Projects
            </FilterButton>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            {CATEGORIES.map(({ key, label }) => (
              <FilterButton
                key={key}
                selected={category === key}
                onClick={() => toggleCategory(key)}
              >
                {label}
              </FilterButton>
            ))}
          </Box>

          {availableKeywords.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
                margin: "0 auto",
              }}
            >
              {availableKeywords.map((keyword) => (
                <KeywordChip
                  key={keyword}
                  label={keyword}
                  size="small"
                  selected={keywords.includes(keyword)}
                  onClick={() => toggleKeyword(keyword)}
                />
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ padding: "20px 24px 80px 24px" }}>
          {projectsLoading && (
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Loading projects...
            </Typography>
          )}
          {projectsError && (
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              There was a problem loading the projects.
            </Typography>
          )}
          {!projectsLoading && !projectsError && filteredProjects.length === 0 && (
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              No projects match the selected filters.
            </Typography>
          )}
          {!projectsLoading && !projectsError && filteredProjects.length > 0 && (
            <Grid container spacing={3}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} lg={4} key={project.id}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      <FooterSection />
    </>
  );
};
