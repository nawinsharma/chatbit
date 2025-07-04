"use client";

import { useSignIn } from "@/hooks/useAuth";
import { SocialAuthButton } from "./social-auth-button";

export function SignInForm() {
	const { signInWithGoogleProvider } = useSignIn();

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4">
				<SocialAuthButton provider="google" action="signin" onClick={signInWithGoogleProvider} />
			</div>
		</div>
	);
}
