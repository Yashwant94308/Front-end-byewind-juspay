import { useState, memo, useCallback } from "react";
import {
	FaChevronUp,
	FaChevronRight,
	FaUserCircle,
	FaRegIdBadge,
} from "react-icons/fa";
import { LuPanelLeftClose } from "react-icons/lu";
import { HiOutlineIdentification } from "react-icons/hi";
import {
	PiChartPieSliceLight,
	PiShoppingBagOpen,
	PiFolder,
	PiBookOpenDuotone,
	PiUsersThreeDuotone,
	PiNotebookDuotone,
	PiChatsTeardropDuotone,
} from "react-icons/pi";
import { useAuth } from "./Context";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const menus = {
	ProfileMenu: [
		"Overview",
		"User Projects",
		"Campaigns",
		"Documents",
		"Followers",
	],
	AccountMenu: ["Profile", "Settings", "Billing", "Notifications", "Security"],
	CorporateMenu: [
		"Company",
		"Departments",
		"Corporate Projects",
		"Tasks",
		"Calendar",
	],
	BlogMenu: ["Posts", "Categories", "Tags", "Comments", "Authors"],
	SocialMenu: ["Feed", "Messages", "Friends", "Groups", "Notifications 1"],
};

const ExpandableMenu = memo(function ExpandableMenu({
	label,
	Icon,
	menuItems,
	activeTab,
	setActiveTab,
	isDarkMode,
}) {
	const [isOpen, setIsOpen] = useState(false);

	const iconTextColor = isDarkMode ? "zinc-400 fade-in" : "fade-out zinc-500";
	const labelTextColor = isDarkMode ? "zinc-300 fade-in" : "fade-out zinc-800";

	const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

	return (
		<li className="cursor-pointer">
			<div
				className={`flex text-md py-2 pl-3 rounded-lg items-center transition-colors duration-300 ${
					isDarkMode ? "hover:bg-zinc-700 fade-in" : "hover:bg-zinc-200 fade-out"
				}`}
				onClick={toggleOpen}
			>
				<span className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
					{isOpen ? (
						<FaChevronUp className={`text-${iconTextColor}`} style={{ fontSize: 12 }} />
					) : (
						<FaChevronRight className={`text-${iconTextColor}`} style={{ fontSize: 12 }} />
					)}
				</span>
				<Icon className={`mx-2 text-${labelTextColor}`} style={{ fontSize: 18 }} />
				<span className={`text-${labelTextColor} text-md font-normal`}>{label}</span>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="text-md pl-6"
					>
						{menuItems.map((item) => (
							<motion.li
								key={item}
								className={`py-2 pl-4 cursor-pointer rounded-lg transition-colors duration-300 ${
									isDarkMode ? "hover:bg-zinc-600 fade-in" : "hover:bg-zinc-300"
								} ${
									activeTab === item
										? isDarkMode
											? "active-tab-dark"
											: "active-tab"
										: ""
								}`}
								onClick={() => setActiveTab(item)}
							>
								{item}
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</li>
	);
});

ExpandableMenu.propTypes = {
	label: PropTypes.string.isRequired,
	Icon: PropTypes.elementType.isRequired,
	menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
	activeTab: PropTypes.string.isRequired,
	setActiveTab: PropTypes.func.isRequired,
	isDarkMode: PropTypes.bool,
};

const SidebarButton = memo(function SidebarButton({
	activeTab,
	setActiveTab,
	label,
	Icon,
	isDarkMode,
}) {
	const isActive = activeTab === label;
	return (
		<li
			className={`flex items-center text-md py-2 pl-4 cursor-pointer rounded-lg transition-colors duration-300 ease-in-out ${
				isActive
					? isDarkMode
						? "active-tab-dark"
						: "active-tab"
					: `hover:bg-${isDarkMode ? "zinc-700" : "zinc-200"}`
			}`}
			onClick={() => setActiveTab(label)}
		>
			<Icon
				className={`mr-2 text-${isDarkMode ? "zinc-300" : "zinc-800"}`}
				style={{ fontSize: 18 }}
			/>
			<span className={`text-${isDarkMode ? "zinc-300" : "zinc-800"} text-md font-normal`}>
				{label}
			</span>
		</li>
	);
});

SidebarButton.propTypes = {
	activeTab: PropTypes.string.isRequired,
	setActiveTab: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	Icon: PropTypes.elementType.isRequired,
	isDarkMode: PropTypes.bool,
};

const TabSelector = memo(function TabSelector({ activeTab, setActiveTab, isDarkMode }) {
	const tabs = ["Favorites", "Recent"];
	return (
		<div className="mb-4 ml-2">
			<div className="flex mb-2">
				{tabs.map((tab) => (
					<button
						key={tab}
						className={`mr-4 ${
							activeTab === tab
								? isDarkMode
									? "text-zinc-100 hover:text-zinc-200 fade-in"
									: "fade-out text-zinc-400 hover:text-zinc-300"
								: "text-zinc-300 hover:text-zinc-500 fade-in"
						}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>
		</div>
	);
});

TabSelector.propTypes = {
	activeTab: PropTypes.string.isRequired,
	setActiveTab: PropTypes.func.isRequired,
	isDarkMode: PropTypes.bool,
};

const ItemList = memo(function ItemList({ items, selectedItem, onSelect, isDarkMode }) {
	return (
		<ul>
			{items.map((item) => (
				<li
					key={item}
					onClick={() => onSelect(item)}
					className={`flex items-center text-md py-2 pl-1 cursor-pointer transition-colors duration-200 ease-in-out rounded-lg ${
						selectedItem === item
							? isDarkMode
								? "bg-zinc-800 text-white fade-in"
								: "fade-out bg-zinc-100 text-black"
							: isDarkMode
							? "hover:bg-zinc-700 text-white fade-in"
							: "fade-out hover:bg-zinc-200 text-zinc-500"
					}`}
				>
					<span
						className={`rounded-full h-2 w-2 mr-2 ${
							selectedItem === item
								? isDarkMode
									? "bg-zinc-300"
									: "bg-zinc-700"
								: "bg-zinc-300"
						}`}
					/>
					{item}
				</li>
			))}
		</ul>
	);
});

ItemList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedItem: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	isDarkMode: PropTypes.bool,
};

export default function Sidebar() {
	const [activeTab, setActiveTab] = useState("Default");
	const [activeTab1, setActiveTab1] = useState("Favorites");
	const [selectedItem1, setSelectedItem1] = useState("");
	const { isLeftClose, isDarkMode, setIsLeftClose } = useAuth();

	const favorites = ["Overview", "Projects"];
	const recent = ["Recent Project 1", "Recent Project 2"];

	const sidebarVariants = {
		open: {
			width: "15rem",
			opacity: 1,
			transition: { duration: 0.3, ease: "easeIn" },
		},
		closed: {
			width: "0rem",
			opacity: 0,
			transition: { duration: 0.3, ease: "easeOut" },
		},
	};

	const handleItemClickFavRecent = useCallback((item) => setSelectedItem1(item), []);

	return (
		<motion.div
			variants={sidebarVariants}
			initial="closed"
			animate={isLeftClose ? "closed" : "open"}
			className={`h-screen font-inter ${
				isDarkMode ? "bg-zinc-900 text-zinc-300" : "bg-white text-zinc-700"
			} md:w-52 top-0 left-0 z-50 shadow-lg transition-all duration-300`}
		>
			<div
				className={`w-52 ${isLeftClose ? "hidden" : "block"} transition-bg ${
					isDarkMode
						? "bg-zinc-900 text-zinc-300 hover:text-zinc-400 fade-in"
						: "bg-white text-zinc-900 hover:text-zinc-800 fade-out"
				} h-screen p-4 font-inter overflow-scroll transition-transform duration-300 md:translate-x-0 fixed md:static top-0 left-0 z-50 shadow-lg`}
			>
				<div className="flex justify-between items-center mb-8">
					<div className="flex items-center">
						<FaUserCircle
							size={30}
							className={`mr-2 text-${isDarkMode ? "zinc-300" : "zinc-800"}`}
						/>
						<p className="font-medium text-lg">ByeWind</p>
					</div>
					<div className="flex items-start">
						<LuPanelLeftClose
							className="cursor-pointer md:hidden hover:text-gray-400 duration-300"
							onClick={() => setIsLeftClose(true)}
						/>
					</div>
				</div>

				<div className="mb-4">
					<TabSelector activeTab={activeTab1} setActiveTab={setActiveTab1} isDarkMode={isDarkMode} />
					<ItemList
						items={activeTab1 === "Favorites" ? favorites : recent}
						selectedItem={selectedItem1}
						onSelect={handleItemClickFavRecent}
						isDarkMode={isDarkMode}
					/>
				</div>

				<div className="mb-4">
					<p
						className={`text-${
							isDarkMode ? "zinc-400" : "zinc-500"
						} mb-2 ml-2 text-md font-normal`}
					>
						Dashboards
					</p>
					<ul>
						{[
							{ label: "Default", icon: PiChartPieSliceLight },
							{ label: "eCommerce", icon: PiShoppingBagOpen },
							{ label: "Projects", icon: PiFolder },
							{ label: "Online Courses", icon: PiBookOpenDuotone },
						].map(({ label, icon: Icon }) => (
							<SidebarButton
								key={label}
								label={label}
								Icon={Icon}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								isDarkMode={isDarkMode}
							/>
						))}
					</ul>
				</div>

				<div>
					<p
						className={`text-${
							isDarkMode ? "zinc-400" : "zinc-500"
						} mb-2 ml-2 text-md font-normal`}
					>
						Pages
					</p>
					<ul>
						{Object.entries({
							"User Profile": FaRegIdBadge,
							Account: HiOutlineIdentification,
							Corporate: PiUsersThreeDuotone,
							Blog: PiNotebookDuotone,
							Social: PiChatsTeardropDuotone,
						}).map(([label, Icon]) => (
							<ExpandableMenu
								key={label}
								label={label}
								Icon={Icon}
								menuItems={menus[`${label.replace(" ", "")}Menu`] || menus[`${label}Menu`]}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								isDarkMode={isDarkMode}
							/>
						))}
					</ul>
				</div>
			</div>
		</motion.div>
	);
}
