import { EnumService } from "@/service/Enum";
import { Button, Table } from "antd";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { CustomDatePicker } from "../CustomInputs/DatePicker";
import { CustomSelectField } from "../CustomInputs/SelectInput";

export const MuseumTable = function () {
    const [rows, setRows] = useState<Array<MuseumTableRow>>([]);
    const { data: paymentTypes } = useQuery("payment-type", async () => {
        const serverResponse = await EnumService.getEnumList("PAYMENT_TYPE");
        return serverResponse;
    });

    const columns = useMemo(() => {
        return [
            {
                title: "Tarix",
                dataIndex: "date",
                key: "date",
                render: () => <CustomDatePicker inputDetails={{ key: "date", value: null, onChange: () => {} }} />,
            },
            {
                title: "Muzeyin adı",
                dataIndex: "museumName",
                key: "museumName",
            },
            {
                title: "Say",
                dataIndex: "count",
                key: "count",
            },
            {
                title: "Giriş qiyməti",
                dataIndex: "entryPrice",
                key: "entryPrice",
            },
            {
                title: "Ödəniş növü",
                dataIndex: "paymentType",
                key: "paymentType",
                render: () => {
                    // @ts-ignore
                    return <CustomSelectField inputDetails={{ options: paymentTypes?.data }} />;
                },
            },
            {
                title: "Ümumi qiymət",
                dataIndex: "totalPrice",
                key: "totalPrice",
            },
        ];
    }, []);

    const addRow = function () {
        setRows((currentRows) => {
            return [...currentRows, emptyRow];
        });
    };

    return (
        <div className='flex flex-col gap-2'>
            <Table columns={columns} dataSource={rows} />
            <Button onClick={addRow} className='self-start' type='link'>
                Əlavə et
            </Button>
        </div>
    );
};

export type MuseumTableRow = {
    name: string;
    quantity: number | null;
    price: number | null;
};

const emptyRow: MuseumTableRow = {
    name: "",
    quantity: null,
    price: null,
};
