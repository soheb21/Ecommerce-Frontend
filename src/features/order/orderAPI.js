import axios from "axios";

export async function addOrder(data) {
  try {
    const cart = await axios.post("/orders", data)
    return cart;

  } catch (error) {
    console.log(error)
  }
}
export async function fetchOrders(pagination) {

  return new Promise(async (resolve) => {
    let queryString = "";
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`
    }
    const response = await fetch('/orders?' + queryString)
    const data = await response.json()
    const totalOrders = await response.headers.get("X-Total-Count")
    resolve({ data: { orders: data, totalOrders: +totalOrders } })
  });
}
export const updateOrderStatus = async (update) => {
  try {
    const updatedStatus = await axios.put("/orders/" + update.id, update)
    return updatedStatus;
  } catch (error) {
    console.log(error)
  }
}