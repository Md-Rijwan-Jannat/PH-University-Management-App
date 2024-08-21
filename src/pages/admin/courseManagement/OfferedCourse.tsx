import { Button, Col, Divider, Flex, Row } from "antd";
import { FC, useState } from "react";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
  TAcademicFaculty,
  TAcademicSemester,
  TCourse,
  TFaculty,
  TRegisteredSemester,
} from "../../../types";
import PHInput from "../../../components/form/PHInput";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import {
  useAddOfferedCourseMutation,
  useGetAllAssignFacultiesQuery,
  useGetAllPreRequisitesCoursesQuery,
  useGetAllRegisteredSemesterQuery,
} from "../../../redux/features/admin/courseManagement";
import PHSelect from "../../../components/form/PHSelect";
import { daysOptions } from "../../../constants";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { toast } from "sonner";
import moment from "moment";

type TOfferedCourseProps = object;

const OfferedCourse: FC<TOfferedCourseProps> = () => {
  const [courseId, setCourseId] = useState<string>("");

  const { data: registeredSemesters } = useGetAllAcademicFacultiesQuery([
    { name: "sort", value: "createdAt" },
  ]);

  const academicFacultiesOptions = registeredSemesters?.data?.map(
    (item: TAcademicFaculty) => ({
      value: item._id,
      label: item.name,
    })
  );

  const { data: academicFaculties } = useGetAllRegisteredSemesterQuery([
    { name: "sort", value: "code" },
  ]);

  const semesterRegistrationOptions = academicFaculties?.data?.map(
    (item: TRegisteredSemester) => ({
      value: item._id,
      label: item.academicSemester.name,
    })
  );

  const { data: academicDepartment } = useGetAllAcademicDepartmentsQuery([
    { name: "sort", value: "year" },
  ]);

  const academicDepartmentOptions = academicDepartment?.data?.map(
    (item: TAcademicSemester) => ({
      value: item._id,
      label: item.name,
    })
  );

  const { data: courses } = useGetAllPreRequisitesCoursesQuery([
    { name: "sort", value: "year" },
  ]);

  const coursesOptions = courses?.data?.map((item: TCourse) => ({
    value: item._id,
    label: item.title,
  }));

  const { data: facultiesData, isFetching: isFetchingFaculties } =
    useGetAllAssignFacultiesQuery(courseId, { skip: !courseId });

  const facultiesOptions = facultiesData?.data?.faculties?.map(
    (item: TFaculty) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  const [addOfferedCourse, { data, error, isLoading }] =
    useAddOfferedCourseMutation();
  console.log({ data, error });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourse = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      session: Number(data.session),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    const offeredCourseData = { offeredCourse };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  if (data?.success === true) {
    toast.success(data?.message);
  }

  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Row gutter={10}>
            <Divider>Create Offered Course</Divider>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Semester Registrations"
                name="semesterRegistration"
                options={semesterRegistrationOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Academic Faculties"
                name="academicFaculty"
                options={academicFacultiesOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Academic Department"
                name="academicDepartment"
                options={academicDepartmentOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelectWithWatch
                onValueChange={setCourseId}
                label="Courses"
                name="course"
                options={coursesOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Faculties"
                name="faculty"
                options={facultiesOptions} // Update options based on selected course
                disabled={!courseId || isFetchingFaculties}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                mode="multiple"
                label="Days"
                name="days"
                options={daysOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Max Capacity"
                name="maxCapacity"
                placeholder="Max Capacity"
                type="number"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Session"
                name="session"
                placeholder="Session"
                type="number"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHTimePicker label="Start Time" name="startTime" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHTimePicker label="End Time" name="endTime" />
            </Col>
          </Row>
          <Button loading={isLoading} type="primary" danger htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferedCourse;
