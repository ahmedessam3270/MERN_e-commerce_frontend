import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "../common";
import { useEffect, useState } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {
  const [productsInCartCount, setProductsInCartCount] = useState(0);
  const dispatch = useDispatch();
  async function fetchUserDetails() {
    const dataResponse = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  }

  async function fetchUserProductsInCartCount() {
    const dataResponse = await fetch(summaryApi.productsInCartCount.url, {
      method: summaryApi.productsInCartCount.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    setProductsInCartCount(dataApi?.data?.count);
  }

  useEffect(function () {
    // Displaying user Details
    fetchUserDetails();

    // Displaying user Cart Details
    fetchUserProductsInCartCount();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // to get the user details
          productsInCartCount, // current user cart status
          fetchUserProductsInCartCount,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
