import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import useProjectType from "../hooks/useProjectType";
import ProjectTypeForm from "../forms/ProjectTypeForm";

const ProjectTypes = () => {
  const {
    projectType,
    loading,
    addNewProjectType,
    updateProjectType,
    removeProjectType,
  } = useProjectType();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({ Project_Type_Name: "" });
  const [editingprojectType, setEditingProjectType] = useState(null);

  const handleAdd = () => {
    setFormData({ Project_Type_Name: "" });
    setEditingProjectType(null);
    setIsModalVisible(true);
  };

  const handleEdit = (projectType) => {
    setFormData({ Project_Type_Name: projectType.Project_Type_Name });
    setEditingProjectType(projectType);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await removeProjectType(id);
  };

  const handleFormSubmit = async () => {
    if (!formData.Project_Type_Name) {
      return;
    }

    if (editingprojectType) {
      await updateProjectType(editingprojectType.id, formData);
    } else {
      await addNewProjectType(formData);
    }
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, Project_Type_Name: e.target.value });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "Project_Type_Name",
      key: "Project_Type_Name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (projectType) => (
        <>
          <Button type="link" onClick={() => handleEdit(projectType)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(projectType.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Project Types</h2>
      <div className="add-button-container">
        <Button type="primary" onClick={handleAdd}>
          + Add Project Type
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={projectType}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingprojectType ? "Edit Project Type" : "Add Project Type"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleFormSubmit}
        okText={editingprojectType ? "Save Changes" : "Add Project Type"}
      >
        <ProjectTypeForm
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </Modal>
    </div>
  );
};
export default ProjectTypes;
