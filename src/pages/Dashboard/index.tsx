import NotificationsIcon from "@/assets/icons/notification.svg";
import SaveIcon from "@/assets/icons/save.svg";
import { CustomInput, InputDetails } from "@/components/CustomInput";
import { Sidebar } from "@/components/Sidebar";
import { Button, Divider, Drawer, Input, Space, Switch, Table, TableProps, Tag } from "antd";
import { Bell, ChevronLeft, ChevronRight, Eye, ListFilter, RefreshCcw, Save, Search, SlidersHorizontal } from "lucide-react";
import React, { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, useState } from "react";
import "./Dashboard.scss";

export default function Dashboard() {
    return (
        <div className='dashboard-wrapper'>
            <Sidebar />
            {/* <Camera color='red' size={48} />; */}
            <main>
                <Header />
                <div className='calendar-section'>
                    <Actions />
                </div>
            </main>
        </div>
    );
}

// type OrderDetails = Record<keyof typeof initialOrderDetails, string | null | Date>;

type GeneralOrderDetails = {
    orderNumber: number;
    assignedTo: string;
    date: Date;
    customerCount: string;
    languageSelection: string;
    guideCategory: string;
    vehicleType: string;
    meetingLocation: string;
    groupLeadName: string;
    touristContactNumber: string;
    guide: string;
    driver: string;
    registrationPlate: string;
    confirmationType: string;
};

const initialGeneralOrderDetails = {
    orderNumber: null,
    assignedTo: null,
    date: null,
    customerCount: null,
    languageSelection: null,
    guideCategory: null,
    vehicleType: null,
    meetingLocation: null,
    groupLeadName: null,
    touristContactNumber: null,
    guide: null,
    driver: null,
    registrationPlate: null,
    confirmationType: null,
};

export type Nullable<T> = Record<keyof T, T[keyof T] | null>;

const generalFormFields: InputDetails<GeneralOrderDetails>[] = [
    { label: "Tarix", type: "date", inputKey: "date" },
    { label: "Müştəri sayı", type: "number", inputKey: "customerCount" },
    { label: "Dil seçimi", type: "select", inputKey: "languageSelection" },
    { label: "Guide kateqoriya", type: "select", inputKey: "guideCategory" },
    { label: "Maşın növü", type: "select", inputKey: "vehicleType" },
    { label: "Qarşılama yeri", type: "text", inputKey: "meetingLocation" },
    { label: "Group lead name", type: "text", inputKey: "groupLeadName" },
    { label: "Turistin əlaqə nömrəsi", type: "text", inputKey: "touristContactNumber" },
    { label: "Guide", type: "select", inputKey: "guide" },
    { label: "Sürücü", type: "select", inputKey: "driver" },
    { label: "Qeydiyyat nişanı", type: "text", inputKey: "registrationPlate" },
    { label: "Təsdiq növü", type: "select", inputKey: "confirmationType" },
];

const orderDetailsForms = [{}];

export const Actions = function () {
    const [orderDrawer, setOrderDrawer] = useState(false);
    const [generalDetails, setGeneralDetails] = useState<Nullable<GeneralOrderDetails>>(initialGeneralOrderDetails);
    const [orderDetails, setOrderDetails] = useState({ assignedTo: "", orderNumber: "" });

    const openNewOrderDialog = function () {
        setOrderDrawer(true);
    };

    const closeDialog = function () {
        setOrderDrawer(false);
    };

    const resetForm = function () {
        setGeneralDetails({
            ...initialGeneralOrderDetails,
        });
    };

    const onGeneralFormChange = function (e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setGeneralDetails((currentState) => {
            return {
                ...currentState,
                [name]: value,
            };
        });
    };

    return (
        <div className='actions-wrapper'>
            <div className='left'>
                <div className='arrows-wrapper'>
                    <IconButton>
                        <ChevronLeft />
                    </IconButton>
                    <div className='date-wrapper'>
                        <p>Today</p>
                    </div>
                    <IconButton>
                        <ChevronRight />
                    </IconButton>
                </div>
                <IconButton>
                    <Eye />
                </IconButton>
                <IconButton>
                    <SlidersHorizontal />
                </IconButton>
                <IconButton>
                    <ListFilter />
                </IconButton>
            </div>

            <div className='right'>
                <Button onClick={openNewOrderDialog}>Sifariş yarat</Button>

                <Drawer
                    className='order-drawer'
                    width='90%'
                    title={<DrawerHeader orderNumber='AT781Y2348' />}
                    onClose={closeDialog}
                    open={orderDrawer}
                >
                    <div className='order-details'>
                        <CustomInput key={"orderNumber"} label={"Sifariş nömrəsi"} type='text' value={orderDetails.orderNumber} />
                        <CustomInput key={"assignedTo"} label={"Təyin edilib"} type='text' value={orderDetails.assignedTo} />
                    </div>
                    <div className='general-inputs-wrapper'>
                        <p>Ümumi məlumatlar</p>
                        <div className='general-inputs'>
                            {generalFormFields.map((fieldDetails) => {
                                const { inputKey, label } = fieldDetails;
                                const value = generalDetails[inputKey] as string;
                                return (
                                    <CustomInput
                                        key={inputKey}
                                        name={inputKey}
                                        onChange={onGeneralFormChange}
                                        inputKey={inputKey as string}
                                        label={label}
                                        type='text'
                                        value={value}
                                    />
                                );
                            })}
                        </div>
                        <IconButton onClick={resetForm}>
                            <RefreshCcw />
                        </IconButton>
                        <Divider />
                    </div>

                    <Table columns={columns} dataSource={data} />

                    <div className='switches-wrapper'>
                        {Switches.map((switchDetails) => {
                            return (
                                <div>
                                    <p>{switchDetails.name}</p>
                                    <Switch key={switchDetails.key} />
                                </div>
                            );
                        })}
                    </div>
                </Drawer>
            </div>
        </div>
    );
};

export const DrawerHeader = function ({ orderNumber }: { orderNumber: string }) {
    const color = "#DBDBDB";
    return (
        <div className='drawer-header'>
            <p>Yeni Sifariş</p>
            <Tag color={color}>{orderNumber.toUpperCase()}</Tag>
        </div>
    );
};

export const Switches = [
    {
        name: "Muzey",
        key: "museum",
    },
    {
        name: "Restoran",
        key: "restaurant",
    },
    {
        name: "Extra sifariş",
        key: "additionalOrder",
    },
    {
        name: "Qeyd",
        key: "note",
    },
];

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
    {
        title: "Tarix",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Servis",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Guide növü",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Guide adı",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Transport",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Maşın növü",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Sürücü",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Radio-guide",
        key: "tags",
        dataIndex: "tags",
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Ümumi qiymət",
        key: "action",
        render: (_, record) => (
            <Space size='middle'>
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

export const IconButton = function ({
    children,
    activateOnHover,
    ...buttonDefaultProps
}: {
    children: React.ReactElement;
    activateOnHover?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button {...buttonDefaultProps} className={`icon-button ${activateOnHover && "on-hover"}`}>
            {children}
        </button>
    );
};

export const Header = function () {
    return (
        <header>
            <Input placeholder='Axtarış' prefix={<Search />} />
            <div className='user-details'>
                <IconButton>
                    <Save />
                </IconButton>
                <IconButton>
                    <Bell />
                </IconButton>

                <Button className='rounded-xl'>Yeni sifariş</Button>
            </div>
        </header>
    );
};
