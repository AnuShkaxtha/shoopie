import React , {useState, useEffect
}from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/processes/theme/theme-provider";
import {
  Menu,
  Moon,
  Search,
  Sun,
  User,
  LogOut,
  LogIn,
  SearchIcon,
} from "lucide-react";
import { GiShoppingBag } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/entities/auth/AuthProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { doSignOut } from "@/entities/firebase/auth";
import { Input } from "@/components/ui/input";
import { loadCartItemsFromStorage } from "@/app/store";
import { setCart } from "@/app/store";
export function Navbar() {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");


  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      const savedCart = loadCartItemsFromStorage(currentUser.uid);
      if (savedCart.length > 0) {
        dispatch(setCart(savedCart));
      }
    }
  }, [dispatch, currentUser, navigate]);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 p-4 shadow-md z-50 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      <div className="container flex items-center justify-between mx-auto">
        <Link to={"/"}>
          <div className="text-lg font-bold">SHOOPIE</div>
        </Link>

        <div className="flex items-center space-x-4">
          

          {/* ACCOUNT */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <User className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    {userLoggedIn ? (
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link to={"/account"} className="flex flex-start">
                              <User className="w-4 h-4 mr-2" />
                              <span>Profile</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div
                              onClick={() => {
                                doSignOut().then(() => {
                                  navigate("/");
                                });
                              }}
                              className="flex flex-start"
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              <p>Log out</p>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    ) : (
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link to={"/login"} className="flex flex-start">
                              <LogIn className="w-4 h-4 mr-2" />
                              <span>Login</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link to={"/register"} className="flex flex-start">
                              <User className="w-4 h-4 mr-2" />
                              <span>Register</span>
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    )}
                  </DropdownMenu>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* CART */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative inline-block">
                  <Link to={"/cart"}>
                    <Button variant="ghost" size="sm">
                      <GiShoppingBag
                        className={`h-5 w-5 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-900"
                        }`}
                      />
                      {cart.length > 0 && (
                        <Badge
                          variant="filled"
                          className="absolute flex items-center justify-center w-4 h-4 text-xs -top-2 -right-2"
                        >
                          {cart.length}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>My Cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>


          {/* COLOR MODE */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
