import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, verifyAdminSession } from "@/lib/auth/session";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifyAdminSession(sessionCookie);

  if (!session) {
    redirect("/administrator/login");
  }

  return (
    <div className="admin-area flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 px-4 py-6 sm:px-8 sm:py-10">{children}</main>
    </div>
  );
}
