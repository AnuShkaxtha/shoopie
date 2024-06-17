import UserOrder from "./components/UserOrder";


const Dashboard: React.FC = () => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 sm:mt-20  gap-4 mt-[110px] lg:mt-[140px] md:mt-[140px]  px-4 lg:px-7 pb-9 w-auto">
      {/* <div className="shadow-xl md:col-span-1 md:mt-5 md:text-center md:bg-transparent">
        <div className="p-2 md:mt-9">
          <Button
            variant="ghost"
            onClick={() => setShowAccount(true)}
            className="w-full mt-2"
          >
            My Account
          </Button>
          <Separator className="my-2 bg-gray-400" />
          <Button
            variant="ghost"
            onClick={() => setShowAccount(false)}
            className="w-full mt-2"
          >
            Order Detail
          </Button>
          <Separator className="my-2 bg-gray-400" />
          <Button className="mt-2 w-full md:w-[100px]" onClick={() => { doSignOut().then(() => { navigate("/login"); }); }}>
            Logout
          </Button>
        </div>
      </div> */}
      <div className=" md:col-span-4 mb-9">
      <UserOrder/>
      </div>
      
    </div>
  );
};

export default Dashboard;
