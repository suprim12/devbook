import React from "react";

export default function Footer() {
  return (
    <footer className="text-light text-center p-2  app-footer">
      <p className="p-0">
        Copyright &copy; {new Date().getFullYear()} DevBook. All rights
        reserved.
      </p>
    </footer>
  );
}
