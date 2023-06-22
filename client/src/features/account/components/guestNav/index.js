import withPopup from "@/hoc/popup/withPopup";
import RegistrationForm from "@/hoc/forms/registrationForm/index";
import LoginForm from "@/hoc/forms/loginForm/index";

const EnhancedRegistrationFormPopup = withPopup(RegistrationForm, "Sign up");
const EnhancedLoginFormPopup = withPopup(LoginForm, "Log in");

function GuestNav() {
  return (
    <div className="guest__account__nav">
      <EnhancedRegistrationFormPopup />
      <EnhancedLoginFormPopup />
    </div>
  );
}

export default GuestNav;
