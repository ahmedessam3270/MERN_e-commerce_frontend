import { CgClose } from "react-icons/cg";

function DisplayUploadedImage({ imgUrl, onClose }) {
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <button
          className="block w-fit text-2xl hover:text-red-600 cursor-pointer ml-auto"
          onClick={onClose}
        >
          <CgClose />
        </button>
        <div className="flex justify-center p-4 max-h-[80vh] max-w-[80vh]">
          <img src={imgUrl} alt="product image" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default DisplayUploadedImage;
