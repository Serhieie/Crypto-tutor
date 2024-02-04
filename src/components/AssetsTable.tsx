import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { getAssets } from "../redux/dashboardSlice";
import { useSelector } from "react-redux";

interface DataType {
  key: React.Key | undefined;
  name: string | undefined;
  amount: number | undefined;
  price: number | undefined;
}

export const AssetsTable = () => {
  const assets = useSelector(getAssets);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: DataType, b: DataType) => (a.name || "").localeCompare(b.name || ""),
      sortDirections: ["descend"],
    },
    {
      title: "Price, $",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a: DataType, b: DataType) => (a.price || 0) - (b.price || 0),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      defaultSortOrder: "descend",
      sorter: (a: DataType, b: DataType) => (a.amount || 0) - (b.amount || 0),
    },
  ];

  const dataAssets: DataType[] = assets.map((asset) => ({
    key: asset?.id,
    name: asset?.name,
    price: asset?.price,
    amount: asset?.amount,
  }));

  return (
    <Table<DataType>
      style={{ height: "100%", maxHeight: "calc(100vh - 200px)", overflowY: "scroll" }}
      pagination={false}
      columns={columns}
      dataSource={dataAssets}
    />
  );
};
