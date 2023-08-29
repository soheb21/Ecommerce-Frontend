import axios from "axios";

export async function addToCart(data) {
    try {
        const cart = await axios.post("/cart", data)
        return cart;

    } catch (error) {
        console.log(error)
    }

}
export async function fetchItemByUserId() {
    try {
        const userCart = await axios.get("/cart");
        return userCart;

    } catch (error) {
        console.log(error)
    }
}
export async function updateCartFromItem(update) {
    try {
        const updateCart = await axios.put("/cart/" + update.id, update)
        console.log("updated response", updateCart)
        return updateCart;

    } catch (error) {
        console.log(error)
    }
}
export async function deleteItemFromCart(deleteId) {
    try {

        const deleteItem = await axios.delete("/cart/" + deleteId)
        return deleteItem;

    } catch (error) {
        console.log(error)
    }
}
export async function resetCart() {

    return new Promise(async (resolve) => {
        const response = await fetchItemByUserId();
        const items = response.data;
        for (let item of items) {
            await deleteItemFromCart(item.id);
        }
        resolve({ status: 'success' })
    });
}