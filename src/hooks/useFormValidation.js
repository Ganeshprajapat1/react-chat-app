import { useMemo, useState } from "react";

const useFormValidation = (
  initialValues,
  validationRules
) => {

  const [formData, setFormData] =
    useState(initialValues);

  const [errors, setErrors] = useState({});

  // Validate Single Field

  const validateField = (
    name,
    value,
    updatedForm
  ) => {

    const validator = validationRules[name];

    if (!validator) return "";

    return validator(value, updatedForm);
  };

  // Handle Change

  const handleChange = (e) => {

    const { name, value } = e.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedForm);

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(
        name,
        value,
        updatedForm
      ),
    }));

    // Confirm password depends on password
    if (
      name === "password" &&
      validationRules.confirmPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        password: validateField(
          "password",
          value,
          updatedForm
        ),
        confirmPassword: validateField(
          "confirmPassword",
          updatedForm.confirmPassword,
          updatedForm
        ),
      }));
    }

  };

  // Validate All

  const validateForm = () => {

    const newErrors = {};

    Object.keys(validationRules).forEach((field) => {

      newErrors[field] = validationRules[field](
        formData[field],
        formData
      );

    });

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  // Form Valid

  const isFormValid = useMemo(() => {

    const hasEmpty = Object.keys(validationRules)
      .some(
        (field) =>
          !String(formData[field] || "").trim()
      );

    if (hasEmpty) return false;

    return !Object.values(errors).some(Boolean);

  }, [formData, errors, validationRules]);

  return {
    formData,
    setFormData,

    errors,
    setErrors,

    handleChange,

    validateForm,

    isFormValid,
  };
};

export default useFormValidation;