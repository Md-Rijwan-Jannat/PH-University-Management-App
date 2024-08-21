import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IResponse, TAcademicFaculty } from "../../../types";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty, { isLoading }] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Faculty...");

    const academicFaculty = {
      name: data.name as string,
    };

    try {
      const res = (await addAcademicFaculty({
        academicFaculty,
      })) as IResponse<TAcademicFaculty>;

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
      } else {
        toast.success("Academic Faculty created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col xs={24} md={12} lg={10}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput
            label="Academic Faculty"
            name="name"
            type="text"
            placeholder="Enter Name"
          />
          <Button loading={isLoading} type="primary" danger htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
