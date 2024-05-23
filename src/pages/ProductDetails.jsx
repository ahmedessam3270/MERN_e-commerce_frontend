import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

import summaryApi from "../../common";
import displayEgyCurrency from "../helpers/displayCurrency";
import DisplayPopularProducts from "../components/DisplayPopularProducts";
import addToCart from "../helpers/addToCart";
import Context from "../context";
function ProductDetails() {
  const [productDetailsData, setProductDetailsData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomedImageCoordinate, setZoomedImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [isEnteringImageZoom, setIsEnteringImageZoom] = useState(false);

  const { productId } = useParams();

  const productImageListLoading = new Array(4).fill(null);

  async function fetchProductDetails() {
    setIsLoading(true);
    const response = await fetch(summaryApi.productDetails.url, {
      method: summaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const dataResponse = await response.json();
    setProductDetailsData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImages[0]);
    setIsLoading(false);
  }

  useEffect(
    function () {
      fetchProductDetails();
    },
    [productId]
  );

  function handleMouseEnterProductImage(imageUrl) {
    setActiveImage(imageUrl);
  }

  const { fetchUserProductsInCartCount } = useContext(Context);
  const navigate = useNavigate();
  async function handleAddToCart(e, id) {
    await addToCart(e, id);
    await fetchUserProductsInCartCount();
  }
  async function handleBuy(e, id) {
    await addToCart(e, id);
    await fetchUserProductsInCartCount();
    navigate("/cart");
  }

  const handleZoomImage = function (e) {
    setIsEnteringImageZoom(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomedImageCoordinate({ x, y });
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/*Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt={productDetailsData?.productName}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={() => setIsEnteringImageZoom(false)}
            />
            {/*Product zoom */}
            {isEnteringImageZoom && (
              <div className="hidden lg:block min-w-[500px] min-h-[500px] overflow-hidden bg-slate-200 p-1 absolute -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomedImageCoordinate.x * 100}% ${
                      zoomedImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {isLoading ? (
              <div className="flex gap-2 lg:flex-col overflow-auto scrollbar-hidden h-full">
                {productImageListLoading.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-auto scrollbar-hidden h-full">
                {productDetailsData.productImages.map((imageUrl) => (
                  <div
                    key={imageUrl}
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                  >
                    <img
                      src={imageUrl}
                      onMouseEnter={() =>
                        handleMouseEnterProductImage(imageUrl)
                      }
                      onClick={() => handleMouseEnterProductImage(imageUrl)}
                      alt={productDetailsData?.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/*Product Details */}
        {isLoading ? (
          <div className="grid w-full gap-4 my-4">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8  px-2 rounded-full w-full"></p>
            <h2 className="h-6 lg:h-8 bg-slate-200 animate-pulse w-full rounded"></h2>
            <p className="bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full rounded"></p>

            <div className="flex w-full animate-pulse bg-slate-200 h-6 lg:h-8 items-center gap-1 rounded my-4"></div>

            <div className="flex items-center gap-4 w-full  h-6 lg:h-8  my-4">
              <p className=" bg-slate-200 animate-pulse w-full px-14 rounded py-3"></p>
              <p className="bg-slate-200 animate-pulse w-full px-14 rounded py-3"></p>
            </div>
            <div className="flex w-full items-center gap-3 my-2">
              <button className=" h-6 lg:h-8 w-full bg-slate-200 rounded animate-pulse"></button>
              <button className=" h-6 lg:h-8 w-full bg-slate-200 rounded animate-pulse"></button>
            </div>
            <div>
              <p className="bg-slate-200 w-full rounded animate-pulse h-6 lg:h-8 my-1"></p>
              <p className="bg-slate-200 w-full rounded animate-pulse h-6 lg:h-8 my-1"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-blue-200 text-blue-600 px-2 rounded-full w-fit">
              {productDetailsData?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {productDetailsData?.productName}
            </h2>
            <p className="capitalize text-slate-400">
              {productDetailsData?.category}
            </p>

            <div className="flex text-blue-600 items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-4 text-2xl font-medium my-1">
              <p className="text-blue-600">
                {displayEgyCurrency(productDetailsData?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayEgyCurrency(productDetailsData?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-blue-600 rounded px-3 py-1 min-w-[100px] font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={(e) => handleBuy(e, productDetailsData?._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-blue-600 rounded px-3 py-1 min-w-[100px] font-medium hover:text-blue-600 bg-blue-600 text-white hover:bg-white"
                onClick={(e) => handleAddToCart(e, productDetailsData?._id)}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p>{productDetailsData?.description}</p>
            </div>
          </div>
        )}
      </div>

      {productDetailsData?.category && (
        <DisplayPopularProducts
          category={productDetailsData?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
}

export default ProductDetails;
