import { Outlet } from "@remix-run/react";

export default function ExpenseAppLayout(): JSX.Element {
    return (
        <>
            {/* <MainHeader /> */}
            <Outlet />
        </>
    )
}