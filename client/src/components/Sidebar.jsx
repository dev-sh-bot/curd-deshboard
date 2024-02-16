import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import LOGO from "../assets/images/logo.png";
import CUSTOMER_ICON from "../assets/images/customers icon.png";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div className={`sidebar ${openSidebar ? "active" : ""}`}>
      <div className=" fixed top-0 h-full overflow-hidden bg-[#015249] z-50">
        <div className="sidebar-logo flex sm:items-start sm:justify-center">
          <img src={LOGO} alt="logo" />

          <div className="sidebar-close-btn">
            <button onClick={() => setOpenSidebar(false)} className="text-white">🗙</button>
          </div>
        </div>

        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Link to="/" className="text-white flex rounded-[10px] align-center"> <span className="icon"><img src={CUSTOMER_ICON} alt="customer icon" /></span> <span className="font-semibold relative top-[2px]">CUSTOMERS</span></Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  openSidebar: PropTypes.bool.isRequired,
  setOpenSidebar: PropTypes.func.isRequired,
}


export default Sidebar