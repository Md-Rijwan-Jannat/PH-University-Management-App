import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Flex, Row } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHForm from "../../../components/form/PHForm";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHUpload from "../../../components/form/PHUpload";
import {
  ganderOptions,
  religionOptions,
  bloodGroupOptions,
} from "../../../constants";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagementApi";

const defaultAdminValues = {
  name: {
    firstName: "Admin",
    middleName: "User",
    lastName: "Smith",
  },
  gander: "female",
  religion: "Hindu",
  bloodGroup: "A+",
  email: "admin.user@university.com",
  contactNo: "0123456789",
  emergencyNo: "0987654321",
  occupation: "System Admin",
  presentAddress: "123 Admin Street",
  permanentAddress: "456 Admin Lane",
  profileImage: "",
};

const CreateAdmin = () => {
  const [addAdmin, { data, error, isLoading }] = useAddAdminMutation(undefined);

  console.log("admin created", { data, error });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const adminData = {
      password: "Admin03@",
      admin: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data?.profileImage);

    addAdmin(formData);

    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Row>
        <Col span={24}>
          <PHForm onSubmit={onSubmit} defaultValues={defaultAdminValues}>
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
                <PHSelect
                  label="Gander"
                  name="gander"
                  options={ganderOptions}
                />
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
              <Divider>Professional Info</Divider>
              <Col xs={24} md={12} lg={8}>
                <PHInput
                  label="Occupation"
                  name="occupation"
                  type="text"
                  placeholder="Enter Occupation"
                />
              </Col>
            </Row>
            <Button loading={isLoading} type="primary" danger htmlType="submit">
              Submit
            </Button>
          </PHForm>
        </Col>
      </Row>
    </Flex>
  );
};

export default CreateAdmin;
