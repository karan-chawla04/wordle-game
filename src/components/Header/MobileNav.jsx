import React from "react";
import Drawer from "@mui/material/Drawer";

const MobileNav = ({ isOpen, onClose }) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <li>Some</li>
      <li>Some</li>
      <li>Some</li>
      <li>Some</li>
    </Drawer>
  );
};

export default MobileNav;
