import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthsOptions, nameOptions, yearOptions } from "../../../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas";
import { toast } from "sonner";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { IResponse, TAcademicSemester } from "../../../types";

const CreateAcademicSemester = () => {
  const [addAcademicSemester, { isLoading }] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Semester...");
    const name = nameOptions[Number(data?.name) - 1]?.label;
    const semester = {
      name: name,
      year: data.year,
      code: data.name,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    const semesterData = {
      semester,
    };

    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as IResponse<TAcademicSemester>;
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
      <Col xs={24} md={12} lg={10}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={nameOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthsOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthsOptions} />
          <Button loading={isLoading} type="primary" danger htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
