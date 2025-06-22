import React, { useEffect, useState } from "react";
import { clearDb, getProducts } from "../utils/indexedDb";
import ModalComponent from "../components/ModalComponent";
import { ArrowLeft, View } from "lucide-react";
import Button from "../components/form/Button";
import PageHeader from "../components/PageHeader";
import toast from "react-hot-toast";

const ViewItem = ({ title, content }) => {
  return (
    <div className="flex flex-col items-start justify-center w-full">
      <h4 className="font-medium ">{title}:</h4>
      <p className="text-xl">{content || "NA"}</p>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
    const arr = getImageArray(item);
    setImagesArray(arr);
    console.log("arr", arr);
  };

  const handleClearInventory = async () => {
    await clearDb();
    setProducts([]);
    setConfirm(false);
    toast.success("Inventory cleared successfully");
  };

  const getImageUrl = (file) => {
    if (!file || !file.type?.startsWith("image/")) return null;
    return URL.createObjectURL(file);
  };

  const getImageArray = (item) => {
    const images = [
      { file: item.coverImage, title: "Cover Image" },
      { file: item.additionalImage1, title: "Additional Image 1" },
      { file: item.additionalImage2, title: "Additional Image 2" },
      { file: item.additionalImage3, title: "Additional Image 3" },
    ];

    return images
      .filter((image) => image.file && image.file.type?.startsWith("image/"))
      .map(({ file, title }) => {
        return {
          title,
          imageUrl: getImageUrl(file),
        };
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setImagesArray([]);
    setCurrentIndex(0);
  };

  const handleEnquire = () => {};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  const confirmModalButtons = [
    {
      label: "Clear Inventory",
      variant: "danger",
      onClick: handleClearInventory,
    },
  ];

  const headerButtons = [
    {
      label: "Clear Inventory",
      variant: "danger",
      onClick: () => {
        setConfirm(true);
      },
    },
  ];

  const modalButtons = [
    {
      label: "Enquire",
      onClick: handleEnquire,
    },
  ];

  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);

  return (
    <div className="w-full h-full  flex flex-col items-center justify-start gap-2">
      <ModalComponent
        isOpen={confirm}
        setIsOpen={setConfirm}
        title="Clear Inventory?"
        message="Doing this will delete the entire IndexedDB Database. Your inventory will be lost. This cannot be undone. Are you sure you want to continue?"
        buttons={confirmModalButtons}
      />

      {selectedItem && (
        <ModalComponent
          isOpen={modalOpen}
          onClose={handleCloseModal}
          setIsOpen={setModalOpen}
          title={selectedItem?.name}
          buttons={modalButtons}
        >
          <div className="w-full h-[50vh] flex flex-col gap-2 items-center justify-between overflow-y-auto ">
            <div className="relative w-full h-[250px] flex items-center justify-center bg-gray-100 rounded">
              {imagesArray.length > 0 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow"
                    onClick={prevSlide}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <img
                    src={imagesArray[currentIndex].imageUrl}
                    alt={imagesArray[currentIndex].title}
                    className="h-full object-contain rounded"
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow rotate-180"
                    onClick={nextSlide}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
                    {imagesArray[currentIndex].title}
                  </div>
                </>
              )}
            </div>
            <div className="space-y-2 w-full">
              <ViewItem title="Product Name" content={selectedItem.name} />
              <ViewItem
                title="Product Description"
                content={selectedItem.description}
              />
              <ViewItem
                title="Product Type"
                content={
                  selectedItem?.type.charAt(0).toUpperCase() +
                  selectedItem?.type.slice(1)
                }
              />
            </div>
          </div>
        </ModalComponent>
      )}

      <PageHeader
        title={"Products"}
        desc={"View all the products in your inventory"}
        buttons={headerButtons}
      />

      <div className="w-full flex flex-col gap-2  overflow-y-auto">
        {products.map((item) => {
          const imageUrl = getImageUrl(item.coverImage);

          return (
            <div
              onClick={() => handleItemClick(item)}
              key={item.id}
              className="w-full flex flex-row items-center justify-start gap-2 hover:bg-hover rounded-lg p-2 cursor-pointer active:transform-y-0.5 transition-transform"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Cover Preview"
                  className="size-20 object-cover rounded-md"
                  onLoad={() => URL.revokeObjectURL(imageUrl)}
                />
              ) : (
                <div className="size-20 bg-gray-200 rounded" />
              )}
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
