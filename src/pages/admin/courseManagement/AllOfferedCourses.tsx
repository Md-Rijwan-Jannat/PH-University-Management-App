import { Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { TOfferedCourse, TQueryParams } from "../../../types";
import { useState } from "react";
import { useGetAllOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement";
import UpdateOfferedCourseModal from "../../../components/ui/modal/courseManagementNodal/UpdateOfferedCourseModal";
import DeleteOfferedCourseModal from "../../../components/ui/modal/courseManagementNodal/DeleteOfferedCourseModal";

type TTableData = {
  key: string;
  semesterName: string;
  departmentName: string;
  academicFacultyName: string;
  facultyName: string;
};

const AllOfferedCourses = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: OfferedCoursesData,
    isLoading,
    isFetching,
  } = useGetAllOfferedCoursesQuery([
    {
      name: "page",
      value: page,
    },
    {
      name: "sort",
      value: "createdAt",
    },
    ...params,
  ]);

  const tableData = OfferedCoursesData?.data?.map((course: TOfferedCourse) => ({
    key: course._id,
    semesterName: course.academicSemester.name,
    departmentName: course.academicDepartment.name,
    academicFacultyName: course.academicFaculty.name,
    facultyName: course.faculty.fullName,
  }));

  const metaData = OfferedCoursesData?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Semester Name",
      dataIndex: "semesterName",
      key: "semesterName",
      sorter: (a, b) => a.semesterName.localeCompare(b.semesterName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Department Name",
      dataIndex: "departmentName",
      key: "departmentName",
      sorter: (a, b) => a.departmentName.localeCompare(b.departmentName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Academic Faculty Name",
      dataIndex: "academicFacultyName",
      key: "academicFacultyName",
      sorter: (a, b) =>
        a.academicFacultyName.localeCompare(b.academicFacultyName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Faculty Name",
      dataIndex: "facultyName",
      key: "facultyName",
      sorter: (a, b) => a.facultyName.localeCompare(b.facultyName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_text, item) => (
        <Space>
          <UpdateOfferedCourseModal offeredCourseId={item.key} />
          <DeleteOfferedCourseModal offeredCourseId={item.key} />
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

export default AllOfferedCourses;
