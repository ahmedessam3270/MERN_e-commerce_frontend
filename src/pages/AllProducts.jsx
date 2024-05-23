import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summaryApi from "../../common";
import ProductCard from "../components/ProductCard";

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProductsData, setAllProductsData] = useState([]);

  async function displayAllProducts() {
    const response = await fetch(summaryApi.allProducts.url, {
      method: summaryApi.allProducts.method,
    });
    const dataResponse = await response.json();
    setAllProductsData(dataResponse?.data || []);
  }

  useEffect(function () {
    displayAllProducts();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-blue-600 text-blue-600 py-1 px-3 rounded-full hover:bg-blue-600 hover:text-white transition-all"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/*All products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-auto px-6">
        {allProductsData.map((product, idx) => {
          return (
            <ProductCard
              data={product}
              key={idx}
              fetchData={displayAllProducts}
            />
          );
        })}
      </div>
      {/*Upload product */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={displayAllProducts}
        />
      )}
    </div>
  );
}

export default AllProducts;
