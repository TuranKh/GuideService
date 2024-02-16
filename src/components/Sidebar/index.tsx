import SaveIcon from "@/assets/icons/save.svg";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import "./Sidebar.scss";

export const Sidebar = function () {
    return (
        <aside>
            {Menus.map((menu) => {
                return (
                    <TooltipProvider delayDuration={250}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant='outline' size='icon'>
                                    <img src={menu.icon} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side='right'>
                                <p>{menu.title}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}
        </aside>
    );
};

const Menus = [
    {
        icon: SaveIcon,
        title: "Here it is",
    },
    {
        icon: SaveIcon,
        title: "Here it is",
    },
    {
        icon: SaveIcon,
        title: "Here it is",
    },
    {
        icon: SaveIcon,
        title: "Here it is",
    },
    {
        icon: SaveIcon,
        title: "Here it is",
    },
    {
        icon: SaveIcon,
        title: "Here it is",
    },
];
