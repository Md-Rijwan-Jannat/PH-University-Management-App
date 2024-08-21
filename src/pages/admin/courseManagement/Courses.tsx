import { Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { TCourse, TQueryParams } from "../../../types";
import { useState } from "react";
import { useGetAllPreRequisitesCoursesQuery } from "../../../redux/features/admin/courseManagement";
import AssignFacultyModal from "../../../components/ui/modal/academicModal/AddFacultyModal";
import RemoveFacultyModal from "../../../components/ui/modal/academicModal/RemoveFacultyModal";

type TTableData = {
  key: string;
  title: string;
  prefix: string;
  code: string;
};

const Courses = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: CoursesData,
    isLoading,
    isFetching,
  } = useGetAllPreRequisitesCoursesQuery([
    {
      name: "page",
      value: page,
    },
    {
      name: "sort",
      value: "code",
    },
    ...params,
  ]);

  const tableData = CoursesData?.data?.map((course: TCourse) => ({
    key: course._id,
    title: course.title,
    prefix: course.prefix,
    code: course.code,
  }));

  const metaData = CoursesData?.meta;
  console.log({ metaData });

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
      sorter: (a, b) => a.prefix.localeCompare(b.prefix),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_text, item) => (
        <Space>
          <AssignFacultyModal courseId={item.key} />
          <RemoveFacultyModal courseId={item.key} />
        </Space>
      ),
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

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
        showSorterTooltip={{ title: "Click to sort" }}
        pagination={false}
      />
      <Pagination
        align="center"
        total={metaData?.total || 0}
        pageSize={metaData?.limit || 10}
        current={page}
        onChange={(value) => setPage(value)}
        style={{ marginTop: "24px" }}
      />
    </>
  );
};

export default Courses;
