import { CustomTextField } from "@/components/CustomInputs/TextField";
import { FormBuilder, FormDetails, InputChangeDetails } from "@/components/FormBuilder";
import { MuseumTable } from "@/components/MuseumTable";
import { Sidebar } from "@/components/Sidebar";
import { weekdayNames } from "@/main";
import { EnumService, EnumType } from "@/service/Enum";
import { EnumResponse } from "@/types";
import { Button, Divider, Drawer, DrawerProps, Input, Space, Switch, Table, TableProps, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import {
    Bell,
    Bookmark,
    Bus,
    ChevronLeft,
    ChevronRight,
    Eye,
    Headphones,
    ListFilter,
    Plane,
    Plus,
    RefreshCcw,
    Search,
    SlidersHorizontal,
} from "lucide-react";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, useEffect, useState } from "react";
import "./Dashboard.scss";

export default function Dashboard() {
    return (
        <div className='dashboard-wrapper'>
            <Sidebar />
            <main>
                <Header />
                <div className='calendar-section'>
                    <Actions />
                    <Calendar />
                </div>
            </main>
        </div>
    );
}
function getCurrentWeekDates() {
    const weekStart = dayjs().startOf("week");

    const dates = Array.from({ length: 7 }, (_, index) => {
        const date = weekStart.add(index, "day");
        return date.format("DD MMMM");
    });

    return dates;
}
export const Calendar = function () {
    const currentWeekDates = getCurrentWeekDates();

    return (
        <div className='calendar'>
            {weekdayNames.map((weekDay, index) => {
                return (
                    <div className='calendar-row'>
                        <div className='row-details'>
                            <div className='date-details'>
                                <p className='font-light text-xs'>{weekDay}</p>
                                <p>{currentWeekDates[index]}</p>
                            </div>
                            <Plus />
                        </div>
                        <div className='row-main-content'>
                            {temporaryRowDetails.map((details) => {
                                return <CalendarEvent details={details} />;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const CalendarEvent = function ({ details }: { details: { name: string } }) {
    return (
        <div className='calendar-event'>
            <div className='flex justify-between'>
                <p className='text-xs font-light agency-name'>{details.name}</p>
                <div className='flex gap-0.5'>
                    <Bus size={16} />
                    <Plane size={16} />
                    <Headphones size={16} />
                </div>
            </div>
        </div>
    );
};

const temporaryRowDetails = [
    {
        name: "Agro Agency",
    },
    {
        name: "Agro Agency",
    },
    {
        name: "Agro Agency",
    },
    {
        name: "Agro Agency",
    },
    {
        name: "Agro Agency",
    },
];

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

const generalFormFields: FormDetails[] = [
    { label: "Tarix", type: "date", key: "date" },
    { label: "Müştəri sayı", type: "number", key: "customerCount" },
    { label: "Dil seçimi", type: "select", key: "languages" },
    { label: "Guide kateqoriya", type: "select", key: "guideCategories" },
    { label: "Maşın növü", type: "select", key: "vehicleType" },
    { label: "Qarşılama yeri", type: "text", key: "meetingLocation" },
    { label: "Group lead name", type: "text", key: "groupLeadName" },
    { label: "Turistin əlaqə nömrəsi", type: "text", key: "touristContactNumber" },
    { label: "Guide", type: "select", key: "guideTypes" },
    { label: "Sürücü", type: "select", key: "driver" },
    { label: "Qeydiyyat nişanı", type: "text", key: "registrationPlate" },
    { label: "Təsdiq növü", type: "select", key: "confirmationType" },
] as const;

export const Actions = function () {
    const [orderDrawer, setOrderDrawer] = useState(false);

    const openNewOrderDialog = function () {
        setOrderDrawer(true);
    };

    const closeDialog = function () {
        setOrderDrawer(false);
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
                <AppealDrawer onClose={closeDialog} open={orderDrawer} />
            </div>
        </div>
    );
};

export type AppealDrawerProps = DrawerProps;
type Options = "languages" | "guideCategories" | "guideTypes";

export const AppealDrawer = function (props: AppealDrawerProps) {
    const [generalDetails, setGeneralDetails] = useState<Nullable<GeneralOrderDetails>>(initialGeneralOrderDetails);
    const [orderDetails, setOrderDetails] = useState({ assignedTo: "", orderNumber: "" });
    const [options, setOptions] = useState<Record<Options, EnumResponse[]> | null>(null);

    const [switchValues, setSwitchValues] = useState<Record<SwitchKey, boolean>>({
        additionalOrder: true,
        museum: true,
        note: true,
        restaurant: true,
    });

    useEffect(() => {
        getInputOptions();
    }, []);

    const getInputOptions = async function () {
        const neededOptions: Array<EnumType> = ["LANGUAGE", "GUIDE_CATEGORY", "GUIDE_TYPE"];

        const requests = neededOptions.map((option) => {
            return EnumService.getEnumList(option);
        });

        Promise.allSettled(requests).then((responseArray) => {
            const [languages, guideCategories, guideTypes] = responseArray;

            const finalOptions: Record<Options, EnumResponse[]> = {
                languages: [],
                guideCategories: [],
                guideTypes: [],
            };
            if (languages.status === "fulfilled") {
                finalOptions.languages = languages.value.data;
            }
            if (guideCategories.status === "fulfilled") {
                finalOptions.guideCategories = guideCategories.value.data;
            }
            if (guideTypes.status === "fulfilled") {
                finalOptions.guideTypes = guideTypes.value.data;
            }

            setOptions(finalOptions);
        });
    };

    const resetForm = function () {
        setGeneralDetails({
            ...initialGeneralOrderDetails,
        });
    };

    const changeSwitchValue = function (isChecked: boolean, key: SwitchKey) {
        setSwitchValues((currentValue) => {
            return {
                ...currentValue,
                [key]: isChecked,
            };
        });
    };

    const onOrderDetailsChange = function ({ key, value }: InputChangeDetails) {
        setOrderDetails((currentState) => {
            return {
                ...currentState,
                [key]: value,
            };
        });
    };

    const onGeneralFormChange = function ({ key, value }: InputChangeDetails) {
        setGeneralDetails((currentState) => {
            return {
                ...currentState,
                [key]: value,
            };
        });
    };

    return (
        <Drawer className='order-drawer' width='90%' title={<DrawerHeader orderNumber='AT781Y2348' />} {...props}>
            <div className='order-details'>
                <CustomTextField
                    inputDetails={{
                        key: "orderNumber",
                        onChange: onOrderDetailsChange,
                        label: "Sifariş nömrəsi",
                        type: "text",
                        value: orderDetails.orderNumber,
                    }}
                />
                <CustomTextField
                    inputDetails={{
                        key: "assignedTo",
                        onChange: onOrderDetailsChange,
                        label: "Təyin edilib",
                        type: "text",
                        value: orderDetails.assignedTo,
                    }}
                />
            </div>
            <form className='general-inputs-wrapper'>
                <p>Ümumi məlumatlar</p>
                <div className='general-inputs'>
                    <FormBuilder
                        form={{
                            inputs: generalFormFields,
                            // @ts-ignore
                            onChange: onGeneralFormChange,
                            values: generalDetails,
                            // @ts-ignore
                            options: options,
                        }}
                    />
                    <IconButton className='reset' type='reset' onClick={resetForm}>
                        <RefreshCcw />
                    </IconButton>
                </div>

                <Divider />
            </form>

            <Table columns={columns} dataSource={data} />

            <div className='switches-wrapper'>
                {Switches.map((switchDetails) => {
                    return (
                        <div key={switchDetails.key}>
                            <p>{switchDetails.name}</p>
                            <Switch
                                value={switchValues[switchDetails.key]}
                                onClick={(checked) => changeSwitchValue(checked, switchDetails.key)}
                                key={switchDetails.key}
                            />
                        </div>
                    );
                })}
            </div>

            {switchValues.museum && <MuseumTable />}
            {switchValues.restaurant && <Table columns={restaurantColumns} dataSource={[]} />}
            {switchValues.additionalOrder && <Table columns={additionalOrderColumns} dataSource={[]} />}

            {switchValues.note && (
                <div className='additional-note'>
                    <label htmlFor='additional-note'>Qeyd</label>
                    <TextArea id='additional-note' rows={4} variant='filled' />
                </div>
            )}

            <Button className='self-end'>Yarat</Button>
        </Drawer>
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

export type SwitchKey = "museum" | "restaurant" | "additionalOrder" | "note";

export const Switches: Array<{ name: string; key: SwitchKey }> = [
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
        render: (text: string) => <a>{text}</a>,
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

const restaurantColumns = [
    {
        title: "Tarix",
        dataIndex: "date",
        key: "date",
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: "Yemək növü",
        dataIndex: "foodType",
        key: "foodType",
    },
    {
        title: "Restoran adı",
        dataIndex: "restaurantName",
        key: "restaurantName",
    },
    {
        title: "Menyu",
        dataIndex: "menu",
        key: "menu",
    },
    {
        title: "Say",
        dataIndex: "count",
        key: "count",
    },
    {
        title: "Ödəniş növü",
        dataIndex: "paymentType",
        key: "paymentType",
    },
    {
        title: "Menyu qiyməti",
        dataIndex: "menuPrice",
        key: "menuPrice",
    },
    {
        title: "Ümumi qiymət",
        dataIndex: "totalPrice",
        key: "totalPrice",
    },
];

const additionalOrderColumns = [
    {
        title: "Tarix",
        dataIndex: "date",
        key: "date",
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: "Təyinat",
        dataIndex: "toyType",
        key: "toyType",
    },
    {
        title: "Ödəniş növü",
        dataIndex: "paymentType",
        key: "paymentType",
    },
    {
        title: "Say",
        dataIndex: "count",
        key: "count",
    },
    {
        title: "Qiyməti",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Ümumi qiymət",
        dataIndex: "totalPrice",
        key: "totalPrice",
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
    ...buttonDefaultProps
}: {
    children: React.ReactElement;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const className = `icon-button ${buttonDefaultProps.className}`;
    return (
        <button {...buttonDefaultProps} className={className}>
            {children}
        </button>
    );
};

export const Header = function () {
    return (
        <header>
            <Input className='search' placeholder='Axtarış' prefix={<Search />} />
            <div className='user-details'>
                <IconButton>
                    <Bookmark />
                </IconButton>
                <IconButton>
                    <Bell />
                </IconButton>

                <Button className='rounded-xl'>Yeni sifariş</Button>
            </div>
        </header>
    );
};
