import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TQueryParams } from "../../../types";
import { useState } from "react";

type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllAcademicSemestersQuery(params);

  const tableData = semesterData?.data?.map(
    (semester: TAcademicSemester, index: number) => ({
      key: index,
      name: semester.name,
      year: semester.year,
      startMonth: semester.startMonth,
      endMonth: semester.endMonth,
    })
  );

  console.log(isFetching, isLoading);

  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
      title: "Year",
      dataIndex: "year",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => Number(a.year) - Number(b.year),
      sortDirections: ["ascend", "descend"],
      filters: Array.from(
        new Set(tableData?.map((item: { year: string }) => item.year))
      ).map((year) => ({
        text: year as string,
        value: year as string,
      })),
      onFilter: (value, record) => record.year === value,
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) =>
        monthOrder.indexOf(a.startMonth) - monthOrder.indexOf(b.startMonth),
      sortDirections: ["ascend", "descend"],
      filters: monthOrder.map((month) => ({
        text: month,
        value: month,
      })),
      onFilter: (value, record) => record.startMonth === value,
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) =>
        monthOrder.indexOf(a.endMonth) - monthOrder.indexOf(b.endMonth),
      sortDirections: ["ascend", "descend"],
      filters: monthOrder.map((month) => ({
        text: month,
        value: month,
      })),
      onFilter: (value, record) => record.endMonth === value,
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
