import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrieveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};

export default function ProductDetails({ id }) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retrieveProduct,
  });

  if (isLoading) return <div>Product Details is fetching...</div>;

  if (error) return <div>An Error is Occurred: {error.message}</div>;

  return (
    <div className="w-1/5">
      <h1 className="text-3xl my-2 font-bold">Product Details</h1>
      <div className="border bg-gray-100 p-3 text-md rounded">
        <img
          className="object-cover  rounded"
          src={product.thumbnail}
          alt={product.title}
        />
        <p className="text-2xl my-2">{product.title}</p>
        <p className="text-lg">{product.description}</p>
        <p className="text-lg font-semibold">Price: {product.price}</p>
        <p className="text-lg font-semibold">Rating: {product.rating}</p>
      </div>
    </div>
  );
}
