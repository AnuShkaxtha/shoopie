
import { Button } from "@/components/ui/button";
import UserOrder from "./components/UserOrder";
import { Separator } from "@/components/ui/separator";


const Dashboard: React.FC = () => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 sm:mt-20  gap-4 mt-[70px] lg:mt-[140px] md:mt-[140px] b-9 w-auto">
      
       <div className="col-span-1 shadow-xl md:mt-5 md:text-center md:bg-transparent ">
        <div className="p-2 md:mt-9">
          <Button
            variant="ghost"
            // onClick={() => setShowAccount(true)}
            className="w-full mt-2"
          >
            My Account
          </Button>
          <Separator className="my-2 bg-gray-400" />
          <Button
            variant="ghost"
            // onClick={() => setShowAccount(false)}
            className="w-full mt-2"
          >
            Order Detail
          </Button>
          <Separator className="my-2 bg-gray-400" />
          <Button className="mt-2 w-full md:w-[100px]" 
          // onClick={() => { doSignOut().then(() => { navigate("/login"); }); }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="px-5 md:col-span-4 mb-9">
      <h1 className="font-extrabold uppercase text-[27px] text-center"> Admin Dashboard</h1>
      <UserOrder/>
      </div>
      
    </div>
  
  );
};

export default Dashboard;