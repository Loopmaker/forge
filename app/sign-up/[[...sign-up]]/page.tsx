import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen paper-grid flex items-center justify-center">
      <SignUp />
    </div>
  );
}
