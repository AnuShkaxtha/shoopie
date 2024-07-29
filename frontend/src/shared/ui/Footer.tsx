import { useTheme } from "@/processes/theme/theme-provider";

function Footer(): JSX.Element {
  const { theme } = useTheme();
  return (
    <footer className={`py-[10px] mt-[44px] shadow-xl w-full ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-500 text-white"}`}>
      <div className="w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 mt-6">
        <div className="mr-8">
          <p className="mb-4 font-bold">SHOOPIE</p>
          <div className="text-justify">
          Discover a world of style and savings! Shop the latest trends and timeless classics at unbeatable prices. From fashion to home essentials, find everything you need to enhance your lifestyle. Shop now and experience seamless online shopping with fast delivery and exceptional customer service.
          </div>
        </div>

        <div>
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
          <p>5 Maharajgunj Rd, Kathmandu 44600</p>
          <p>Email: rigo200@gmail.com</p>
          <p>01-5970221</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
