import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllAssetsQuery } from "../redux/crypto/assetsApi";

interface DataType {
  key: React.Key | undefined;
  name: string | undefined;
  amount: number | undefined;
  price: number | undefined;
}

export const AssetsTable = () => {
  const { data: assets } = useGetAllAssetsQuery();

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

  const dataAssets: DataType[] | undefined = assets?.map((asset) => ({
    key: asset?.assetId,
    name: asset?.name,
    price: asset?.price,
    amount: asset?.amount,
    cellFontSizeSM: 20,
    cellFontSizeMD: 40,
    cellFontSize: 40,
  }));

  return (
    <Table<DataType>
      style={{
        height: "100%",
        maxHeight: "calc(100vh - 180px)",
        overflowY: "scroll",
        marginTop: 20,
      }}
      pagination={false}
      columns={columns}
      dataSource={dataAssets}
      className="text-xl font-bold custom-table"
    />
  );
};
