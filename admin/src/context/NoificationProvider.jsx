import { createContext, useContext, useEffect, useRef, useState } from "react";

const NotificationContext = createContext();
let timeOutId;
const NotificationProvider = ({ children }) => {
  const notificationRef = useRef();

  const [notification, setNotification] = useState({
    type: "",
    value: "",
  });

  const [bgColor, setBgColor] = useState("");

  const updateNotification = (type, value) => {
    if (timeOutId) return clearTimeout(timeOutId);
    if (!type || !value) return;

    switch (type) {
      case "error":
        setBgColor("bg-red-400");
        break;

      case "warning":
        setBgColor("bg-orange-400");
        break;

      case "seccuess":
        setBgColor("bg-green-400");
        break;

      default:
        setBgColor("bg-red-400");
        break;
    }

    setNotification({ type, value });
    timeOutId = setTimeout(() => {
      setNotification({ type: "", value: "" });
    }, 3000);
  };

  useEffect(() => {
    notificationRef.current?.classList.remove("bottom-14", "opacity-0");
    notificationRef.current?.classList.add("bottom-10", "opacity-1");
  }, [notification.value]);

  return (
    <>
      <NotificationContext.Provider value={{ updateNotification }}>
        {children}
      </NotificationContext.Provider>
      {notification.value && (
        <p
          ref={notificationRef}
          className={`${bgColor} + rounded-full p-2 text-white fixed bottom-14 opacity-0 right-1/2 -translate-x-12 transition-all duration-150 ease-linear`}
        >
          {" "}
          {notification.value}
        </p>
      )}
    </>
  );
};

export const useNotification = () => useContext(NotificationContext);
export default NotificationProvider;
