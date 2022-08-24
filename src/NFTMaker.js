import axios from "axios";

export const makeNFT = (textual) => {

  if(textual.length < 0) {
    console.log("Text is empty");
    return;
  }
  //   const instance = axios.create({
  //     baseURL: "https://thentic.tech/api/nfts/contract/",
  //     timeout: 1000,
  //     headers: { "Content-Type": "application/json" },
  //     params: {
  //       key: "K2KaJxb888EcdgtfhmCVHGPxs5Zh16SS",
  //       chain_id: "5",
  //       name: "Expression of Peace",
  //       short_name: "An expression of peace, from you to world",
  //     },
  //   });

  // const payload =

  axios({
    method: "post",
    url: "https://thentic.tech/api/nfts/contract",
    data: {
      key: "K2KaJxb888EcdgtfhmCVHGPxs5Zh16SS",
      chain_id: "5",
      name: "Expression of Peace",
      short_name: textual,
    },
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}; 
