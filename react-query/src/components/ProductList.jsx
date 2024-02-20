import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`
  );
  return response.data;
};

export default function ProductList({ onGetIt }) {
  const [page, setPage] = useState(1);

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
  });

  // delete product
  const queryClient = useQueryClient();

  const mutationFnc = (ProductId) => {
    const response = axios.delete(
      `http://localhost:3000/products/${ProductId}`
    );
    return response;
  };

  const mutation = useMutation({
    mutationFn: mutationFnc,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleDelete = (productId) => {
    mutation.mutate(productId);
  };

  if (isLoading) return <div>Products is Fetching... </div>;

  if (error) return <div>An Error Occurred: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h1 className="text-3xl my-2 font-bold">Product List</h1>
      <ul className="flex flex-wrap  justify-center items-center">
        {products.data &&
          products.data.map((product) => (
            <li
              className=" flex flex-col items-center m-2 border rounded-sm"
              key={product.id}
            >
              <img
                className=" object-cover h-64 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />
              <p className="text-xl my-3">{product.title}</p>
              <button
                className=" py-2 px-3 bg-gray-500 text-white font-semibold my-2"
                onClick={() => onGetIt(product.id)}
              >
                Mre Details
              </button>
              <button
                className=" py-2 px-3 bg-red-400 text-white font-semibold my-2"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
      <div>
        {products.prev && (
          <button
            className="text-white bg-gray-500 text-xl font-semibold px-2 py-1 mr-3 rounded"
            onClick={() => setPage(products.prev)}
          >
            Prev
          </button>
        )}
        {products.next && (
          <button
            className="text-white bg-gray-500 text-xl font-semibold px-2 py-1 rounded"
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
