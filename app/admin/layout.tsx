'use client'
import { Suspense } from "react";
import { Layout } from "@/components/layout/layout";

const AdminLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Layout>
                {children}
            </Layout>
        </Suspense>
    );
}

export default AdminLayout;