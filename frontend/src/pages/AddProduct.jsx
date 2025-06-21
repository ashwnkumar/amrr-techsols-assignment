import React, { useState } from "react";
import DynamicForm from "../components/form/DynamicForm";
import toast from "react-hot-toast";
import { saveFormData } from "../utils/indexedDb";
import Button from "../components/form/Button";
import { Plus, ShoppingCart } from "lucide-react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    coverImage: "",
    additionalImages: [],
  });

  const itemTypeOptions = [
    { value: "shirt", option: "Shirt" },
    { value: "pant", option: "Pant" },
    { value: "shoes", option: "Shoes" },
    { value: "other", option: "Other" },
  ];

  const handleSubmit = async () => {
    try {
      await saveFormData(formData);
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("There was an error adding the product");
    } finally {
      setFormData({
        name: "",
        description: "",
        type: "",
        coverImage: "",
        additionalImages: [],
      });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (file) => {
    setFormData({
      ...formData,
      coverImage: file,
    });
  };

  const handleDropdownChange = (option, name) => {
    setFormData({
      ...formData,
      [name]: option.value,
    });
  };
  const formOptions = [
    {
      fields: [
        {
          formType: "input",
          label: "Item Name",
          name: "name",
          type: "text",
          placeholder: "Enter Item Name",
          required: true,
          value: formData.name,
          onChange: handleInputChange,
        },
        {
          formType: "dropdown",
          label: "Item Type",
          name: "type",
          options: itemTypeOptions,
          required: true,
          value: formData.type,
          onChange: (option) => handleDropdownChange(option, "type"),
        },
        {
          formType: "textarea",
          label: "Item Description",
          name: "description",
          type: "textarea",
          placeholder: "Enter Item Description",
          required: true,
          value: formData.description,
          onChange: handleInputChange,
        },
        {
          formType: "file",
          label: "Cover Image",
          name: "coverImage",
          type: "file",
          acceptedFiles: ".jpg, .jpeg, .png",
          required: true,
          onChange: handleFileChange,
        },
        {
          formType: "file",
          label: "Additional Images",
          name: "additionalImages",
          type: "file",
          required: true,
          onChange: handleFileChange,
        },
      ],
    },
  ];
  return (
    <div className="bg-white w-full max-w-md flex flex-col items-center justify-center gap-2 shadow p-4 rounded-lg m-4 max-h-[90vh]">
      <div className="text-start w-full">
        <h3 className="font-medium text-2xl">Add Items</h3>
        <p className="text-secondary">Add your items here</p>
      </div>
      <div className="overflow-auto w-full">
        <DynamicForm options={formOptions} submitText="Add Product" />
      </div>
      <Button
        label={"Add Product"}
        icon={Plus}
        navTo={"/products"}
        className="w-full"
      />
      <Button
        label={"View Products"}
        variant="outline"
        icon={ShoppingCart}
        navTo={"/products"}
        className="w-full"
      />
    </div>
  );
};

export default AddProduct;
