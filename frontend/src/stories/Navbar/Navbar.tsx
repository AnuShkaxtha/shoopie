import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';
import { Menu, Moon, ShoppingCartIcon, User } from 'lucide-react';
import './Navbar.css';
import { Tooltip } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

interface User {
    name: string;
}

export interface NavbarProps {
    user: User | null;
    onLogin: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout, onCreateAccount }) => (
    <nav>
        <div className="storybook-navbar">
            <div className='logo'>
                <Menu />

                <h1>Shoopie</h1>
            </div>
            <div className='icon-class'>
                {user ? (
                    <>
                        {/* <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span> */}
                        <div className="dropdown">
                            <span className='icon'><User /></span>
                            <div className="dropdown-content">
                                <Button size="small" label="Account" />
                                <Button size="small" onClick={onLogout} label="Log out" />
                            </div>
                        </div>

                        <div className='icon'><ShoppingCartIcon /></div>
                        <div ><Moon/></div>
                       
                    </>
                ) : (
                    <>
                       <div className="dropdown">
                            <span className='icon'><User /></span>
                            <div className="dropdown-content">
                                <Button size="small" label="Login" />
                                <Button size="small" onClick={onLogout} label="Register" />
                            </div>
                        </div>

                        <div className='icon'><ShoppingCartIcon /></div>

                       
                    </>
                )}
            </div>
        </div>
    </nav>
);

// Navbar.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//   }),
//   onLogin: PropTypes.func.isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onCreateAccount: PropTypes.func.isRequired,
// };

export default Navbar;
