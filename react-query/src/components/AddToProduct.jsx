import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function AddToProduct() {
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const queryClient = useQueryClient();

  const mutationFnc = (newProduct) => {
    const response = axios.post(`http://localhost:3000/products`, newProduct);
    return response;
  };

  const mutation = useMutation({
    mutationFn: mutationFnc,
    onSuccess: (data, variables, context) => {
      console.log(context);
      queryClient.invalidateQueries(["products"]);
    },
    onMutate: () => {
      return { getting: "say hello" };
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = { ...state, id: crypto.randomUUID() };
    mutation.mutate(newProduct);
    setState({
      title: "",
      description: "",
      price: 0,
      rating: 0,
      thumbnail: "",
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  if (mutation.isLoading) {
    return <span>Submitting....</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  return (
    <div className="p-2 m-2 bg-gray-100 w-1/5 h-1/2">
      <h2 className="text-3xl my-2 font-bold">Add to product</h2>
      {mutation.isSuccess && (
        <p className="text-3xl font-semibold">Product is Added</p>
      )}
      <form action="" className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
          className="p-2 my-2 border rounded"
          placeholder="Enter title"
        />
        <textarea
          type="text"
          name="description"
          value={state.description}
          onChange={handleChange}
          className="p-2 my-2 border rounded"
          placeholder="Enter description"
        ></textarea>
        <input
          type="number"
          name="price"
          value={state.price}
          onChange={handleChange}
          className="p-2 my-2 border rounded"
          placeholder="Enter title"
        />
        <input
          type="thumbnail"
          name="thumbnail"
          value={state.thumbnail}
          onChange={handleChange}
          className="p-2 my-2 border rounded"
          placeholder="Enter title"
        />
        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-3 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
}
