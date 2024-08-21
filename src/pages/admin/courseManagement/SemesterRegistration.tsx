import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Divider, Flex, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { IResponse, TAcademicSemester } from "../../../types";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { statusOptions } from "../../../constants";

const SemesterRegistration = () => {
  const [addSemesterRegistration, { data, error, isLoading }] =
    useAddSemesterRegistrationMutation();

  console.log({ data, error });

  const { data: academicSemester } = useGetAllAcademicSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map(
    (item: TAcademicSemester) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering Semester...");
    const semesterRegistration = {
      ...data,
      maxCredits: Number(data.maxCredits),
      minCredits: Number(data.minCredits),
    };

    const semesterRegistrationData = {
      semesterRegistration,
    };

    try {
      const res = (await addSemesterRegistration(
        semesterRegistrationData
      )) as IResponse<any>;
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
      } else {
        toast.success("Academic Semester created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Row gutter={10}>
            <Divider>Semester Registration</Divider>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                label="Academic Semester"
                name="academicSemester"
                options={academicSemesterOptions}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect label="Status" name="status" options={statusOptions} />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHDatePicker label="Start Date" name="startDate" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHDatePicker label="End Date" name="endDate" />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Max Credits"
                name="maxCredits"
                placeholder="ENter Max Credits"
                type="number"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Min Credits"
                name="minCredits"
                placeholder="ENter Min Credits"
                type="number"
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

export default SemesterRegistration;
