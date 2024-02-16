import NotificationsIcon from "@/assets/icons/notification.svg";
import SaveIcon from "@/assets/icons/save.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./Dashboard.scss";
import { Sidebar } from "@/components/Sidebar";

export default function Dashboard() {
    return (
        <div className='dashboard-wrapper'>
            <Sidebar />
            <main>
                <Header />
            </main>
        </div>
    );
}

export const Header = function () {
    return (
        <header>
            <Input placeholder='Axtarış' />
            <div className='user-details'>
                <Button variant='outline' size='icon'>
                    <img src={SaveIcon} />
                </Button>
                <Button variant='outline' size='icon'>
                    <img src={NotificationsIcon} />
                </Button>
                <Button className='rounded-xl' variant='secondary'>
                    Yeni sifariş
                </Button>
            </div>
        </header>
    );
};
