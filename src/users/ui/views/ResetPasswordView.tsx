import ResetPasswordForm from "@/users/ui/components/ResetPasswordForm";
import RequestResetPasswordForm from "@/users/ui/components/RequestResetPasswordForm";
import { useSearchParams } from "react-router";

const ResetPasswordView = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <>
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <RequestResetPasswordForm />
      )}
    </>
  );
};

export default ResetPasswordView;
