import { getSession } from "next-auth/react";


async function getAdminName() {
    const session = await getSession();
    return session?.user?.name || '';
}
export default getAdminName;