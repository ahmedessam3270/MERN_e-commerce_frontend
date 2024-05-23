import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import EditProduct from "./EditProduct";
import displayEgyCurrency from "../helpers/displayCurrency";
function ProductCard({ data, fetchData }) {
  const { productImages, productName } = data;
  const [openEditProduct, setOpenEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="flex items-center justify-center w-32 h-32">
          <img
            src={productImages[0]}
            alt="product view"
            width={120}
            height={120}
            className="object-fill h-full mx-auto"
          />
        </div>
        <h2 className="line-clamp-2 text-ellipsis">{productName}</h2>
        <div>
          <p className="font-semibold">
            {displayEgyCurrency(data.sellingPrice)}
          </p>
          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setOpenEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>
      {openEditProduct && (
        <EditProduct
          onClose={() => setOpenEditProduct(false)}
          productData={data}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

export default ProductCard;
