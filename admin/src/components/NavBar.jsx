import { AiFillFileAdd, AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

const NavItem = ({ to, value, closed, Icon }) => {
  const commonClasses =
    "flex items-center space-x-2 w-full p-2 block whitespace-nowrap";
  const activeClass = commonClasses + "bg-blue-500 text-white";
  const inActiveClass = commonClasses + "text-gray-500";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? activeClass : inActiveClass)}
    >
      {Icon}
      <span className={closed ? 'w-0 transition-width overflow-hidden' : 'w-full transition-width overflow-hidden'}>{value}</span>
    </NavLink>
  );
};

const NavBar = ({ closed }) => {
  return (
    <nav>
        <div className="flex justify-center p-3">
            <img src={logo} className="w-14" alt="" />
        </div>
      <ul>
        <li>
          <NavItem
            closed={closed}
            to="/"
            value="Home"
            Icon={<AiOutlineHome size={24} />}
          />
        </li>
        <li>
          <NavItem
            closed={closed}
            to="/create-post"
            value="Create Post"
            Icon={<AiFillFileAdd size={24} />}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
