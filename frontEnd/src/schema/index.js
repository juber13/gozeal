import * as Yup from "yup";

const certificateSchema = Yup.object({
  certificate: Yup.string().required("certificate is required"),
  issuer: Yup.string().required("Issuer is required"),
});

export default certificateSchema;
