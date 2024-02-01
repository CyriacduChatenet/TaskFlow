import { FC, ReactNode } from "react";

import Navbar from "./navbar.component";

interface IProps {
    children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
    return (
        <div className="w-screen h-screen grid grid-cols-12 grid-rows-12">
            <Navbar />
            <div className="col-span-10 row-span-12 ml-4">{children}</div>
        </div>
    );
}

export default Layout;