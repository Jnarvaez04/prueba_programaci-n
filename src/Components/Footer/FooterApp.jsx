import React from "react";
import Logo from "../../assets/img/Logo_casino.jpg";

export const FooterApp = () => {
  return (
    <>
      <footer className="bg-dark text-center text-white mt-2">
        <div className="p-4 pb-0">
          <section className="mb-4">
            <img
              src={Logo}
              alt="Logo_casino"
              width="50"
              height="50"
              className="d-inline-block align-top rounded-circle mr-4"
            />
          </section>
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          ©
          <h3 className="text-white ml-2" href="#">
            Casino
          </h3>
        </div>
      </footer>
    </>
  );
};
