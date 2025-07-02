import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return <div>Not logged in</div>;
    }

    return (
        <div>Dashboard</div>
    )
}
