import { useState, useMemo } from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { getLoggedUser } from "../../api/user";
import { getProjects } from "../../api/projects";
import { UserMenu } from "../dashboard/components/user-menu";
import { NavBar } from "../../layout/navbar";
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

export const ProjectsPage = () => {
  // Public page: anyone can view it. We still check for a logged-in user so
  // the nav bar matches the rest of the app, but a failed/absent check just
  // means "show the logged-out nav" rather than blocking the page.
  const { data: user } = useQuery(["user/getLoggedUser"], () => getLoggedUser(), {
    retry: false,
  });

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useQuery(["projects"], () => getProjects());

  const [category, setCategory] = useState(null);
  const [dataStatus, setDataStatus] = useState(null);
  const [keywords, setKeywords] = useState([]);

  // Category filter options come entirely from whatever categories are
  // present in the loaded projects - adding a new category to the backend
  // registry (project_categories.py) surfaces it here with no frontend change.
  const availableCategories = useMemo(() => {
    const seen = new Map();
    (projects || []).forEach((project) => {
      if (!seen.has(project.category)) {
        seen.set(project.category, project.category_label);
      }
    });
    return Array.from(seen, ([key, label]) => ({ key, label }));
  }, [projects]);

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
    setDataStatus(null);
    setKeywords([]);
  };

  const toggleCategory = (key) => {
    setCategory((current) => (current === key ? null : key));
    setKeywords([]);
  };

  const toggleDataStatus = (status) => {
    setDataStatus((current) => (current === status ? null : status));
  };

  const toggleKeyword = (keyword) => {
    setKeywords((current) =>
      current.includes(keyword)
        ? current.filter((k) => k !== keyword)
        : [...current, keyword]
    );
  };

  const filteredProjects = (projects || []).filter(
    (project) =>
      (!category || project.category === category) &&
      (!dataStatus ||
        (dataStatus === "uploaded" ? project.has_collection : !project.has_collection)) &&
      (keywords.length === 0 ||
        project.tags.some((tag) => keywords.includes(tag)))
  );

  const noFiltersActive = !category && !dataStatus && keywords.length === 0;

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
      {user ? (
        <Box sx={{ display: "flex" }}>
          <AppBar position="fixed">
            <UserMenu landingPage />
          </AppBar>
        </Box>
      ) : (
        <NavBar />
      )}
      <Box sx={{ paddingTop: user ? "93px" : 0, maxWidth: "1200px", margin: "0 auto" }}>
        <Box sx={{ padding: "60px 24px 20px 24px" }}>
          <Typography variant="subtitle1" sx={{ fontSize: "40px" }}>
            Research Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "700px", margin: "0 auto 32px auto", textAlign: "center" }}
          >
            Explore research projects funded by the Cohen Foundation,
            including their focus areas and affiliated institutions.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <FilterButton selected={noFiltersActive} onClick={resetFilters}>
              All Projects
            </FilterButton>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
            <FilterButton
              selected={dataStatus === "uploaded"}
              onClick={() => toggleDataStatus("uploaded")}
            >
              Data Uploaded
            </FilterButton>
            <FilterButton
              selected={dataStatus === "pending"}
              onClick={() => toggleDataStatus("pending")}
            >
              Data Pending
            </FilterButton>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
            {availableCategories.map(({ key, label }) => (
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
                  <ProjectCard project={project} isLoggedIn={!!user} />
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
