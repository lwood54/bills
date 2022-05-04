import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Bill } from "~/types/bills";
import checkAndSetAuth from "~/utils/checkAndSetAuth";
import supabase from "~/utils/supabase";

type LoaderData = {
  bills: Bill[];
};

export const loader: LoaderFunction = async (context) => {
  const { user } = await checkAndSetAuth(context);
  if (!user) {
    return redirect("/login");
  }
  const { data, error } = await supabase.from("bills").select("*");
  return { bills: data, error, user };
};

export default () => {
  const { bills }: LoaderData = useLoaderData();
  console.log("bills ==> ", bills);
  return (
    <div className="full-page">
      {bills.map((bill) => (
        <div key={bill.id} className="w-1/2 bg-blue-700">
          <p>{bill.name}</p>
          <p>{bill.balance}</p>
          <p>{bill.payment}</p>
        </div>
      ))}
    </div>
  );
};
