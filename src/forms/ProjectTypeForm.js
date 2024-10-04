import React from "react";
import { Input, Form } from "antd";

const ProjectTypeForm = ({ formData, handleInputChange }) => (
  <Form layout="vertical">
    <Form.Item label="Project Type" required>
      <Input
        placeholder="Enter Project Type"
        value={formData.Project_Type_Name}
        onChange={handleInputChange}
      />
    </Form.Item>
  </Form>
);

export default ProjectTypeForm;
