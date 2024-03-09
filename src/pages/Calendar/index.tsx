import { weekdayNames } from "@/main";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Button, Calendar as MaterialCalendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Bus, ChevronLeft, ChevronRight, Eye, Headphones, ListFilter, Plane, Plus, SlidersHorizontal } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AppealDrawer, IconButton } from "../Dashboard";
import "./Calendar.scss";

export type ViewMode = "week" | "month";

const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
            ];
            break;
        case 10:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
                { type: "error", content: "This is error event." },
            ];
            break;
        case 15:
            listData = [
                { type: "warning", content: "This is warning event" },
                { type: "success", content: "This is very long usual event......" },
                { type: "error", content: "This is error event 1." },
                { type: "error", content: "This is error event 2." },
                { type: "error", content: "This is error event 3." },
                { type: "error", content: "This is error event 4." },
            ];
            break;
        default:
    }
    return listData || [];
};

const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
        return 1394;
    }
};

export const Calendar = function () {
    const [weekNumber, setWeekNumber] = useState(0);
    const [viewMode, setViewMode] = useState<ViewMode>("week");

    const currentWeekDates = useMemo(() => {
        return getWeekDates(weekNumber);
    }, [weekNumber]);

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className='notes-month'>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className='events'>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps["status"]} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
        if (info.type === "date") return dateCellRender(current);
        if (info.type === "month") return monthCellRender(current);
        return info.originNode;
    };

    return (
        <div className='calendar-section main-section'>
            <Actions viewMode={viewMode} setViewMode={setViewMode} weekNumber={weekNumber} setWeekNumber={setWeekNumber} />
            <div className='calendar'>
                {viewMode === "month" && <MaterialCalendar cellRender={cellRender} />}
                {viewMode === "week" &&
                    weekdayNames.map((weekDay, index) => {
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

function getWeekDates(weeksFromCurrentDate = 0) {
    let weekStart = dayjs().startOf("week");

    if (weeksFromCurrentDate < 0) {
        weekStart = weekStart.subtract(Math.abs(weeksFromCurrentDate), "week");
    } else if (weeksFromCurrentDate > 0) {
        weekStart = weekStart.add(weeksFromCurrentDate, "week");
    }
    const dates = Array.from({ length: 7 }, (_, index) => {
        const date = weekStart.add(index, "day");
        return date.format("DD MMMM");
    });
    return dates;
}

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

export const Actions = function ({
    weekNumber,
    setWeekNumber,
    setViewMode,
    viewMode,
}: {
    setWeekNumber: React.Dispatch<React.SetStateAction<number>>;
    weekNumber: number;
    setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
    viewMode: ViewMode;
}) {
    const [orderDrawer, setOrderDrawer] = useState(false);

    const openNewOrderDialog = function () {
        setOrderDrawer(true);
    };

    const closeDialog = function () {
        setOrderDrawer(false);
    };

    const previousWeek = function () {
        setWeekNumber((currentWeek) => {
            return currentWeek - 1;
        });
    };

    const nextWeek = function () {
        setWeekNumber((currentWeek) => {
            return currentWeek + 1;
        });
    };

    const title = useMemo(() => {
        if (weekNumber === 0) {
            return "Bugün";
        }
        const weekDays = getWeekDates(weekNumber);
        const weekStart = weekDays[0];
        const weekEnd = weekDays[6];

        return `${weekStart} - ${weekEnd}`;
    }, [weekNumber]);

    return (
        <div className='actions-wrapper'>
            <div className='left'>
                <div className='arrows-wrapper'>
                    <IconButton onClick={previousWeek}>
                        <ChevronLeft />
                    </IconButton>
                    <div className='date-wrapper'>
                        <p>{title}</p>
                    </div>
                    <IconButton onClick={nextWeek}>
                        <ChevronRight />
                    </IconButton>
                </div>
                <div className='flex gap-1'>
                    <Button type={viewMode === "week" ? "primary" : "default"} onClick={() => setViewMode("week")}>
                        Həftə
                    </Button>
                    <Button type={viewMode === "month" ? "primary" : "default"} onClick={() => setViewMode("month")}>
                        Ay
                    </Button>
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
