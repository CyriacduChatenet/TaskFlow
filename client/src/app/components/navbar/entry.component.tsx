import { FC, useState } from 'react';

interface IProps {
    title: string;
}

export const NavbarEntry: FC<IProps> = ({ title }) => {
    const [selected, setSelected] = useState(false);

    const handleHover = () => {
        setSelected(true);
    };

    const handleLeave = () => {
        setSelected(false);
    };
    return (
        <p className={`pl-12 w-full text-sm font-light py-2 border border-l-2 border-r-0 border-b-0 border-t-0 ${selected ? 'border-[#3AC0A8] text-white' :'border-gray-800 text-gray-400'}`} onMouseEnter={handleHover} onMouseLeave={handleLeave} >{title}</p>
    )
};