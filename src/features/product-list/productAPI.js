import axios from "axios";

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":"smartphone"}
  // TODO : on server we will support multi values

  return new Promise(async (resolve) => {
    //filter ={"category:"laptops"}
    let queryString = "";

    for (let key in filter) {
      const categoryValues = filter[key];
      if (categoryValues.length) {
        const lastCategoriesValue = categoryValues[categoryValues.length - 1]
        queryString += `${key}=${lastCategoriesValue}&`
      }

    }
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`
    }
    //pagination
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`
    }
    if (admin) {
      queryString += "admin=true";
    }

    //TODO: we will not hard-code server URL here
    const response = await fetch('/products?' + queryString)
    const data = await response.json()
    const totalItems = await response.headers.get("X-Total-Count")
    resolve({ data: { products: data, totalItems: +totalItems } })
  }
  );
}

export async function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/category")
    const data = await response.json();
    resolve({ data })
  })
}
export async function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands")
    const data = await response.json();
    resolve({ data })
  })
}

export async function fetchOneData(id) {
  try {
    // const res = await fetch("/products")
    const data = await axios.get("/products/" + id)

    // console.log(data)
    return data;

  } catch (error) {
    console.log(error)
  }
}
export async function searchFetch(searchData) {
  try {

    const data = await axios.post("/products/search-product", searchData)
    return data;

  } catch (error) {
    console.log(error)
  }
}
export async function updateProductForm(update) {
  try {
    const updateProduct = await axios.patch("/products/" + update.id, update)
    return updateProduct;

  } catch (error) {
    console.log(error)
  }
}

export async function createProduct(product) {
  try {
    const addNewProduct = await axios.post("/products", product)
    return addNewProduct;

  } catch (error) {
    console.log(error)
  }
}

