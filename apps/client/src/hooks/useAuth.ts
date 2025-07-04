import { authClient } from "@repo/auth/auth-client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface AuthState {
	isLoading: boolean;
	error: string | null;
}
export const signInWithGoogle = async () => {
	await authClient.signIn.social({
		provider: "google",
		callbackURL: process.env.NEXT_PUBLIC_CALLBACK_URL,
	});
};

export const useGoogleAuth = () => {
	const [isLoading, setIsLoading] = useState(false);

	const signInWithGoogleProvider = useCallback(async () => {
		setIsLoading(true);
		try {
			toast.promise(signInWithGoogle(), {
				loading: "Signing in with Google...",
				success: "Signed in with Google",
				error: error => (error instanceof Error ? error.message : "Google authentication failed"),
			});
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Google authentication failed";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { signInWithGoogleProvider, isLoading };
};

export const useSignIn = () => {
	const { signInWithGoogleProvider } = useGoogleAuth();

	return {
		signInWithGoogleProvider,
	};
};

export const useSignOut = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const signOut = useCallback(async () => {
		setIsLoading(true);
		try {
			toast.promise(
				authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							router.push("/");
							router.refresh();
						},
						onError: ctx => {
							throw ctx.error;
						},
					},
				}),
				{
					loading: "Signing you out...",
					success: "Signed out successfully",
					error: error => (error instanceof Error ? error.message : "Sign out failed"),
				}
			);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Sign out failed";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [router]);

	return {
		signOut,
		isLoading,
	};
};