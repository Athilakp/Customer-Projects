import { useState, useEffect } from "react";
import { message } from "antd";
import {
  getProjects,
  addProject,
  editProject,
  deleteProject,
} from "../utils/api";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      message.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const addNewProject = async (data) => {
    try {
      await addProject(data);
      message.success("Project added successfully.");
      loadProjects();
    } catch (error) {
      message.error("Failed to add project.");
    }
  };

  const updateProject = async (id, data) => {
    try {
      await editProject(id, data);
      message.success("Project updated successfully.");
      loadProjects();
    } catch (error) {
      message.error("Failed to update project.");
    }
  };

  const removeProject = async (id) => {
    try {
      await deleteProject(id);
      message.success("Project deleted successfully.");
      loadProjects();
    } catch (error) {
      message.error("Failed to delete project.");
    }
  };

  return {
    projects,
    loading,
    addNewProject,
    updateProject,
    removeProject,
  };
};

export default useProjects;
