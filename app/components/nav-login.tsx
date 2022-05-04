import * as React from "react";

interface NavLoginProps {
  name?: string;
}
const NavLogin: React.FC<NavLoginProps> = ({ name }) => {
  return (
    <>
      <h1>hello new component</h1>
    </>
  );
};

export default NavLogin;
