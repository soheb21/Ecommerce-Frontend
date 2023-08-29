// A mock function 
export async function fetchAllData() {
  try {
    const res = await fetch("")
    const data = await res.json();

  } catch (error) {
    console.log(error)
  }
}
