import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { toast } from "react-toastify";

import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayUploadedImpage from "./DisplayUploadedImage";
import summaryApi from "../../common";
function UploadProduct({ onClose, fetchData }) {
  const [productsData, setProductsData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  function handleOnChange(e) {
    const { name, value } = e.target;
    setProductsData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  }

  async function handleUploadProductImage(e) {
    const productImageFile = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(productImageFile);
    setProductsData((data) => {
      return {
        ...data,
        productImages: [...data.productImages, uploadImageCloudinary.url],
      };
    });
  }

  async function handleDeleteProductImage(idx) {
    const newProductImages = [...productsData.productImages];
    newProductImages.splice(idx, 1);
    setProductsData((data) => {
      return { ...data, productImages: [...newProductImages] };
    });
  }

  async function handleUploadSubmit(e) {
    e.preventDefault();
    const response = await fetch(summaryApi.uploadProduct.url, {
      method: summaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productsData),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  }
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex items-center justify-center ">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-lg font-bold">Upload Product</h2>
          <button
            className="block w-fit text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </button>
        </div>

        <form
          className="grid p-4 gap-2 h-full overflow-y-auto pb-5"
          onSubmit={handleUploadSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            name="productName"
            required
            placeholder="Enter product name..."
            value={productsData.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            required
            placeholder="Enter brand name..."
            value={productsData.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            name="category"
            id="category"
            required
            onChange={handleOnChange}
            value={productsData.category}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="" hidden>
              Select Category
            </option>
            {productCategory.map((el) => (
              <option value={el.value} key={el.id}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-600 flex justify-center items-center flex-col gap-1">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  className="hidden"
                  required
                  id="uploadImageInput"
                  onChange={handleUploadProductImage}
                />
              </div>
            </div>
          </label>

          <div>
            {productsData?.productImages[0] ? (
              <div className="flex items-center gap-2">
                {productsData?.productImages.map((el, idx) => {
                  return (
                    <div className="relative group" key={el}>
                      <img
                        src={el}
                        alt="product image"
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setFullScreenImage(el);
                          setOpenFullScreenImage(true);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-0.5 text-white bg-red-600 rounded-full cursor-pointer hidden group-hover:block"
                        onClick={() => handleDeleteProductImage(idx)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-red-500">
                *Please upload product images
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            placeholder="Enter price..."
            value={productsData.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            required
            placeholder="Enter Selling price..."
            value={productsData.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            name="description"
            id="description"
            className="h-28 resize-none p-1.5 bg-slate-100 border"
            placeholder="Enter product description..."
            onChange={handleOnChange}
            rows={3}
            value={productsData.description}
          ></textarea>
          <button className="px-3 py-2 bg-slate-600 hover:bg-slate-700 rounded-full text-white mb-10 mt-5">
            Upload Product
          </button>
        </form>
      </div>

      {/*DISPLAY IMAGE IN FULL SCREEN */}

      {openFullScreenImage && (
        <DisplayUploadedImpage
          imgUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
}

export default UploadProduct;
