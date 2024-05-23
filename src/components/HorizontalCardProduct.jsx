import { useContext, useEffect, useRef, useState } from "react";
import fetchHomeOneCategory from "../helpers/fetchHomeOneCategory";
import displayEgyCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

function HorizontalCardProduct({ category, heading }) {
  const [homeProductCategoryData, setHomeProductCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollElement = useRef();
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

  function scrollRight() {
    scrollElement.current.scrollLeft += 300;
  }
  function scrollLeft() {
    scrollElement.current.scrollLeft -= 300;
  }
  return (
    <div className="container mx-auto px-4 my-6 relative transition-all">
      <h2 className="font-semibold text-2xl py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-auto scrollbar-hidden transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {isLoading
          ? loadingList.map((product, idx) => (
              <div
                key={idx}
                className="w-full min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] h-36 bg-white shadow rounded-sm flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]  animate-pulse"></div>
                <div className="p-2 grid gap-2 w-full">
                  <h2 className="p-1 bg-slate-200 w-full animate-pulse rounded-full"></h2>
                  <p className="p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>

                  <div className="flex gap-3">
                    <p className="p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    <p className="p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                  </div>
                  <button className="px-4 rounded-full transition-all bg-slate-200 w-full animate-pulse"></button>
                </div>
              </div>
            ))
          : homeProductCategoryData.map((product) => (
              <Link
                to={`product/${product?._id}`}
                key={product?._id}
                className="w-full min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] h-36 bg-white shadow rounded-sm flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product?.productImages[0]}
                    alt={product?.category}
                    className=" object-scale-down h-full hover:scale-110 transition-all"
                  />
                </div>
                <div className="p-2 grid gap-1">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>

                  <div className="flex flex-col">
                    <p className="text-blue-500 font-medium">
                      {displayEgyCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayEgyCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className=" border text-sm border-blue-600 text-blue-600 px-4 w-32 rounded-full hover:bg-blue-600 hover:text-white transition-all"
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

export default HorizontalCardProduct;
