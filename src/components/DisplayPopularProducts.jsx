import { useContext, useEffect, useState } from "react";
import fetchHomeOneCategory from "../helpers/fetchHomeOneCategory";
import displayEgyCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

function DisplayPopularProducts({ category, heading }) {
  const [homeProductCategoryData, setHomeProductCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadingList = new Array(12).fill(null);

  const { fetchUserProductsInCartCount } = useContext(Context);
  async function handleAddToCart(e, id) {
    await addToCart(e, id);
    fetchUserProductsInCartCount();
  }

  async function fetchCategoryData() {
    setIsLoading(true);
    const categoryProduct = await fetchHomeOneCategory(category);
    setIsLoading(false);
    setHomeProductCategoryData(categoryProduct?.data);
  }

  useEffect(function () {
    fetchCategoryData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative transition-all">
      <h2 className="font-semibold text-2xl py-4 text-center lg:text-left">
        {heading}
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-auto scrollbar-hidden transition-all">
        {isLoading
          ? loadingList.map((product, idx) => (
              <div
                key={idx}
                className="w-full min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px]  bg-white shadow rounded-sm"
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-ellipsis line-clamp-1 animate-pulse py-2 bg-slate-200 rounded-full"></h2>
                  <p className="capitalize animate-pulse py-2 bg-slate-200 rounded-full"></p>

                  <div className="flex gap-3">
                    <p className="font-medium animate-pulse py-2 bg-slate-200 rounded-full w-full"></p>
                    <p className="line-through animate-pulse py-2 bg-slate-200 rounded-full w-full"></p>
                  </div>
                  <button className="animate-pulse border py-2 bg-slate-200  px-2 rounded-full  transition-all my-2"></button>
                </div>
              </div>
            ))
          : homeProductCategoryData.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                key={product?._id}
                className="w-full min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] mx-auto bg-white shadow rounded-sm"
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product?.productImages[0]}
                    alt={product?.category}
                    className=" object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-2 grid">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>

                  <div className="flex justify-between">
                    <p className="text-blue-500 font-medium">
                      {displayEgyCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayEgyCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className=" border text-base border-blue-600 text-blue-600 px-2 rounded-full hover:bg-blue-600 hover:text-white transition-all my-2"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default DisplayPopularProducts;
