import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  const data = { message: "Welcome to the home page!" };
  return json(data);
};

export default function Home() {
  const data = useLoaderData<{ message: string }>();

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
}
