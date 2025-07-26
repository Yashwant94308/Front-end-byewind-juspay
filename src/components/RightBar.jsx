import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { PiBugBeetle, PiUser, PiBroadcast } from "react-icons/pi";
import { useAuth } from "./Context";
import PropTypes from "prop-types";

const IconWrapper = memo(({ children, bgColor }) => (
  <div className={`p-1 rounded-full mr-2 ${bgColor}`}>{children}</div>
));
IconWrapper.displayName = "IconWrapper";
IconWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string.isRequired,
};

const NotificationItem = memo(({ notif, isDarkMode }) => {
  const { icon, bgColor } = useMemo(() => {
    const icons = {
      bug: (
        <PiBugBeetle
          className={isDarkMode ? "text-red-400" : "text-red-600"}
          style={{ fontSize: 18 }}
        />
      ),
      user: (
        <PiUser
          className={isDarkMode ? "text-blue-400" : "text-blue-600"}
          style={{ fontSize: 18 }}
        />
      ),
      subscribe: (
        <PiBroadcast
          className={isDarkMode ? "text-green-400" : "text-green-600"}
          style={{ fontSize: 18 }}
        />
      ),
    };

    const bgColors = {
      bug: isDarkMode ? "bg-red-600/20" : "bg-red-200/50",
      user: isDarkMode ? "bg-blue-600/20" : "bg-blue-200/50",
      subscribe: isDarkMode ? "bg-green-600/20" : "bg-green-200/50",
    };

    return { icon: icons[notif.type], bgColor: bgColors[notif.type] };
  }, [notif.type, isDarkMode]);

  return (
    <li className="flex items-center mb-4">
      <IconWrapper bgColor={bgColor}>{icon}</IconWrapper>
      <div>
        <p className="text-xs">{notif.message}</p>
        <p
          className={`text-xs ${
            isDarkMode ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          {notif.time}
        </p>
      </div>
    </li>
  );
});
NotificationItem.displayName = "NotificationItem";
NotificationItem.propTypes = {
  notif: PropTypes.shape({
    type: PropTypes.oneOf(["bug", "user", "subscribe"]).isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const ActivityItem = memo(({ activity, isDarkMode }) => (
  <li className="flex items-center mb-4">
    <IconWrapper bgColor={isDarkMode ? "bg-blue-600/20" : "bg-blue-200/50"}>
      <img
        src={activity.avatar}
        alt="avatar"
        className="w-6 h-6 rounded-full"
      />
    </IconWrapper>
    <div>
      <p className="text-xs">{activity.action}</p>
      <p
        className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
      >
        {activity.time}
      </p>
    </div>
  </li>
));
ActivityItem.displayName = "ActivityItem";
ActivityItem.propTypes = {
  activity: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const ContactItem = memo(({ contact, index, isDarkMode }) => (
  <li className="flex items-center mb-3">
    <IconWrapper bgColor={isDarkMode ? "bg-purple-600/20" : "bg-purple-200/50"}>
      <img
        src={`https://i.pravatar.cc/30?img=${index + 20}`}
        alt="avatar"
        className="w-6 h-6 rounded-full"
      />
    </IconWrapper>
    <div>
      <p className="text-sm">{contact.user}</p>
    </div>
  </li>
));
ContactItem.displayName = "ContactItem";
ContactItem.propTypes = {
  contact: PropTypes.shape({
    user: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const Section = memo(({ title, children, isDarkMode }) => (
  <div>
    <h2
      className={`font-bold text-md mb-2 ${
        isDarkMode ? "text-zinc-100" : "text-zinc-900"
      }`}
    >
      {title}
    </h2>
    <ul className="max-h-[270px] overflow-y-auto mb-6">{children}</ul>
  </div>
));
Section.displayName = "Section";
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const notifications = [
  { type: "bug", message: "You have a bug that needs ...", time: "Just now" },
  { type: "user", message: "New user registered", time: "59 minutes ago" },
  {
    type: "bug",
    message: "You have a bug that needs ...",
    time: "12 hours ago",
  },
  {
    type: "subscribe",
    message: "Andi Lane subscribed to you",
    time: "Today, 11:59 AM",
  },
];

const contactsData = [
  { user: "Natali Craig" },
  { user: "Drew Cano" },
  { user: "Orlando Diggs" },
  { user: "Andi Lane" },
  { user: "Kate Morrison" },
  { user: "Koray Occumos" },
];

const activityData = [
  {
    avatar: "https://i.pravatar.cc/30?img=20",
    action: "You have a bug that needs...",
    time: "Just now",
  },
  {
    avatar: "https://i.pravatar.cc/30?img=21",
    action: "Released a new version",
    time: "59 minutes ago",
  },
  {
    avatar: "https://i.pravatar.cc/30?img=22",
    action: "Submitted a bug",
    time: "12 hours ago",
  },
  {
    avatar: "https://i.pravatar.cc/30?img=23",
    action: "Modified A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    avatar: "https://i.pravatar.cc/30?img=24",
    action: "Deleted a page in Project X",
    time: "Feb 2, 2023",
  },
];

export default function Sidebar() {
  const { isRightClose, isDarkMode } = useAuth();

  const sidebarVariants = useMemo(
    () => ({
      open: {
        width: "20rem",
        opacity: 1,
        transition: { duration: 0.3, ease: "easeIn" },
      },
      closed: {
        width: "0rem",
        opacity: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      },
    }),
    []
  );
  
  const notificationItems = useMemo(
    () =>
      notifications.map((notif, i) => (
        <NotificationItem key={i} notif={notif} isDarkMode={isDarkMode} />
      )),
    [isDarkMode]
  );

  const activityItems = useMemo(
    () =>
      activityData.map((activity, i) => (
        <ActivityItem key={i} activity={activity} isDarkMode={isDarkMode} />
      )),
    [isDarkMode]
  );

  const contactItems = useMemo(
    () =>
      contactsData.map((contact, i) => (
        <ContactItem
          key={i}
          contact={contact}
          index={i}
          isDarkMode={isDarkMode}
        />
      )),
    [isDarkMode]
  );

  return (
    <motion.div
      variants={sidebarVariants}
      initial="closed"
      animate={isRightClose ? "closed" : "open"}
      className={`max-h-screen font-inter overflow-scroll ${
        isDarkMode ? "bg-zinc-900 text-zinc-300" : "bg-white text-zinc-700"
      }`}
    >
      <div className="p-4">
        <Section title="Notifications" isDarkMode={isDarkMode}>
          {notificationItems}
        </Section>
        <Section title="Activities" isDarkMode={isDarkMode}>
          {activityItems}
        </Section>
        <Section title="Contacts" isDarkMode={isDarkMode}>
          {contactItems}
        </Section>
      </div>
    </motion.div>
  );
}
