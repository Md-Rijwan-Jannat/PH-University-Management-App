import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Flex, Row } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHForm from "../../../components/form/PHForm";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHUpload from "../../../components/form/PHUpload";
import { TAcademicDepartment, TAcademicFaculty } from "../../../types";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagementApi";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import {
  occupationOptions,
  ganderOptions,
  religionOptions,
  bloodGroupOptions,
} from "../../../constants";

const defaultFacultyValues = {
  name: {
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
  },
  gander: "male",
  religion: "Christian",
  bloodGroup: "O+",
  email: "john.doe@university.com",
  contactNo: "0123456789",
  emergencyNo: "0987654321",
  occupation: "Lecturer",
  presentAddress: "123 University Street",
  permanentAddress: "456 Faculty Lane",
  academicDepartment: "66a2f777b052ff4b46ded69a",
  academicFaculty: "66a2f777b052ff4b46ded69b",
  profileImage: "",
};

const CreateFaculty = () => {
  const [addFaculty, { data, error, isLoading }] =
    useAddFacultyMutation(undefined);

  console.log("Faculty", { data, error });

  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentsQuery(undefined);

  const academicDepartmentOptions = dData?.data?.map(
    (item: TAcademicDepartment) => ({
      value: item._id,
      label: `${item.name}`,
    })
  );

  const academicFacultyOptions = dData?.data?.map((item: TAcademicFaculty) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      password: "Faculty03@",
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data?.profileImage);

    addFaculty(formData);

    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultFacultyValues}>
          <Row gutter={10}>
            <Divider>Personal Info</Divider>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="First Name"
                name="name.firstName"
                type="text"
                placeholder="Enter First Name"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Middle Name"
                name="name.middleName"
                type="text"
                placeholder="Enter Middle Name"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Last Name"
                name="name.lastName"
                type="text"
                placeholder="Enter Last Name"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect label="Gander" name="gander" options={ganderOptions} />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHDatePicker label="Date Of Birth" name="dateOfBirth" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Religion"
                name="religion"
                options={religionOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Blood Group"
                name="bloodGroup"
                options={bloodGroupOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHUpload label="Upload Profile Image" name="profileImage" />
            </Col>
            <Divider>Contact Info</Divider>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter Email"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Contact No"
                name="contactNo"
                type="text"
                placeholder="Enter Contact No"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Emergency No"
                name="emergencyNo"
                type="text"
                placeholder="Enter Emergency No"
              />
            </Col>
            <Divider>Academic Info</Divider>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Occupation"
                name="occupation"
                options={occupationOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Department"
                disabled={dIsLoading}
                name="academicDepartment"
                options={academicDepartmentOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Faculty"
                disabled={dIsLoading}
                name="academicFaculty"
                options={academicFacultyOptions}
              />
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

export default CreateFaculty;
