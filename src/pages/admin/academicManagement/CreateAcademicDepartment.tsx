import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  IResponse,
  TAcademicDepartment,
  TAcademicFaculty,
} from "../../../types";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment, { isLoading }] =
    useAddAcademicDepartmentMutation();
  const { data: academicFaculties } =
    useGetAllAcademicFacultiesQuery(undefined);

  const { setValue } = useForm({
    resolver: zodResolver(academicDepartmentSchema),
    defaultValues: {
      name: "",
      academicFaculty: "",
    },
  });

  // Prepare options for PHSelect
  const nameOptions =
    academicFaculties?.data?.map((faculty: TAcademicFaculty) => ({
      value: faculty._id,
      label: faculty.name,
    })) || [];

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Department...");

    const academicDepartment = {
      name: data.name as string,
      academicFaculty: data.academicFaculty as string,
    };

    try {
      const res = (await addAcademicDepartment({
        academicDepartment,
      })) as IResponse<TAcademicDepartment>;

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
      } else {
        toast.success("Academic Department created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // Update form value when a select option is chosen
  const handleSelectChange = (value: string) => {
    setValue("academicFaculty", value); // Update form value
  };

  return (
    <Flex justify="center" align="center">
      <Col xs={24} md={12} lg={10}>
        <PHForm onSubmit={onSubmit}>
          <PHInput
            label="Academic Department"
            name="name"
            type="text"
            placeholder="Enter Name"
          />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={nameOptions}
            onChange={handleSelectChange}
          />
          <Button loading={isLoading} type="primary" danger htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
