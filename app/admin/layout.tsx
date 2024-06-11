'use client'
import { Layout } from "@/components/layout/layout";

const AdminLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <Layout>
            {children}
        </Layout>
    );
}

export default AdminLayout;