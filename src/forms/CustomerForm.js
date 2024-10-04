import React from "react";
import { Input, Form } from "antd";

const CustomerForm = ({ formData, handleInputChange }) => (
  <Form layout="vertical">
    <Form.Item label="Customer Name" required>
      <Input
        placeholder="Enter customer name"
        value={formData.Customer_Name}
        onChange={handleInputChange}
      />
    </Form.Item>
  </Form>
);

export default CustomerForm;
