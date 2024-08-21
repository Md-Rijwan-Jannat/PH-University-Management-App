import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicFaculty, TQueryParams } from "../../../types";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { formatUKDate, formatUKTime } from "../../../utils/dateFormat";

type TTableData = {
  key: number;
  name: string;
  createdAtDate: string;
  createdAtTime: string;
  updatedAtDate: string;
  updatedAtTime: string;
};

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const {
    data: academicFaculties,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultiesQuery(params);

  const tableData = academicFaculties?.data?.map(
    (faculty: TAcademicFaculty, index: number) => ({
      key: index,
      name: faculty.name,
      createdAtDate: formatUKDate(faculty.createdAt),
      createdAtTime: formatUKTime(faculty.createdAt),
      updatedAtDate: formatUKDate(faculty.updatedAt),
      updatedAtTime: formatUKTime(faculty.updatedAt),
    })
  );

  const metaData = academicFaculties?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      filters: Array.from(
        new Set(tableData?.map((item: { name: string }) => item.name))
      ).map((name) => ({
        text: name as string,
        value: name as string,
      })),
      onFilter: (value, record) => record.name === value,
    },
    {
      title: "Created Date",
      dataIndex: "createdAtDate",
      sorter: (a, b) =>
        new Date(a.createdAtDate).getTime() -
        new Date(b.createdAtDate).getTime(),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAtDate",
      sorter: (a, b) =>
        new Date(a.updatedAtDate).getTime() -
        new Date(b.updatedAtDate).getTime(),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Created Time",
      dataIndex: "createdAtTime",
      sorter: (a, b) =>
        new Date(`1970-01-01T${a.createdAtTime}`).getTime() -
        new Date(`1970-01-01T${b.createdAtTime}`).getTime(),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Updated Time",
      dataIndex: "updatedAtTime",
      sorter: (a, b) =>
        new Date(`1970-01-01T${a.updatedAtTime}`).getTime() -
        new Date(`1970-01-01T${b.updatedAtTime}`).getTime(),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Action",
      dataIndex: "x",
      render: () => {
        return <Button>Update</Button>;
      },
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

export default AcademicFaculty;
