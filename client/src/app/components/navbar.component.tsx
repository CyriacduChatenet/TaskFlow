import { FC, useState } from "react";

const Navbar: FC = () => {
    const [selectedMenu, setSelectedMenu] = useState<boolean>(false);

    return (
        <nav className="bg-gray-800 col-span-2 row-span-12 flex flex-col items-center justify-between sticky">
            <div className="flex flex-col items-center my-6">
                <h3 className="text-2xl font-medium text-[#3AC0A8]">TaskFlow</h3>
            </div>
            <div className="flex flex-col justify-between py-2 h-3/6">
                <p className={`text-sm font-light py-2 border border-l-2 ${selectedMenu ? "text-white border-[#3AC0A8]" : "text-gray-600 border-gray-800"}`}>Dashboard</p>
                <p className={`text-sm font-light py-2 border border-l-2 ${selectedMenu ? "text-white border-[#3AC0A8]" : "text-gray-600 border-gray-800"}`}>Calendar</p>
                <p className={`text-sm font-light py-2 border border-l-2 ${selectedMenu ? "text-white border-[#3AC0A8]" : "text-gray-600 border-gray-800"}`}>Boards</p>
                <p className={`text-sm font-light py-2 border border-l-2 ${selectedMenu ? "text-white border-[#3AC0A8]" : "text-gray-600 border-gray-800"}`}>Tasks</p>
                <p className={`text-sm font-light py-2 border border-l-2 ${selectedMenu ? "text-white border-[#3AC0A8]" : "text-gray-600 border-gray-800"}`}>Teams</p>
                <p className={`text-sm font-light py-2 border border-l-2 ${selectedMenu ? "text-white border-[#3AC0A8]" : "text-gray-600 border-gray-800"}`}>Users</p>
                <p className={`text-sm font-light py-2 border border-l-2 ${selectedMenu ? "text-white border-[#3AC0A8]" : "text-gray-600 border-gray-800"}`}>Notifications</p>
            </div>
            <div className="flex flex-col">
                <p className="text-sm font-light py-4 text-white">John Doe</p>
            </div>
        </nav>
    );
}

export default Navbar;