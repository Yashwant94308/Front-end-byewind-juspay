import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { CgSortAz } from "react-icons/cg";
import ReactPaginate from "react-paginate";
import { useAuth } from "./Context";
import { motion } from "framer-motion";

const IconButton = React.memo(({ icon, isDarkMode }) => {
  const className = useMemo(
    () =>
      `p-2 rounded-md cursor-pointer ${
        isDarkMode
          ? "hover:bg-zinc-800 hover:text-gray-400 duration-300"
          : "hover:bg-zinc-100 hover:text-gray-400 duration-300"
      }`,
    [isDarkMode]
  );
  return <div className={className}>{icon}</div>;
});
IconButton.displayName = "IconButton";

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const TableRow = React.memo(({ item, index, isDarkMode, getStatusClass }) => {
  const rowClass = useMemo(
    () =>
      `border-b ${
        isDarkMode
          ? "hover:bg-zinc-800 text-white border-zinc-600"
          : "hover:bg-[#f8f9fb] text-black border-zinc-300"
      }`,
    [isDarkMode]
  );

  const statusClass = useMemo(
    () => getStatusClass(item.status),
    [item.status, getStatusClass]
  );

  return (
    <tr key={index} className={rowClass}>
      <td className="p-2 whitespace-nowrap">
        <input type="checkbox" className="mx-2 text-lg" />
        {item.orderId}
      </td>
      <td className="p-2 flex items-center gap-2 whitespace-nowrap">
        <img
          src={item.avatar}
          alt={`${item.user} avatar`}
          className="w-8 h-8 rounded-full"
        />
        {item.user}
      </td>
      <td className="p-2 whitespace-nowrap">{item.project}</td>
      <td className="p-2 whitespace-normal break-words">{item.address}</td>
      <td className="p-2 flex items-center whitespace-nowrap">
        <MdOutlineDateRange className="mr-2" />
        {item.date}
      </td>
      <td className={`p-2 ${statusClass} whitespace-nowrap`}>{item.status}</td>
    </tr>
  );
});
TableRow.displayName = "TableRow";

TableRow.propTypes = {
  item: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  getStatusClass: PropTypes.func.isRequired,
};

const Table = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { isDarkMode } = useAuth();

  const data = useMemo(
    () => [
      {
        orderId: "#CM9801",
        user: "Natali Craig",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        project: "Landing Page",
        address: "Meadow Lane Oakland",
        date: "Just now",
        status: "In Progress",
      },
      {
        orderId: "#CM9802",
        user: "Kate Morrison",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        project: "CRM Admin pages",
        address: "Larry San Francisco",
        date: "A minute ago",
        status: "Complete",
      },
      {
        orderId: "#CM9803",
        user: "Drew Cano",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        project: "Client Project",
        address: "Bagwell Avenue Ocala",
        date: "1 hour ago",
        status: "Pending",
      },
      {
        orderId: "#CM9804",
        user: "Orlando Diggs",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
        project: "Admin Dashboard",
        address: "Washburn Baton Rouge",
        date: "Yesterday",
        status: "Approved",
      },
      {
        orderId: "#CM9805",
        user: "Andi Lane",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        project: "App Landing Page",
        address: "Nest Lane Olivette",
        date: "Feb 2, 2023",
        status: "Rejected",
      },
      {
        orderId: "#CM9806",
        user: "Mason Clark",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        project: "Marketing Site",
        address: "Greenwood Seattle",
        date: "3 hours ago",
        status: "In Progress",
      },
      {
        orderId: "#CM9807",
        user: "Lara Bennett",
        avatar: "https://randomuser.me/api/portraits/women/55.jpg",
        project: "E-Commerce App",
        address: "Maple Street Austin",
        date: "4 days ago",
        status: "Complete",
      },
      {
        orderId: "#CM9808",
        user: "Ethan Hall",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        project: "Mobile App",
        address: "Elm Avenue Denver",
        date: "2 weeks ago",
        status: "Pending",
      },
      {
        orderId: "#CM9809",
        user: "Sophia King",
        avatar: "https://randomuser.me/api/portraits/women/48.jpg",
        project: "Website Redesign",
        address: "Oak Street Miami",
        date: "Yesterday",
        status: "Approved",
      },
      {
        orderId: "#CM9810",
        user: "James Wright",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        project: "Dashboard",
        address: "Pine Lane Boston",
        date: "Jan 15, 2023",
        status: "Rejected",
      },
      {
        orderId: "#CM9811",
        user: "Isabella Scott",
        avatar: "https://randomuser.me/api/portraits/women/18.jpg",
        project: "Landing Page",
        address: "Lakeview Road Chicago",
        date: "Just now",
        status: "In Progress",
      },
      {
        orderId: "#CM9812",
        user: "Oliver Green",
        avatar: "https://randomuser.me/api/portraits/men/60.jpg",
        project: "CRM Admin pages",
        address: "Sunset Boulevard LA",
        date: "A minute ago",
        status: "Complete",
      },
      {
        orderId: "#CM9813",
        user: "Mia Adams",
        avatar: "https://randomuser.me/api/portraits/women/29.jpg",
        project: "Client Project",
        address: "Broadway NYC",
        date: "1 hour ago",
        status: "Pending",
      },
      {
        orderId: "#CM9814",
        user: "Noah Baker",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        project: "Admin Dashboard",
        address: "River Road Houston",
        date: "Yesterday",
        status: "Approved",
      },
      {
        orderId: "#CM9815",
        user: "Emily Carter",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        project: "App Landing Page",
        address: "Cedar Lane Dallas",
        date: "Feb 2, 2023",
        status: "Rejected",
      },
      {
        orderId: "#CM9816",
        user: "Liam Evans",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        project: "Marketing Site",
        address: "Oakwood Drive Atlanta",
        date: "3 hours ago",
        status: "In Progress",
      },
      {
        orderId: "#CM9817",
        user: "Ava Foster",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        project: "E-Commerce App",
        address: "Birch Street Portland",
        date: "4 days ago",
        status: "Complete",
      },
      {
        orderId: "#CM9818",
        user: "Benjamin Gray",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        project: "Mobile App",
        address: "Chestnut Avenue Minneapolis",
        date: "2 weeks ago",
        status: "Pending",
      },
      {
        orderId: "#CM9819",
        user: "Charlotte Harris",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        project: "Website Redesign",
        address: "Willow Lane Orlando",
        date: "Yesterday",
        status: "Approved",
      },
      {
        orderId: "#CM9820",
        user: "Elijah Johnson",
        avatar: "https://randomuser.me/api/portraits/men/16.jpg",
        project: "Dashboard",
        address: "Elmwood Road Seattle",
        date: "Jan 15, 2023",
        status: "Rejected",
      },
    ],
    []
  );

  const PER_PAGE = 5;
  const offset = useMemo(() => currentPage * PER_PAGE, [currentPage]);
  const currentPageData = useMemo(
    () => data.slice(offset, offset + PER_PAGE),
    [data, offset]
  );
  const pageCount = useMemo(
    () => Math.ceil(data.length / PER_PAGE),
    [data.length]
  );

  const handlePageClick = useCallback(({ selected }) => {
    setCurrentPage(selected);
  }, []);

  const getStatusClass = useCallback((status) => {
    switch (status) {
      case "In Progress":
        return "text-blue-500";
      case "Complete":
        return "text-green-500";
      case "Pending":
        return "text-[#b1e3fe]";
      case "Approved":
        return "text-[#ffe898]";
      case "Rejected":
        return "text-zinc-500";
      default:
        return "";
    }
  }, []);

  const icons = useMemo(
    () => [
      { icon: <FaPlus />, key: "Plus" },
      { icon: <CgSortAz />, key: "SortAz" },
      { icon: <LuArrowUpDown />, key: "ArrowUpDown" },
    ],
    []
  );

  const containerClass = useMemo(
    () =>
      `p-4 font-inter sm:p-6 w-full min-h-screen ${
        isDarkMode
          ? "bg-zinc-900 text-white fade-in"
          : "bg-white text-zinc-900 fade-out"
      }`,
    [isDarkMode]
  );

  const toolbarClass = useMemo(
    () =>
      `flex flex-wrap items-center justify-between mb-4 rounded-md p-2 ${
        isDarkMode
          ? "bg-zinc-900 text-white fade-in"
          : "bg-[#f8f9fb] text-zinc-900 fade-out"
      }`,
    [isDarkMode]
  );

  const searchIconClass = useMemo(
    () =>
      `absolute top-3 left-2 hover:text-gray-900 ${
        isDarkMode ? "text-zinc-300 fade-in" : "text-zinc-400 fade-out"
      }`,
    [isDarkMode]
  );

  const inputClass = useMemo(
    () =>
      `pl-8 py-2 border rounded-lg w-full sm:w-40 lg:w-52 ${
        isDarkMode
          ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600 fade-in"
          : "bg-[#f8f9fb] hover:bg-zinc-200 text-black border-zinc-300 fade-out"
      }`,
    [isDarkMode]
  );

  const tableHeaderClass = useMemo(
    () => (isDarkMode ? "text-white" : "text-black"),
    [isDarkMode]
  );

  const paginationPageClass = useMemo(
    () =>
      `p-2 font-bold mx-1 sm:mx-2 rounded cursor-pointer ${
        isDarkMode
          ? "hover:bg-zinc-800 text-zinc-100 duration-100"
          : "hover:bg-zinc-200 text-zinc-900 duration-100"
      }`,
    [isDarkMode]
  );

  const paginationPrevNextClass = useMemo(
    () =>
      `p-2 font-bold rounded cursor-pointer ${
        isDarkMode
          ? "hover:text-yellow-600 text-zinc-100 duration-300"
          : "hover:text-gray-400 text-zinc-900 duration-300"
      }`,
    [isDarkMode]
  );

  const paginationActiveClass = useMemo(
    () =>
      isDarkMode ? "bg-zinc-800 text-zinc-100" : "bg-zinc-100 text-zinc-900",
    [isDarkMode]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={containerClass}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4">Order List</h2>

      <div className={toolbarClass}>
        <div className="flex items-center gap-2">
          {icons.map(({ icon, key }) => (
            <IconButton key={key} icon={icon} isDarkMode={isDarkMode} />
          ))}
        </div>
        <div className="relative mt-2 sm:mt-0">
          <FaSearch className={searchIconClass} />
          <input type="text" placeholder="Search" className={inputClass} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className={`border-b ${tableHeaderClass}`}>
              <th className="p-2">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Project</th>
              <th className="p-2">Address</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <TableRow
                key={index}
                item={item}
                index={index}
                isDarkMode={isDarkMode}
                getStatusClass={getStatusClass}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center sm:justify-end mt-4">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex items-center gap-2"}
          pageClassName={paginationPageClass}
          previousClassName={paginationPrevNextClass}
          nextClassName={paginationPrevNextClass}
          breakClassName={"p-2"}
          activeClassName={paginationActiveClass}
        />
      </div>
    </motion.div>
  );
};

export default Table;
