import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
      title: "TroveShop - Admin",
      description: "TroveShop - Admin",
};

export default function RootAdminLayout({ children }) {

      return (
            <>
                  <AdminLayout>
                        {children}
                  </AdminLayout>
            </>
      );
}
