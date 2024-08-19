import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TAdmin, TQueryParams, TMetaData } from "../../../types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/userManagementApi";

type TTableData = Pick<
  TAdmin,
  "_id" | "id" | "name" | "email" | "contactNo" | "gender"
>;

const AdminData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: adminData,
    isLoading,
    isFetching,
  } = useGetAllAdminsQuery([
    {
      name: "page",
      value: page,
    },
    {
      name: "sort",
      value: "id",
    },
    ...params,
  ]);

  const tableData = adminData?.data?.map((admin: TAdmin, index: number) => ({
    key: index,
    _id: admin._id,
    id: admin.id,
    name: admin.fullName,
    email: admin.email,
    contactNo: admin.contactNo,
    gender: admin.gender,
  }));

  const metaData: TMetaData = adminData?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (_record, item) => {
        return (
          <Space>
            <NavLink to={`/admin/admin-data/${item?._id}`}>
              <Button>Details</Button>
            </NavLink>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters?.name?.forEach((item) =>
        queryParams.push({ name: "name", value: `${item}` })
      );
      setParams(queryParams);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: "24px" }}
        align="center"
        total={metaData.total}
        pageSize={metaData.limit}
        defaultCurrent={page}
        current={page}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default AdminData;
