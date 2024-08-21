import {
  Button,
  Dropdown,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { TRegisteredSemester, TQueryParams } from "../../../types";
import { useState } from "react";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateSemesterRegistrationStatusMutation,
} from "../../../redux/features/admin/courseManagement";
import moment from "moment";
import { items } from "../../../constants";

type TTableData = {
  key: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
};

const RegisteredSemester = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [semesterId, setSemesterId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const {
    data: registeredSemesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemesterQuery(params);

  const [updateRegistrationStatus] =
    useUpdateSemesterRegistrationStatusMutation();

  const tableData = registeredSemesterData?.data?.map(
    (registeredSemester: TRegisteredSemester) => ({
      key: registeredSemester._id,
      name: `${registeredSemester.academicSemester.name} ${registeredSemester.academicSemester.year}`,
      status: registeredSemester.status,
      startDate: moment(new Date(registeredSemester.startDate)).format("MMMM"),
      endDate: moment(new Date(registeredSemester.endDate)).format("MMMM"),
    })
  );

  const metaData = registeredSemesterData?.meta;

  const handleRegisteredStatus = (data: { key: string }) => {
    if (semesterId) {
      const updateData = {
        id: semesterId,
        data: {
          semesterRegistration: {
            status: data.key,
          },
        },
      };
      updateRegistrationStatus(updateData);
    }
  };

  const menuProps = {
    items,
    onClick: handleRegisteredStatus,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      onFilter: (value, record) => record.name === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["ascend", "descend"],
      onFilter: (value, record) => record.status === value,
      render: (_text, item) => {
        const color =
          item.status === "UPCOMING"
            ? "blue"
            : item.status === "ONGOING"
            ? "green"
            : "red"; // Use 'red' for ENDED
        return <Tag color={color}>{item.status}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_text, item) => (
        <Dropdown menu={menuProps} trigger={["click"]} placement="bottom" arrow>
          <Button onClick={() => setSemesterId(item.key)}>Update</Button>
        </Dropdown>
      ),
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

      if (filters.name) {
        filters.name.forEach((item) =>
          queryParams.push({ name: "name", value: `${item}` })
        );
      }

      if (filters.status) {
        filters.status.forEach((item) =>
          queryParams.push({ name: "status", value: `${item}` })
        );
      }

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
        style={{ marginTop: "24px", textAlign: "center" }}
        total={metaData?.total || 0}
        pageSize={metaData?.limit || 10}
        current={page}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default RegisteredSemester;
