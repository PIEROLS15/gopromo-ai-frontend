import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactService } from "@/services/contact.service";
import { getErrorMessage } from "@/services/validation/formUtils";
import {
  contactSchema,
  type ContactFormData,
} from "@/services/validation/contact.schema";

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const submitContact = async (data: ContactFormData) => {
    setApiError(null);
    setLoading(true);
    try {
      const response = await ContactService.create(data);
      setIsSubmitted(true);
      setSuccessMessage(response.message);
      return response;
    } catch (error: unknown) {
      setApiError(getErrorMessage(error, "Error al enviar mensaje"));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetSubmission = () => {
    setIsSubmitted(false);
    setApiError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    const response = await submitContact(data);
    if (response) {
      form.reset();
    }
  });

  return {
    handleSubmit,
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    loading,
    apiError,
    isSubmitted,
    successMessage,
    resetSubmission,
  };
};
