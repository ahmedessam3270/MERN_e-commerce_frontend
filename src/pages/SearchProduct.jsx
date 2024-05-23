import { useLocation } from "react-router-dom";
import summaryApi from "../../common";
import { useEffect, useState } from "react";
import VerticalCard from "../components/VerticalCard";

function SearchProduct() {
  const [searchedData, setSearchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = useLocation();

  async function fetchSearchedProduct() {
    setIsLoading(true);
    const response = await fetch(summaryApi.searchProduct.url + query.search);
    const responseData = await response.json();
    console.log(responseData);
    setIsLoading(false);
    setSearchedData(responseData.data);
  }

  useEffect(
    function () {
      fetchSearchedProduct();
    },
    [query]
  );
  return (
    <div className="container mx-auto p-4">
      {isLoading && <p>Loading...</p>}

      <p className="text-lg font-semibold my-3 text-center md:text-left">
        Search Results : {searchedData.length}
      </p>
      {searchedData.length === 0 && !isLoading && (
        <p className="bg-white text-lg text-center p-4">No Data Found...</p>
      )}

      {searchedData.length !== 0 && !isLoading && (
        <VerticalCard isLoading={isLoading} data={searchedData} />
      )}
    </div>
  );
}

export default SearchProduct;
