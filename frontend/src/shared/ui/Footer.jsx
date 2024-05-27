import React from "react";

function Footer() {
  return (
    <div style={{ marginTop: "70px", padding: "40px 0" }}>
      <div
        style={{
          width: "90%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: "30px",
          columnGap: "20px",
        }}
      >
        <div style={{ width: "30%" }}>
          <p style={{ fontWeight: "bold", marginBottom: "30px" }}>
            ECOMMER SITE
          </p>
          <div className="text-justify ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>

        <div style={{ width: "20%" }}>
          <p style={{ fontWeight: "bold", marginBottom: "30px" }}>About Us</p>
          <p>Careers</p>
          <p>Our Stores</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>

        <div style={{ width: "20%" }}>
          <p style={{ fontWeight: "bold", marginBottom: "30px" }}>
            Customer Care
          </p>
          <p>Help Center</p>
          <p>Track Your Order</p>
          <p>Corporate & Bulk Purchasing</p>
          <p>Returns & Refunds</p>
        </div>

        <div style={{ width: "20%" }}>
          <p style={{ fontWeight: "bold", marginBottom: "30px" }}>Contact Us</p>
          <p>5Maharajgunj Rd, Kathmandu 44600</p>
          <p style={{ wordWrap: "break-word" }}>Email: rigo200@gmail.com</p>
          <p>01-5970221</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
