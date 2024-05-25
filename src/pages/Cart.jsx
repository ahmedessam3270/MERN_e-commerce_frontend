import { useContext, useEffect, useState } from "react";
import summaryApi from "../../common";
import Context from "../context";
import displayEgyCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(Context);
  const loadingCart = new Array(context?.productsInCartCount).fill(null);

  const totalQuantity = cartData.reduce(
    (previousValue, currVal) => previousValue + currVal?.quantity,
    0
  );

  const totalCartPrice = cartData.reduce(
    (prevValue, currVal) =>
      prevValue + currVal?.productId?.sellingPrice * currVal?.quantity,
    0
  );

  async function fetchCartProducts() {
    setIsLoading(true);
    const response = await fetch(summaryApi.viewCart.url, {
      method: summaryApi.viewCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.success) {
      setCartData(responseData.data);
    }
  }

  async function changeQuantity(id, qty, type) {
    if (qty === 1 && type === "decrease") return;
    const response = await fetch(summaryApi.updateCartProduct.url, {
      method: summaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity:
          (type === "increase" && qty + 1) || (type === "decrease" && qty - 1),
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchCartProducts();
    }
  }

  async function deleteCartProduct(id) {
    const response = await fetch(summaryApi.deleteCartProduct.url, {
      method: summaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchCartProducts();
      context.fetchUserProductsInCartCount();
    }
  }

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center text-lg my-3">
        {cartData.length === 0 && !isLoading && (
          <p className="bg-white py-5 font-bold">
            No Products in the cart yet!
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/** View Cart Products */}
        <div className="w-full lg:max-w-3xl">
          {isLoading
            ? loadingCart.map((el, idx) => (
                <div
                  key={idx}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 rounded grid grid-cols-[96px,1fr] sm:grid-cols-[128px,1fr] animate-pulse"
                >
                  <div className="w-24 h-32 sm:w-32 sm:h-32 bg-slate-300"></div>
                  <div className="px-2 py-2 sm:px-4 sm:py-2">
                    <div className="h-4 bg-slate-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-300 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-slate-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-slate-300 rounded w-1/3"></div>
                  </div>
                </div>
              ))
            : cartData.map((product) => (
                <div
                  key={product?.productId?._id}
                  className="h-32 w-full bg-white border border-slate-300 my-2 rounded grid grid-cols-[96px,1fr] sm:grid-cols-[128px,1fr]"
                >
                  <div className="w-24 h-32 sm:w-32 sm:h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImages[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-2 py-2 sm:px-4 sm:py-2 relative">
                    {/*Delete product */}
                    <div
                      className="absolute right-1 text-red-600 rounded-full hover:text-white hover:bg-red-600 cursor-pointer p-2 transition-all"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-sm sm:text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500 text-xs sm:text-sm">
                      {product?.productId?.category}
                    </p>
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between">
                      <p className="text-blue-600 font-medium text-sm sm:text-lg">
                        {displayEgyCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-sm sm:text-lg">
                        {displayEgyCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mt-1">
                      <button
                        className={`border ${
                          product.quantity === 1
                            ? "cursor-not-allowed border-slate-600 text-slate-200"
                            : "border-blue-600 text-blue-600 hover:bg-blue-600"
                        }  hover:text-white w-6 h-6 flex justify-center items-center rounded`}
                        onClick={() =>
                          changeQuantity(
                            product?._id,
                            product?.quantity,
                            "decrease"
                          )
                        }
                      >
                        -
                      </button>
                      <span className="text-sm sm:text-base">
                        {product?.quantity}
                      </span>
                      <button
                        className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          changeQuantity(
                            product?._id,
                            product?.quantity,
                            "increase"
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/** Products Summary */}
        <div className="mt-5 lg:mt-0 w-full lg:max-w-sm">
          {isLoading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 rounded flex flex-col items-center justify-center">
              <AiOutlineLoading className="animate-spin text-4xl text-blue-600" />
              <p className="mt-2 text-slate-600">Loading...</p>
            </div>
          ) : (
            <div className="h-36 bg-white border border-slate-300 rounded flex flex-col">
              <h2 className="text-white bg-slate-700 px-4 py-1 rounded-t">
                Summary
              </h2>
              <div className="flex items-center justify-between px-4 font-medium text-sm sm:text-lg text-slate-600 mt-1">
                <p>Quantity</p>
                <p>{totalQuantity}</p>
              </div>
              <div className="flex items-center justify-between px-4 font-medium text-sm sm:text-lg text-slate-600 mt-1">
                <p>Total Price</p>
                <p>{displayEgyCurrency(totalCartPrice)}</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 rounded-b p-2 text-white w-full mt-auto text-sm sm:text-base">
                Go To the Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
