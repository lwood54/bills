// take in access token
// create a cookie that stores access token
// sending back to client

import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/utils/cookie";

/*
  NOTE: this route becomes a serverless function because this file is
  setup only to export an action (could also work with loader)
*/

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const accessToken = formData.get("accessToken");
  const session = await getSession();
  session.set("accessToken", accessToken);
  const cookie = await commitSession(session);

  /*
    NOTE: apply this cookie when the user
    successfully logs in, then redirect them after login. Send user
    through this serverless function in order to store the cookie, which
    is sent via additional headers in the redirect method
  */

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
