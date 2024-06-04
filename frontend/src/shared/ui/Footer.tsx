import { useTheme } from "@/processes/theme/theme-provider";


function Footer() {
  
  const { theme } = useTheme();
  return (
    
    <footer className={`py-[10px] shadow-xl  ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-500 text-white" }`}>
      <div className="w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 mt-6">
        <div className="mr-8">
          <p className="mb-4 font-bold">SHOOPIE</p>
          <div className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>

        <div >
          <p className="mb-4 font-bold">About Us</p>
          <p>Careers</p>
          <p>Our Stores</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>

        <div>
          <p className="mb-4 font-bold">Customer Care</p>
          <p>Help Center</p>
          <p>Track Your Order</p>
          <p>Corporate & Bulk Purchasing</p>
          <p>Returns & Refunds</p>
        </div>

        <div>
          <p className="mb-4 font-bold">Contact Us</p>
          <p>5Maharajgunj Rd, Kathmandu 44600</p>
          <p >Email: rigo200@gmail.com</p>
          <p>01-5970221</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
