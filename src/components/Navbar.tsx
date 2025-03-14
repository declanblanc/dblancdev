import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
function Navbar() {
  const width = useWindowWidth();
  const [opened, { toggle }] = useDisclosure();
  return (
    <div className="fixed flex w-full md:bg-[#1E1F1C] md:flex-row">
      <div className="md:hidden p-2">
        <Burger
          size="lg"
          color="#e5e5e5"
          opened={opened}
          onClick={toggle}
          aria-label="Taggle Menu"
        />
      </div>
      {(width > 768 || opened) && (
        <div className="z-5 flex md:flex-row flex-col justify-start">
          <Link to="/" className="p-2">
            <Button color="#34352F" size="md" onClick={toggle}>
              Home
            </Button>
          </Link>
          <Link to="/blog" className="p-2">
            <Button color="#34352F" size="md" onClick={toggle}>
              Blog
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
export default Navbar;
