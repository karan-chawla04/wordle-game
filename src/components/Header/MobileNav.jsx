import React from "react";
import Drawer from "@mui/material/Drawer";

const MobileNav = ({ isOpen, onClose, children }) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      {children}
    </Drawer>
  );
};

export default MobileNav;
