import React, { useEffect, useState } from "react";
import { getProducts } from "../utils/indexedDb";
import ModalComponent from "../components/ModalComponent";
import { ArrowLeft, View } from "lucide-react";
import Button from "../components/form/Button";

const ViewItem = ({ title, content }) => {
  return (
    <div className="flex flex-col items-start justify-center w-full">
      <h4 className="font-medium ">{title}:</h4>
      <p className="text-xl">{content}</p>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  console.log("products from useEffect", products);

  return (
    <div className="bg-white w-full max-w-md flex flex-col gap-2 shadow p-4 rounded-lg m-4 max-h-[90vh]">
      {selectedItem && (
        <ModalComponent
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          title={`Product Details: ${selectedItem?.name}`}
        >
          <div className="w-full flex flex-col gap-2  overflow-y-auto ">
            <ViewItem title="Name" content={selectedItem.name} />
            <ViewItem title="Description" content={selectedItem.description} />
            <ViewItem
              title="Type"
              content={
                selectedItem?.type.charAt(0).toUpperCase() +
                selectedItem?.type.slice(1)
              }
            />
          </div>
        </ModalComponent>
      )}

      <div className="text-start w-full">
        <h3 className="font-medium text-2xl">Products</h3>
        <p className="text-secondary">View and manage your products</p>
      </div>

      <div className="w-full flex flex-col gap-2  overflow-y-auto">
        {products.map((item) => (
          <div
            onClick={() => handleItemClick(item)}
            key={item.id}
            className="w-full flex flex-row items-center justify-start gap-2 hover:bg-hover rounded-lg p-2 cursor-pointer active:transform-y-0.5 transition-transform"
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <Button
        label="Add Product"
        navTo="/"
        icon={ArrowLeft}
        variant="secondary"
        className="w-full"
      />
    </div>
  );
};

export default Products;
