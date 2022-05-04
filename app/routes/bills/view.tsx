import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import checkAndSetAuth from "~/utils/checkAndSetAuth";
import supabase from "~/utils/supabase";

// export const loader: LoaderFunction = async (context) => {
//   const { user } = await checkAndSetAuth(context);

//   if (!user) {
//     throw redirect("/login");
//   }
//   const { data, error } = await supabase.from("bills").select("*");
//   return { data, error, user };
// };

export default () => {
  const { data } = useLoaderData();
  console.log("data", data);
  return <div>Individual Bill View</div>;
};
