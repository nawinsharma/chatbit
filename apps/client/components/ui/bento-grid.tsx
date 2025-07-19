import { buttonVariants } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
	ArrowRightIcon,
	MessageSquareIcon,
	UsersIcon,
	ZapIcon,
	ShieldIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./card";
import { Input } from "./input";
import { Label } from "./label";

export const CARDS = [
	{
		Icon: MessageSquareIcon,
		name: "Instant Messaging",
		description: "Real-time chat with zero latency powered by Socket.io infrastructure.",
		href: "#",
		cta: "Start Chatting",
		className: "col-span-3 lg:col-span-1",
		background: (
			<Card className="absolute top-10 left-10 origin-top rounded-none rounded-tl-md border border-border border-r-0 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105">
				<CardHeader>
					<CardTitle>Live Chat Room</CardTitle>
					<CardDescription>
						Messages appear instantly across all connected devices.
					</CardDescription>
				</CardHeader>
				<CardContent className="-mt-4">
					<Label>Type your message</Label>
					<Input
						type="text"
						placeholder="Hello team! 👋"
						className="w-full focus-visible:ring-0 focus-visible:ring-transparent"
					/>
					<div className="mt-2 text-xs text-muted-foreground">
						✓ Delivered • Just now
					</div>
				</CardContent>
			</Card>
		),
	},
	{
		Icon: UsersIcon,
		name: "Group Management",
		description:
			"Create unlimited group chats with secure passcode protection and instant sharing.",
		href: "#",
		cta: "Create Group",
		className: "col-span-3 lg:col-span-2",
		background: (
			<Command className="group-hover:-translate-x-10 absolute top-10 right-10 w-[70%] origin-to translate-x-0 border border-border p-2 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
				<Input placeholder="Search group members..." />
				<div className="mt-1 cursor-pointer">
					<div className="rounded-md px-4 py-2 hover:bg-muted flex items-center gap-2">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Alex Johnson (Online)
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted flex items-center gap-2">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Sarah Chen (Online)
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted flex items-center gap-2">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Mike Rodriguez (Online)
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted flex items-center gap-2">
						<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
						Emma Wilson (Away)
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted flex items-center gap-2">
						<div className="w-2 h-2 bg-gray-500 rounded-full"></div>
						David Kim (Offline)
					</div>
				</div>
			</Command>
		),
	},
	{
		Icon: ZapIcon,
		name: "Lightning Fast Performance",
		description: "Redis caching and Kafka message queuing for enterprise-grade speed.",
		href: "#",
		cta: "See Performance",
		className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
		background: (
			<div className="absolute top-4 right-2 h-[300px] w-[600px] border-none pl-28 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 md:pl-0">
				<div className="flex flex-col gap-4 p-6">
					<div className="flex items-center gap-3">
						<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
						<span className="text-sm">Socket.io Connected</span>
					</div>
					<div className="flex items-center gap-3">
						<div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
						<span className="text-sm">Redis Cache: 0.2ms</span>
					</div>
					<div className="flex items-center gap-3">
						<div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
						<span className="text-sm">Kafka Queue: Active</span>
					</div>
					<div className="mt-4 p-3 bg-muted/50 rounded-lg">
						<div className="text-xs text-muted-foreground">Message Delivery</div>
						<div className="text-lg font-bold text-green-500">99.9% • &lt;100ms</div>
					</div>
				</div>
			</div>
		),
	},
	{
		Icon: ShieldIcon,
		name: "Secure & Reliable",
		description: "Enterprise-grade security with Better Auth and encrypted messaging.",
		className: "col-span-3 lg:col-span-1",
		href: "#",
		cta: "Learn Security",
		background: (
			<div className="absolute top-10 right-0 origin-top rounded-md border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105 p-4">
				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<ShieldIcon className="w-4 h-4 text-green-500" />
						<span className="text-xs">End-to-End Encryption</span>
					</div>
					<div className="flex items-center gap-2">
						<ShieldIcon className="w-4 h-4 text-green-500" />
						<span className="text-xs">Secure Authentication</span>
					</div>
					<div className="flex items-center gap-2">
						<ShieldIcon className="w-4 h-4 text-green-500" />
						<span className="text-xs">Data Protection</span>
					</div>
					<div className="flex items-center gap-2">
						<ShieldIcon className="w-4 h-4 text-green-500" />
						<span className="text-xs">GDPR Compliant</span>
					</div>
				</div>
			</div>
		),
	},
];

const BentoGrid = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
				className,
			)}
		>
			{children}
		</div>
	);
};

const BentoCard = ({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta,
}: {
	name: string;
	className: string;
	background: ReactNode;
	Icon: React.ComponentType<{ className?: string }>;
	description: string;
	href: string;
	cta: string;
}) => (
	<div
		key={name}
		className={cn(
			"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-border/60",
			"bg-card dark:bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
			className,
		)}
	>
		<div>{background}</div>
		<div className="group-hover:-translate-y-10 pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300">
			<Icon className="h-12 w-12 origin-left text-foreground/70 dark:text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
			<h3 className="font-semibold text-foreground dark:text-neutral-300 text-xl">{name}</h3>
			<p className="max-w-lg text-muted-foreground dark:text-neutral-400">{description}</p>
		</div>

		<div
			className={cn(
				"absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
			)}
		>
			<Link
				href={href}
				className={buttonVariants({
					size: "sm",
					variant: "ghost",
					className: "cursor-pointer text-foreground hover:text-foreground dark:text-neutral-300 dark:hover:text-white",
				})}
			>
				{cta}
				<ArrowRightIcon className="ml-2 h-4 w-4" />
			</Link>
		</div>
		<div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
	</div>
);

export { BentoCard, BentoGrid };
