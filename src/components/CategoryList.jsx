import { useEffect, useState } from "react";
import summaryApi from "../../common";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const categoryLoadingArr = new Array(12).fill(null);

  async function getCategoryProduct() {
    setIsLoading(true);
    const response = await fetch(summaryApi.categoryProduct.url);
    const responseData = await response.json();
    setIsLoading(false);
    setCategoryProduct(responseData.data);
  }

  useEffect(() => {
    getCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-2 justify-between overflow-y-auto scrollbar-hidden">
        {isLoading
          ? categoryLoadingArr.map((_, idx) => (
              <div
                key={idx}
                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
              ></div>
            ))
          : categoryProduct.map((product, idx) => (
              <Link
                to={`/category-product?category=${product?.category}`}
                className="cursor-pointer"
                key={idx}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 p-4 flex items-center justify-center">
                  <img
                    src={product?.productImages[0]}
                    alt={product?.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default CategoryList;
