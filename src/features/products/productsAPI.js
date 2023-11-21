import axios from "axios";
// A mock function to mimic making an async request for data
export function fetchProducts() {
  // return new Promise((resolve) =>
  //   setTimeout(() => resolve({ data: amount }), 500)
  // );
    return axios.get('http://localhost:8080/products');
}
