import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
  const [isRightClose, setIsRightClose] = useState(false);
  const [isLeftClose, setIsLeftClose] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleRightPanel = () => setIsRightClose((prev) => !prev);
  const toggleLeftPanel = () => setIsLeftClose((prev) => !prev);

  const value = useMemo(
    () => ({
      isRightClose,
      setIsRightClose,
      toggleRightPanel,
      isLeftClose,
      setIsLeftClose,
      toggleLeftPanel,
      isDarkMode,
      setIsDarkMode,
      toggleDarkMode,
    }),
    [isRightClose, isLeftClose, isDarkMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
