import React, { useState } from "react";
import DynamicForm from "../components/form/DynamicForm";
import toast from "react-hot-toast";
import { saveFormData } from "../utils/indexedDb";
import Button from "../components/form/Button";
import { Plus, ShoppingCart } from "lucide-react";
import PageHeader from "../components/PageHeader";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    coverImage: "",
    additionalImage1: "",
    additionalImage2: "",
    additionalImage3: "",
  });
  const [errors, setErrors] = useState({});

  const itemTypeOptions = [
    { value: "shirt", option: "Shirt" },
    { value: "pant", option: "Pant" },
    { value: "shoes", option: "Shoes" },
    { value: "other", option: "Other" },
  ];

  const validateForm = () => {
    let errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.type) {
      errors.type = "Type is required";
    }

    if (!formData.coverImage) {
      errors.coverImage = "Cover Image is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm())
      return toast.error("Please fill in all the required fields");

    try {
      await saveFormData(formData);
      toast.success("Product added successfully");
    } catch (error) {
      console.log("Error adding product", error);
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
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleFileChange = (file, name) => {
    setFormData({
      ...formData,
      [name]: file,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleDropdownChange = (option, name) => {
    setFormData({
      ...formData,
      [name]: option.value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const formOptions = [
    {
      title: "Product Details",
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
          error: errors.name,
        },
        {
          formType: "dropdown",
          label: "Item Type",
          name: "type",
          options: itemTypeOptions,
          required: true,
          value: formData.type,
          onChange: (option) => handleDropdownChange(option, "type"),
          error: errors.type,
        },
        {
          formType: "textarea",
          label: "Item Description",
          name: "description",
          type: "textarea",
          placeholder: "Enter Item Description",

          value: formData.description,
          onChange: handleInputChange,
        },
      ],
    },
    {
      title: "Product Images",
      fields: [
        {
          formType: "file",
          label: "Cover Image",
          name: "coverImage",
          type: "file",
          acceptedFiles: ".jpg, .jpeg, .png",
          required: true,
          value: formData.coverImage,
          onChange: (file) => handleFileChange(file, "coverImage"),
          error: errors.coverImage,
        },
        {
          formType: "file",
          label: "Additional Image 1",
          name: "additionalImage1",
          type: "file",
          value: formData.additionalImage1,
          acceptedFiles: ".jpg, .jpeg, .png",
          onChange: (file) => handleFileChange(file, "additionalImage1"),
        },
        {
          formType: "file",
          label: "Additional Image 2",
          name: "additionalImage2",
          type: "file",
          value: formData.additionalImage2,
          acceptedFiles: ".jpg, .jpeg, .png",
          onChange: (file) => handleFileChange(file, "additionalImage2"),
        },
        {
          formType: "file",
          label: "Additional Image 3",
          name: "additionalImage3",
          type: "file",
          value: formData.additionalImage3,
          acceptedFiles: ".jpg, .jpeg, .png",
          onChange: (file) => handleFileChange(file, "additionalImage3"),
        },
      ],
    },
  ];

  const headerButtons = [
    {
      label: "Add Product",
      icon: Plus,
      onClick: handleSubmit,
    },
  ];

  return (
    <div className="w-full h-full  flex flex-col items-center justify-start gap-2 ">
      <PageHeader
        title="Add Product"
        desc="Add a new product to your inventory"
        buttons={headerButtons}
      />

      <DynamicForm options={formOptions} submitText="Add Product" />
    </div>
  );
};

export default AddProduct;
