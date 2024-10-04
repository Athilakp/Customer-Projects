import { useState, useEffect } from "react";
import { message } from "antd";
import {
  getProjectTypes,
  addProjectType,
  editProjectType,
  deleteProjectType,
} from "../utils/api";

const useProjectType = () => {
  const [projectType, setProjectType] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjectType();
  }, []);

  const loadProjectType = async () => {
    setLoading(true);
    try {
      const response = await getProjectTypes();
      setProjectType(response.data);
    } catch (error) {
      message.error("Failed to load Project Types.");
    } finally {
      setLoading(false);
    }
  };

  const addNewProjectType = async (data) => {
    try {
      await addProjectType(data);
      message.success("Project Type added successfully.");
      loadProjectType();
    } catch (error) {
      message.error("Failed to add ProjectType.");
    }
  };

  const updateProjectType = async (id, data) => {
    try {
      await editProjectType(id, data);
      message.success("Project Type updated successfully.");
      loadProjectType();
    } catch (error) {
      message.error("Failed to update ProjectType.");
    }
  };

  const removeProjectType = async (id) => {
    try {
      await deleteProjectType(id);
      message.success("Project Type deleted successfully.");
      loadProjectType();
    } catch (error) {
      message.error("Failed to delete ProjectType.");
    }
  };

  return {
    projectType,
    loading,
    addNewProjectType,
    updateProjectType,
    removeProjectType,
  };
};

export default useProjectType;
