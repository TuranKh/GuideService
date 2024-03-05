import { Calendar, History, LayoutDashboard, ListChecks, LogOut, Map, MessageCircle, Users } from "lucide-react";
import "./Sidebar.scss";
import { useLocation, useNavigate } from "react-router";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { IconButton } from "../IconButton";

export const Sidebar = function () {
    const [activeRoute, setActiveRoute] = useState(Menus[0].route);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const [_, activePath] = location.pathname.split("/");
        setActiveRoute(activePath);
    }, [location]);

    const onSidebarIconClick = function (route: string) {
        const finalPath = `/${route}`;
        setActiveRoute(route);
        navigate(finalPath);
    };

    return (
        <aside>
            <div className='main-icons'>
                {Menus.map((menu) => {
                    return (
                        <Tooltip placement='left' title={menu.title}>
                            <IconButton className={activeRoute === menu.route ? "active" : ""} onClick={() => onSidebarIconClick(menu.route)}>
                                {menu.icon}
                            </IconButton>
                        </Tooltip>
                    );
                })}
            </div>

            <IconButton onClick={() => navigate("/login")}>
                <LogOut color='#E55353' />
            </IconButton>
        </aside>
    );
};

const Menus = [
    {
        icon: <Calendar />,
        route: "calendar",
        title: "Calendar",
    },
    {
        icon: <LayoutDashboard />,
        route: "dashboard",
        title: "Dashboard",
    },
    {
        icon: <Users />,
        route: "users",
        title: "Users",
    },
    {
        icon: <MessageCircle />,
        route: "messages",
        title: "Messages",
    },
    {
        icon: <Map />,
        route: "map",
        title: "Map",
    },
    {
        icon: <ListChecks />,
        route: "payments",
        title: "Payments",
    },
    {
        icon: <History />,
        route: "history",
        title: "History",
    },
];
