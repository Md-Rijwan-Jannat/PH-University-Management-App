import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TFaculty, TQueryParams, TMetaData } from "../../../types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";

type TTableData = Pick<
  TFaculty,
  "_id" | "id" | "name" | "email" | "contactNo" | "gander"
>;

const FacultyData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAllFacultiesQuery([
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

  const tableData = facultyData?.data?.map(
    (faculty: TFaculty, index: number) => ({
      key: index,
      _id: faculty._id,
      id: faculty.id,
      name: faculty.fullName,
      email: faculty.email,
      contactNo: faculty.contactNo,
      gander: faculty.gander,
    })
  );

  const metaData: TMetaData = facultyData?.meta;

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
      title: "Gander",
      key: "gander",
      dataIndex: "gander",
    },
    {
      title: "Action",
      key: "action",
      render: (_record, item) => {
        return (
          <Space>
            <NavLink to={`/admin/faculty-data/${item?._id}`}>
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

export default FacultyData;
