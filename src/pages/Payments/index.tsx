import { Space, Table, Tag } from "antd";
import "./Payments.scss";
import { TableProps } from "antd/lib";

export const Payments = function () {
    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

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
