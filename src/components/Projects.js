import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import useProjects from "../hooks/useProject";
import useCustomers from "../hooks/useCustomers";
import useProjectType from "../hooks/useProjectType";
import ProjectForm from "../forms/ProjectForm";

const Projects = () => {
  const { projects, loading, addNewProject, updateProject, removeProject } =
    useProjects();
  const { customers } = useCustomers();
  const { projectType } = useProjectType();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    Project_Reference_Number: "",
    Project_Name_: "",
    project_type_id: "",
    Status: "",
    customer_id: "",
  });
  const [editingProject, setEditingProject] = useState(null);

  const handleAdd = () => {
    setFormData({
      Project_Reference_Number: "",
      Project_Name_: "",
      project_type_id: "",
      Status: "",
      customer_id: "",
    });
    setEditingProject(null);
    setIsModalVisible(true);
  };

  const handleEdit = (project) => {
    setFormData({
      Project_Reference_Number: project.Project_Reference_Number,
      Project_Name_: project.Project_Name_,
      project_type_id: project.project_type_id,
      Status: project.Status,
      customer_id: project.customer_id,
    });
    setEditingProject(project);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await removeProject(id);
  };

  const handleFormSubmit = async () => {
    if (!formData.Project_Reference_Number || !formData.Project_Name_) {
      return;
    }

    if (editingProject) {
      await updateProject(editingProject.id, formData);
    } else {
      await addNewProject(formData);
    }
    setIsModalVisible(false);
  };

  const handleInputChange = (newData) => {
    setFormData(newData);
  };

  const columns = [
    {
      title: "Reference Number",
      dataIndex: "Project_Reference_Number",
      key: "Project_Reference_Number",
    },
    {
      title: "Project Name",
      dataIndex: "Project_Name_",
      key: "Project_Name_",
    },
    {
      title: "Project Type",
      dataIndex: "project_type_id",
      key: "project_type_id",
      render: (type) => {
        const projectTypeName = projectType.find(
          (t) => t.id === type
        )?.Project_Type_Name;
        return projectTypeName || "Unknown";
      },
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Customer",
      dataIndex: "customer_id",
      key: "customer_id",
      render: (customer) => {
        const customerName = customers.find(
          (c) => c.id === customer
        )?.Customer_Name;
        return customerName || "Unknown"; // Display name, fallback to "Unknown" if not found
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (project) => (
        <>
          <Button type="link" onClick={() => handleEdit(project)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(project.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Projects</h2>
      <div className="add-button-container">
        <Button type="primary" onClick={handleAdd}>
          + Add Project
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={projects}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleFormSubmit}
        okText={editingProject ? "Save Changes" : "Add Project"}
      >
        <ProjectForm
          formData={formData}
          handleInputChange={handleInputChange}
          customers={customers}
          projectTypes={projectType}
        />
      </Modal>
    </div>
  );
};

export default Projects;
