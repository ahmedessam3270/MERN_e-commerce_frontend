const REACT_APP_CLOUD_NAME_CLOUDINARY = "dldzyhzil";
const url = `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

async function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });
  return dataResponse.json();
}

export default uploadImage;
