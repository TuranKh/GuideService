import { IconButton } from "@/pages/Dashboard";
import { Calendar, History, LayoutDashboard, ListChecks, LogOut, Map, MessageCircle, Users } from "lucide-react";
import "./Sidebar.scss";
import { useNavigate } from "react-router";
import { Tooltip } from "antd";

export const Sidebar = function () {
    const navigate = useNavigate();

    return (
        <aside>
            <div className='main-icons'>
                {Menus.map((menu) => {
                    return (
                        <Tooltip placement='left' title={menu.title}>
                            <IconButton onClick={() => navigate(menu.route)}>{menu.icon}</IconButton>
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
        route: "/dashboard",
        title: "Here it is",
    },
    {
        icon: <LayoutDashboard />,
        route: "/layout",
        title: "Here it is",
    },
    {
        icon: <Users />,
        route: "/users",
        title: "Here it is",
    },
    {
        icon: <MessageCircle />,
        route: "/messages",
        title: "Here it is",
    },
    {
        icon: <Map />,
        route: "/map",
        title: "Here it is",
    },
    {
        icon: <ListChecks />,
        route: "/history",
        title: "Here it is",
    },
    {
        icon: <History />,
        route: "/history",
        title: "Here it is",
    },
];
