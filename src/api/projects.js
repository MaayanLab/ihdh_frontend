import { fetchPublic } from "./fetch.js";

export const getProjects = async () => {
  const response = await fetchPublic("/projects");
  return response.projects;
};
