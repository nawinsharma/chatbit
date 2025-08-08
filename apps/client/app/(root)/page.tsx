"use client";
import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import { CoolMode } from "@/components/magicui/cool-mode";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BentoCard, BentoGrid, CARDS } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import MagicCard from "@/components/ui/magic-card";
import { authClient } from "@/lib/auth-client";
import { PROCESS, REVIEWS } from "@/utils/constants/misc"
import { ArrowRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";

const HomePage = () => {
	const { data: session } = authClient.useSession();
	const user = session?.user;
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleVideoClick = () => {
		if (videoRef.current) {
			if (document.fullscreenElement) {
				document.exitFullscreen();
			} else {
				videoRef.current.requestFullscreen().catch(console.error);
			}
		}
	};

	useEffect(() => {
		const videoElement = videoRef.current;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					if (videoElement) {
						videoElement.play().catch(console.error);
					}
				} else {
					if (videoElement) {
						videoElement.pause();
					}
				}
			},
			{
				threshold: 0.3, // Trigger when 30% of the video is visible
			}
		);

		if (videoElement) {
			observer.observe(videoElement);
		}

		return () => {
			if (videoElement) {
				observer.unobserve(videoElement);
			}
		};
	}, []);

	return (
		<div className="scrollbar-hide size-full overflow-x-hidden pt-24 bg-gradient-to-b from-background/100 to-background ">
			{/* Hero Section */}
			<MaxWidthWrapper>
				<div
					id="home"
					className="flex w-full flex-col items-center justify-center bg-gradient-to-b from-background/50 to-background text-center"
				>
					<AnimationContainer className="flex w-full flex-col items-center justify-center text-center">
						<Link
							href="https://github.com/nawinsharma/chatbit"
							target="_blank"
							className="group mt-5 relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(var(--muted))_inset] transition-colors duration-200 cursor-pointer"
						>
							<span>
								<span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
							</span>
							<span className="backdrop absolute inset-[1px] rounded-full bg-card transition-colors duration-200 group-hover:bg-muted/50" />
							<span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-primary/20 blur-md"></span>
							<span className="z-10  flex items-center justify-center gap-1 py-0.5 text-foreground text-sm">
								🚀 Introducing Chatbit
								<ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
							</span>
						</Link>
						<h1 className="!leading-[1.15] w-full text-balance py-6 text-center font-heading font-medium text-4xl text-foreground tracking-normal sm:text-5xl md:text-6xl lg:text-7xl">
							Next-Gen Scalable{" "}
							<span className="inline-block text-blue-600 dark:text-blue-400">
								Real Time Group Chat Platform
							</span>
						</h1>
						<p className="mb-12 text-balance text-lg text-muted-foreground tracking-tight md:text-xl">
							Connect instantly, scale infinitely. Build powerful group conversations
							<br className="hidden md:block" />
							<span className="hidden md:block">
								with enterprise-grade real-time messaging that never slows down.
							</span>
						</p>
						<div className="z-50 flex items-center justify-center gap-4 whitespace-nowrap">
							<Link
								href={user ? "/dashboard" : "/sign-in"}
								className="flex items-center text-white"
							>
									<ShimmerButton>
										<span className="flex items-center text-white">
											Start chatting for free
											<ArrowRightIcon className="ml-2 h-4 w-4" />
										</span>
									</ShimmerButton>
							</Link>
						</div>
					</AnimationContainer>

					<AnimationContainer
						delay={0.2}
						className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32"
					>
						<div className="gradient -translate-x-1/2 absolute inset-0 left-1/2 h-1/4 w-3/4 animate-image-glow blur-[5rem] md:top-[10%] md:h-1/3"></div>
						<div className="-m-2 lg:-m-4 rounded-xl bg-card/50 p-2 ring-1 ring-border backdrop-blur-3xl lg:rounded-2xl">
							<BorderBeam size={250} duration={12} delay={9} />
							<video
								ref={videoRef}
								src="https://ik.imagekit.io/3phdnlhoo3/compressed-video.mp4?updatedAt=1754672676873"
								className="rounded-md bg-muted/30 ring-1 ring-border lg:rounded-xl w-full h-auto cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all duration-200"
								muted
								loop
								playsInline
								poster="/assets/dashboard-dark.png"
								onClick={handleVideoClick}
								title="Click to view fullscreen"
							/>
							<div className="-bottom-4 absolute inset-x-0 z-40 h-1/2 w-full bg-gradient-to-t from-background" />
							<div className="md:-bottom-8 absolute inset-x-0 bottom-0 z-50 h-1/4 w-full bg-gradient-to-t from-background" />
						</div>
					</AnimationContainer>
				</div>
			</MaxWidthWrapper>

			{/* Companies Section */}
			{/* <MaxWidthWrapper>
				<AnimationContainer delay={0.4}>
					<div className="py-14">
						<div className="mx-auto px-4 md:px-8">
							<h2 className="text-center font-heading font-medium text-foreground/80 dark:text-muted-foreground text-sm uppercase tracking-wider">
								Trusted by the best in the industry
							</h2>
							<div className="mt-8">
								<ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 md:gap-x-16">
									{COMPANIES.map((company) => (
										<li key={company.name}>
											<Image
												src={company.logo}
												alt={company.name}
												width={80}
												height={80}
												quality={100}
												className="h-auto w-28 opacity-60 hover:opacity-100 transition-opacity duration-300 filter dark:brightness-100 brightness-0 dark:invert-0 invert"
											/>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</AnimationContainer>
			</MaxWidthWrapper> */}

			{/* Features Section */}
			<MaxWidthWrapper className="pt-10">
				<AnimationContainer delay={0.1}>
					<div
						id="features"
						className="flex w-full flex-col items-center justify-center py-8 lg:items-center"
					>
						<MagicBadge title="Features" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							Where Teams Connect, <br className="hidden sm:block" />
							Innovation Happens
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Chatbit transforms how teams communicate with lightning-fast messaging
							that scales from startups to enterprise giants.
						</p>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2}>
					<BentoGrid className="py-8">
						{CARDS.map((feature, idx) => (
							<BentoCard key={idx} {...feature} />
						))}
					</BentoGrid>
				</AnimationContainer>
			</MaxWidthWrapper>

			{/* Process Section */}
			<MaxWidthWrapper className="py-10">
				<AnimationContainer delay={0.1}>
					<div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
						<MagicBadge title="How It Works" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							From Zero to Hero in 3 Simple Steps
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Launch your first chat room in under 30 seconds and watch your team collaboration soar
						</p>
					</div>
				</AnimationContainer>
				<div className="grid w-full grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
					{PROCESS.map((process, id) => (
						<AnimationContainer delay={0.2 * id} key={id}>
							<MagicCard className="group md:py-8">
								<div className="flex w-full flex-col items-start justify-center">
									<process.icon
										strokeWidth={1.5}
										className="h-10 w-10 text-foreground"
									/>
									<div className="relative flex flex-col items-start">
										<span className="-top-6 absolute right-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border pt-0.5 font-medium text-2xl text-foreground">
											{id + 1}
										</span>
										<h3 className="mt-6 font-medium text-base text-foreground">
											{process.title}
										</h3>
										<p className="mt-2 text-muted-foreground text-sm">
											{process.description}
										</p>
									</div>
								</div>
							</MagicCard>
						</AnimationContainer>
					))}
				</div>
			</MaxWidthWrapper>

			{/* Reviews Section */}
			<MaxWidthWrapper className="py-10">
				<AnimationContainer delay={0.1}>
					<div
						id="testimonials"
						className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center"
					>
						<MagicBadge title="Our Customers" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							What our users are saying
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Here&apos;s what some of our users have to say about Writora.
						</p>
					</div>
				</AnimationContainer>
				<div className="grid grid-cols-1 place-items-start gap-4 py-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
					<div className="flex h-min flex-col items-start gap-6">
						{REVIEWS.slice(0, 3).map((review, index) => (
							<AnimationContainer delay={0.2 * index} key={index}>
								<MagicCard key={index} className="md:p-0">
									<Card className="flex h-min w-full flex-col border-none">
										<CardHeader className="space-y-0">
											<CardTitle className="font-medium text-lg text-muted-foreground">
												{review.name}
											</CardTitle>
											<CardDescription>{review.username}</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 pb-4">
											<p className="text-muted-foreground">{review.review}</p>
										</CardContent>
										<CardFooter className="mt-auto w-full space-x-1">
											{Array.from({ length: review.rating }, (_, i) => (
												<StarIcon
													key={i}
													className="h-4 w-4 fill-yellow-500 text-yellow-500"
												/>
											))}
										</CardFooter>
									</Card>
								</MagicCard>
							</AnimationContainer>
						))}
					</div>
					<div className="flex h-min flex-col items-start gap-6">
						{REVIEWS.slice(3, 6).map((review, index) => (
							<AnimationContainer delay={0.2 * index} key={index}>
								<MagicCard key={index} className="md:p-0">
									<Card className="flex h-min w-full flex-col border-none">
										<CardHeader className="space-y-0">
											<CardTitle className="font-medium text-lg text-muted-foreground">
												{review.name}
											</CardTitle>
											<CardDescription>{review.username}</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 pb-4">
											<p className="text-muted-foreground">{review.review}</p>
										</CardContent>
										<CardFooter className="mt-auto w-full space-x-1">
											{Array.from({ length: review.rating }, (_, i) => (
												<StarIcon
													key={i}
													className="h-4 w-4 fill-yellow-500 text-yellow-500"
												/>
											))}
										</CardFooter>
									</Card>
								</MagicCard>
							</AnimationContainer>
						))}
					</div>
					<div className="flex h-min flex-col items-start gap-6">
						{REVIEWS.slice(6, 9).map((review, index) => (
							<AnimationContainer delay={0.2 * index} key={index}>
								<MagicCard key={index} className="md:p-0">
									<Card className="flex h-min w-full flex-col border-none">
										<CardHeader className="space-y-0">
											<CardTitle className="font-medium text-lg text-muted-foreground">
												{review.name}
											</CardTitle>
											<CardDescription>{review.username}</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 pb-4">
											<p className="text-muted-foreground">{review.review}</p>
										</CardContent>
										<CardFooter className="mt-auto w-full space-x-1">
											{Array.from({ length: review.rating }, (_, i) => (
												<StarIcon
													key={i}
													className="h-4 w-4 fill-yellow-500 text-yellow-500"
												/>
											))}
										</CardFooter>
									</Card>
								</MagicCard>
							</AnimationContainer>
						))}
					</div>
				</div>
			</MaxWidthWrapper>

			{/* CTA Section */}
			<MaxWidthWrapper className="scrollbar-hide mt-20 max-w-[100vw] overflow-hidden">
				<AnimationContainer delay={0.1}>
					<LampContainer>
						<div className="relative flex w-full flex-col items-center justify-center text-center">
							<h2 className="!leading-[1.15] mt-8 text-blue-600 dark:text-blue-400 py-4 text-center font-heading font-medium text-4xl tracking-tight md:text-7xl">
								Ready to Transform <br />
								Your Team Communication?
							</h2>
							<p className="mx-auto mt-6 max-w-md text-muted-foreground">
								Join thousands of teams already using Chatbit to build stronger
								connections and achieve remarkable results together.
							</p>
							<div className="mt-6">
								<Link
									href={user ? "/dashboard" : "/sign-in"}
									className="flex items-center text-white"
								>
									<CoolMode>
										<ShimmerButton>
											<span className="flex items-center text-white">
												Create Your First Chat Room
												<ArrowRightIcon className="ml-2 h-4 w-4" />
											</span>
										</ShimmerButton>
									</CoolMode>
								</Link>
							</div>
						</div>
					</LampContainer>
				</AnimationContainer>
			</MaxWidthWrapper>
		</div>
	);
};

export default HomePage;
