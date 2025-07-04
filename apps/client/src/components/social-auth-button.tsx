"use client";

import { Button } from "@repo/ui";
import { ComponentProps } from "react";

const GoogleSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px" height="25px"></svg>
)
const providerConfig = {
	google: {
		icon: GoogleSvg,
		name: "Google",
	},
} as const;

export type SocialProvider = "google";
export type AuthAction = "signin" | "signup";

export interface SocialAuthButtonProps extends Omit<ComponentProps<typeof Button>, "children" | "variant" | "type"> {
	provider: SocialProvider;
	action: AuthAction;
}
export function SocialAuthButton({ provider, action, ...props }: SocialAuthButtonProps) {
	const config = providerConfig[provider];
	const IconComponent = config.icon;

	const getActionText = () => {
		return action === "signin" ? `Sign in with ${config.name}` : `Continue with ${config.name}`;
	};

	return (
		<Button
			variant="outline"
			type="button"
			className="w-full cursor-pointer justify-between shadow-lg shadow-blue-600/10 transition-all duration-300 hover:shadow-blue-600/20"
			{...props}
		>
			<IconComponent />
			{getActionText()}
			<div className="w-[0.98em]" />
		</Button>
	);
}
