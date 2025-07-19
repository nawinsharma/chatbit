import { MessageSquareIcon, Users, LinkIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL =
	"https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
	{
		name: "Discord",
		logo: "/assets/company-01.svg",
	},
	{
		name: "Slack",
		logo: "/assets/company-02.svg",
	},
	{
		name: "Microsoft",
		logo: "/assets/company-03.svg",
	},
	{
		name: "Zoom",
		logo: "/assets/company-04.svg",
	},
	{
		name: "Meta",
		logo: "/assets/company-05.svg",
	},
	{
		name: "WhatsApp",
		logo: "/assets/company-06.svg",
	},
] as const;

export const PROCESS = [
	{
		title: "Create Group Chat",
		description:
			"Instantly create a group chat room with a unique link. Set up your chat space in seconds with secure passcode protection.",
		icon: MessageSquareIcon,
	},
	{
		title: "Invite & Connect",
		description:
			"Share the chat group link with your team or friends. Real-time messaging powered by Socket.io for instant communication.",
		icon: Users,
	},
	{
		title: "Scale & Share",
		description:
			"Built with Redis and Kafka for horizontal scaling. Handle millions of messages with enterprise-grade infrastructure.",
		icon: LinkIcon,
	},
] as const;

export const FEATURES = [
	{
		title: "Real-time messaging",
		description: "Socket.io powered instant messaging with zero latency.",
	},
	{
		title: "Group chat rooms",
		description: "Create unlimited group chats with unique shareable links.",
	},
	{
		title: "Secure authentication",
		description: "Better Auth integration with secure user management.",
	},
	{
		title: "Message persistence",
		description: "All messages stored in PostgreSQL with Redis caching.",
	},
	{
		title: "Horizontal scaling",
		description: "Kafka message brokering for handling massive scale.",
	},
	{
		title: "Modern tech stack",
		description: "Built with Next.js, Turborepo, and cutting-edge technologies.",
	},
] as const;

export const REVIEWS = [
	{
		name: "Sarah Chen",
		username: "@sarahchen",
		avatar: "https://randomuser.me/api/portraits/women/1.jpg",
		rating: 5,
		review:
			"Amazing real-time chat app! The group sharing feature is incredibly smooth and the message delivery is instant.",
	},
	{
		name: "Alex Rodriguez",
		username: "@alexrodriguez",
		avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		rating: 5,
		review:
			"Perfect for our team communications. The scalability is impressive - handles thousands of messages without any lag!",
	},
	{
		name: "Jennifer Wu",
		username: "@jenniferwu",
		avatar: "https://randomuser.me/api/portraits/women/2.jpg",
		rating: 4,
		review:
			"Love how easy it is to share chat group links. The authentication system is solid and the UI is clean and intuitive.",
	},
	{
		name: "David Kim",
		username: "@davidkim",
		avatar: "https://randomuser.me/api/portraits/men/2.jpg",
		rating: 5,
		review:
			"The real-time messaging is flawless. Great for coordinating with remote teams across different time zones.",
	},
	{
		name: "Maria Santos",
		username: "@mariasantos",
		avatar: "https://randomuser.me/api/portraits/women/3.jpg",
		rating: 5,
		review:
			"Impressed by the technical architecture. Redis and Kafka integration makes this incredibly fast and reliable.",
	},
	{
		name: "Ryan Taylor",
		username: "@ryantaylor",
		avatar: "https://randomuser.me/api/portraits/men/3.jpg",
		rating: 4,
		review:
			"Best group chat solution I've used. The instant link sharing feature is a game-changer for quick collaborations.",
	},
	{
		name: "Lisa Zhang",
		username: "@lisazhang",
		avatar: "https://randomuser.me/api/portraits/women/4.jpg",
		rating: 5,
		review:
			"Excellent performance even with large groups. The message persistence means we never lose important conversations.",
	},
	{
		name: "Michael Johnson",
		username: "@michaeljohnson",
		avatar: "https://randomuser.me/api/portraits/men/4.jpg",
		rating: 4,
		review:
			"Modern tech stack really shows. Lightning fast, secure, and scales beautifully. Perfect for growing teams.",
	},
	{
		name: "Priya Patel",
		username: "@priyapatel",
		avatar: "https://randomuser.me/api/portraits/women/5.jpg",
		rating: 5,
		review:
			"The Socket.io integration is seamless. Real-time updates work perfectly and the group management is intuitive.",
	},
] as const;
