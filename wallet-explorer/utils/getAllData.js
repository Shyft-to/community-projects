import axios from "axios";
const endpoint = process.env.API_EP ?? "";
const xKey = process.env.API_KEY ?? "";
export async function getNFTData(network, address) {
  var data = {
    success: false,
    is_nft: true,
    details: null,
  };
    await axios({
    url: `${endpoint}nft/read`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": xKey,
    },
    params: {
        network:network,
        token_address: address
    }
  })
    .then((res) => {
      if(res.data.success === true)
      {
        data = {
            success: true,
            is_nft: true,
            details: res.data.result
        }
      }
    })
    .catch((err) => {
      console.warn(err);
    });

    return data;
}
