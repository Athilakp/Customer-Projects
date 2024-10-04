import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const ProjectForm = ({
  formData,
  handleInputChange,
  customers,
  projectTypes,
}) => (
  <Form layout="vertical">
    <Form.Item label="Project Reference Number" required>
      <Input
        placeholder="Enter project reference number"
        value={formData.Project_Reference_Number}
        onChange={(e) =>
          handleInputChange({
            ...formData,
            Project_Reference_Number: e.target.value,
          })
        }
      />
    </Form.Item>

    <Form.Item label="Project Name" required>
      <Input
        placeholder="Enter project name"
        value={formData.Project_Name_}
        onChange={(e) =>
          handleInputChange({ ...formData, Project_Name_: e.target.value })
        }
      />
    </Form.Item>

    <Form.Item label="Project Type" required>
      <Select
        value={formData.project_type_id}
        onChange={(value) =>
          handleInputChange({ ...formData, project_type_id: value })
        }
      >
        {projectTypes.map((type) => (
          <Option key={type.id} value={type.id}>
            {type.Project_Type_Name}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item label="Status" required>
      <Input
        placeholder="Enter project status"
        value={formData.Status}
        onChange={(e) =>
          handleInputChange({ ...formData, Status: e.target.value })
        }
      />
    </Form.Item>

    <Form.Item label="Customer" required>
      <Select
        value={formData.customer_id}
        onChange={(value) =>
          handleInputChange({ ...formData, customer_id: value })
        }
      >
        {customers.map((customer) => (
          <Option key={customer.id} value={customer.id}>
            {customer.Customer_Name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </Form>
);

export default ProjectForm;
