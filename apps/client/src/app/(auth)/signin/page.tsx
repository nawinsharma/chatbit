import { SignInForm } from "@/components/signin";

export default function SignInPage() {
	return (
		<div className="flex min-h-svh w-full justify-center sm:items-center">
			<div className="size-full max-w-md px-2 py-10 sm:max-w-sm">
				<SignInForm />
			</div>
		</div>
	);
}
