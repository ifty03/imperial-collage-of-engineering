import { server_url } from "../Config/API";

export const singleImageUpload = async (formData, setMyImageUrl,myImageUrl, type="single") => {
  const imageBaseUrl = `${server_url}/upload/single-image-upload`;

 console.log(myImageUrl)
  fetch(imageBaseUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        if(type==="single"){
          setMyImageUrl(data.url);
        }else{
          setMyImageUrl([...myImageUrl, data.url]);
        }
      }
    });
};
