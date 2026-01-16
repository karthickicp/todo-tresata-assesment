import * as yup from "yup";

export const todoValidationSchema = yup.object().shape({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
});
