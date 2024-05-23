import { useEffect, useState } from "react";

import image1 from "../asset/banner/img3.jpg";
import image2 from "../asset/banner/img4.jpg";

import image1Mobile from "../asset/banner/img3_mobile.jpg";
import image2Mobile from "../asset/banner/img4_mobile.jpg";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

function BannerProduct() {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopBannerImages = [image1, image2];
  const mobileBannerImages = [image1Mobile, image2Mobile];

  function displayNextImage() {
    if (desktopBannerImages.length - 1 > currentImage) {
      setCurrentImage((curr) => curr + 1);
    }
  }
  function displayPrevImage() {
    if (currentImage !== 0) {
      setCurrentImage((curr) => curr - 1);
    }
  }

  useEffect(
    function () {
      const imageDisplayInterval = setInterval(function () {
        if (desktopBannerImages.length - 1 > currentImage) {
          displayNextImage();
        } else {
          setCurrentImage(0);
        }
      }, 5000);

      return function () {
        clearInterval(imageDisplayInterval);
      };
    },
    [currentImage]
  );
  return (
    <div className="container mx-auto px-4">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute hidden z-10 h-full w-full md:flex items-center">
          <div className="flex justify-between w-full text-2xl">
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={displayPrevImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={displayNextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/*Desktop and Tablet version*/}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopBannerImages.map((imageUrl) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all"
              key={imageUrl}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                alt="banner for the app"
                className="w-full h-full rounded"
              />
            </div>
          ))}
        </div>

        {/*Mobile version*/}
        <div className="flex md:hidden h-full w-full overflow-hidden">
          {mobileBannerImages.map((imageUrl) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all"
              key={imageUrl}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                alt="banner for the app"
                className="w-full h-full rounded object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerProduct;
