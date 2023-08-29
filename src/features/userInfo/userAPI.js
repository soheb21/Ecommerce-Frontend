// A mock function 
import axios from "axios";

export const fetchLoggedInUserOrders = async () => {
  try {
    const response = await axios.get("/orders/own")
    return response
  } catch (error) {
    console.log(error)
  }
}
export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch('/users/own')
    const data = await response.json()
    resolve({ data })
  }
  );
}
export async function updateUser(data) {
  try {
    const user = await axios.put("/users/" + data.id, data)
    return user;

  } catch (error) {
    console.log(error)
  }
}