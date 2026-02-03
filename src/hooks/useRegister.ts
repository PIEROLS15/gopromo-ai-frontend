import { RegisterService } from "@/services/register.service";
import {
  PublicRegisterPayload,
  ProviderRegisterPayload,
} from "@/types/register";
import { useAuth } from "@/hooks/useAuth";

export const useRegister = () => {
  const { refreshSession } = useAuth();

  const registerPublic = async (
    data: Omit<PublicRegisterPayload, "roleId">
  ) => {
    const res = await RegisterService.registerPublic(data);
    await refreshSession(); // cookie ya existe
    return res;
  };

  const registerProvider = async (
    data: Omit<ProviderRegisterPayload, "roleId">
  ) => {
    const res = await RegisterService.registerProvider(data);
    await refreshSession();
    return res;
  };

  return {
    registerPublic,
    registerProvider,
  };
};

