import navItems from "@config/navItems";
import { useApp } from "@/hooks";
import {
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { Web3Button } from "@web3modal/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Vehicle from "@/assets/lottie/vehicle.json"

const Header = () => {
  const { role } = useApp();
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {
        navItems.map(({ label, to, roles }, index) => (
          roles.includes(role || "") && (
            <Typography
              key={index}
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link to={to} className="flex items-center">
                {label}
              </Link>
            </Typography>
          )
        ))
      }
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 border-none shadow-none bg-transparent backdrop-saturate-[]  backdrop-blur-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-medium flex flex-row items-center"
        >
          
          <div className="relative w-10 h-10">
            <Lottie animationData={Vehicle} style={
              {
                position: "absolute",
                top: "-70%",
                left: "-50%",
                width: "100px",
                zIndex:999
              }
            } />
          </div>
          <sup className="ml-6 text-xs font-normal">v1.0 - beta</sup>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden lg:inline-block">
          <Web3Button />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden md:text-white"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="mb-2">
            <Web3Button />
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
