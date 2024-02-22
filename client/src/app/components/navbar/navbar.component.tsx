import { FC } from "react";

import { NavbarEntry } from "./entry.component";

const Navbar: FC = () => {

    return (
        <nav className="bg-gray-800 col-span-2 row-span-12 flex flex-col items-center justify-between sticky">
            <div className="flex flex-col items-center my-6">
                <h3 className="text-2xl font-medium text-[#3AC0A8]">TaskFlow</h3>
            </div>
            <div className="flex flex-col justify-between py-2 h-3/6">
                <NavbarEntry title="Dashboard" />
                <NavbarEntry title="Calendar" />
                <NavbarEntry title="Boards" />
                <NavbarEntry title="Tasks" />
                <NavbarEntry title="Teams" />
                <NavbarEntry title="Users" />
                <NavbarEntry title="Notifications" />
            </div>
            <div className="flex flex-col">
                <p className="text-sm font-light py-4 text-white">John Doe</p>
            </div>
        </nav>
    );
}

export default Navbar;