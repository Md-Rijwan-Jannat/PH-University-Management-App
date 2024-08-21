import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Flex, Row } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { TAcademicDepartment, TAcademicSemester } from "../../../types";
import PHForm from "../../../components/form/PHForm";
import {
  bloodGroupOptions,
  ganderOptions,
  religionOptions,
} from "../../../constants";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagementApi";
import PHUpload from "../../../components/form/PHUpload";

const defaultValue = {
  name: {
    firstName: "Shamim",
    middleName: "Ahmed",
    lastName: "Chowdhury",
  },
  gander: "male",
  religion: "Islam",
  email: "shamimchowdhury@gmail.com",
  contactNo: "01787654321",
  emergencyContactNo: "01687654321",
  bloodGroup: "AB+",
  presentAddress: "55 Victory Lane, Khulna, Bangladesh",
  permanentAddress: "66 Freedom Road, Khulna, Bangladesh",
  guardian: {
    fatherName: "Mokhles Ahmed",
    fatherOccupation: "Lawyer",
    fatherContactNo: "01543210987",
    motherName: "Shabana Ahmed",
    motherOccupation: "Nurse",
    motherContactNo: "01787654321",
  },
  localGuardian: {
    name: "Nafis Ahmed",
    occupation: "Journalist",
    contactNo: "01634567890",
    address: "99 Guardian Street, Khulna, Bangladesh",
    email: "nafisahmed@gmail.com",
  },
  admissionSemester: "66a2fde7b052ff4b46ded6ba",
  academicDepartment: "66a2f777b052ff4b46ded69a",
};

const CreateStudent = () => {
  const [addStudent, { data, error, isLoading }] =
    useAddStudentMutation(undefined);

  const { data: sData, isLoading: sIsLoading } =
    useGetAllAcademicSemestersQuery(undefined);
  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentsQuery(undefined);

  console.log({ data, error });

  const academicSemesterOptions = sData?.data?.map(
    (item: TAcademicSemester) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })
  );

  const academicDepartmentOptions = dData?.data?.map(
    (item: TAcademicDepartment) => ({
      value: item._id,
      label: `${item.name}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: "Student03@",
      student: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data?.profileImage);

    addStudent(formData);

    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValue}>
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
                label="Emergency Contact No"
                name="emergencyContactNo"
                type="text"
                placeholder="Enter Emergency Contact No"
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
              <PHInput
                label="Present Address"
                name="presentAddress"
                type="text"
                placeholder="Enter Present Address"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Permanent Address"
                name="permanentAddress"
                type="text"
                placeholder="Enter Permanent Address"
              />
            </Col>
            <Divider>Guardian Info</Divider>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Father Name"
                name="guardian.fatherName"
                type="text"
                placeholder="Enter Father Name"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Father Occupation"
                name="guardian.fatherOccupation"
                type="text"
                placeholder="Enter Father Occupation"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Father Contact No"
                name="guardian.fatherContactNo"
                type="text"
                placeholder="Enter Father Contact No"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Mother Name"
                name="guardian.motherName"
                type="text"
                placeholder="Enter Mother Name"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Mother Occupation"
                name="guardian.motherOccupation"
                type="text"
                placeholder="Enter Mother Occupation"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Mother Contact No"
                name="guardian.motherContactNo"
                type="text"
                placeholder="Enter Mother Contact No"
              />
            </Col>
            <Divider>Local Guardian Info</Divider>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Local Guardian Name"
                name="localGuardian.name"
                type="text"
                placeholder="Enter Local Guardian Name"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Local Guardian Occupation"
                name="localGuardian.occupation"
                type="text"
                placeholder="Enter Local Guardian Occupation"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Local Guardian Contact No"
                name="localGuardian.contactNo"
                type="text"
                placeholder="Enter Local Guardian Contact No"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Local Guardian Address"
                name="localGuardian.address"
                type="text"
                placeholder="Enter Local Guardian Address"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Local Guardian Email"
                name="localGuardian.email"
                type="email"
                placeholder="Enter Local Guardian Email"
              />
            </Col>
            <Divider>Academic Info</Divider>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Admission Semester"
                disabled={sIsLoading}
                name="admissionSemester"
                options={academicSemesterOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Academic Department"
                disabled={dIsLoading}
                name="academicDepartment"
                options={academicDepartmentOptions}
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

export default CreateStudent;
