import { useFetcher } from "@remix-run/react";
import * as React from "react";
import supabase from "~/utils/supabase";

export default () => {
  const { submit } = useFetcher();

  React.useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();

      submit(null, {
        method: "post",
        action: "/auth/logout",
      });
    };
    logout();
  }, [submit]);

  return <p>Logging out...</p>;
};
