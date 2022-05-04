import * as React from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";

import styles from "~/styles/app.css";
import supabase from "~/utils/supabase";
import NavBar from "./components/nav-bar";
import checkAndSetAuth from "./utils/checkAndSetAuth";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

// NOTE: this is how Remix includes 3rd party css on the page
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async (context) => {
  const { user } = await checkAndSetAuth(context);
  return {
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
    user,
  };
};

export default function App() {
  const { env, user } = useLoaderData();
  const { submit } = useFetcher();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.access_token) {
        setIsLoggedIn(true);
        submit(
          {
            accessToken: session?.access_token,
          },
          {
            method: "post",
            action: "/auth/login",
          }
        );
      }
    });
  }, [submit]);
  console.log("isLoggedIn (checking render)", isLoggedIn);

  React.useEffect(() => {
    // console.log("run login func isLoggedIn", isLoggedIn);
    console.log("checking user change", user);
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar isLoggedIn={isLoggedIn} />
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
