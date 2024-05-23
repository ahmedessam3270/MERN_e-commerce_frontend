import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import { useEffect, useState } from "react";
import VerticalCard from "../components/VerticalCard";
import summaryApi from "../../common";

function CategoryProduct() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch(summaryApi?.filterProduct?.url, {
        method: summaryApi?.filterProduct?.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      const responseData = await response.json();
      setData(responseData?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectCategory(e) {
    const { value, checked } = e.target;
    setSelectCategory((category) => ({
      ...category,
      [value]: checked,
    }));
  }

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    );

    setFilterCategoryList(arrayOfCategory);

    // Format for URL change when changes happen to the checkbox
    const urlFormat = arrayOfCategory.map((el) => `category=${el}`);
    navigate(`/category-product?${urlFormat.join("&&")}`);
  }, [selectCategory]);

  async function handleOnChangeSortBy(e) {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((prevData) =>
        [...prevData].sort((a, b) => a.sellingPrice - b.sellingPrice)
      );
    } else if (value === "desc") {
      setData((prevData) =>
        [...prevData].sort((a, b) => b.sellingPrice - a.sellingPrice)
      );
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/* Desktop version */}
      <div className="hidden lg:grid lg:grid-cols-[200px,1fr]">
        {/* Left hand side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"desc"}
                  checked={sortBy === "desc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category) => (
                <div className="flex items-center gap-3" key={category?.id}>
                  <input
                    type="checkbox"
                    name={"category"}
                    value={category?.value}
                    id={category?.value}
                    checked={selectCategory[category?.value]}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={category?.value}>{category?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>
        {/* Right hand side (product) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results: {data?.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-auto">
            {isLoading ? (
              <div>Loading...</div>
            ) : data.length !== 0 ? (
              <VerticalCard data={data} isLoading={isLoading} />
            ) : (
              <p>No products found for this category.</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="lg:hidden">
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results: {data?.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-auto">
            {isLoading ? (
              <div>Loading...</div>
            ) : data.length !== 0 ? (
              <VerticalCard data={data} isLoading={isLoading} />
            ) : (
              <p>No products found for this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
