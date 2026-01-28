import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
      title: "TroveShop - Store Dashboard",
      description: "TroveShop - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

      return (
            <>
                  <StoreLayout>
                        {children}
                  </StoreLayout>
            </>
      );
}
