import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TStudent, TQueryParams, TMetaData } from "../../../types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type TTableData = Pick<
  TStudent,
  "_id" | "id" | "fullName" | "email" | "contactNo" | "gander"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentsData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
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

  const tableData = studentsData?.data?.map(
    (student: TStudent, index: number) => ({
      key: index,
      _id: student._id,
      id: student.id,
      fullName: student.fullName,
      email: student.email,
      contactNo: student.contactNo,
      gander: student.gander,
    })
  );

  const metaData: TMetaData = studentsData?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortDirections: ["ascend", "descend"],
      filters: Array.from(
        new Set(tableData?.map((item: { id: string }) => item.id))
      ).map((id) => ({
        text: id as string,
        value: id as string,
      })),
      onFilter: (value, record) => record.id === value,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ["ascend", "descend"],
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Gander",
      sorter: (a, b) => a.gander.localeCompare(b.gander),
      sortDirections: ["ascend", "descend"],
      key: "gander",
      dataIndex: "gander",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_record, item) => {
        return (
          <Space>
            <NavLink to={`/admin/student-data/${item?._id}`}>
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
    console.log("params", filters, extra);
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
        showSorterTooltip={{ target: "sorter-icon" }}
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

export default StudentData;
