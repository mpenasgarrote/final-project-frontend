import { Outlet } from '@remix-run/react';
import MainFooter from '~/components/navigation/MainFooter';
import MainHeader from '~/components/navigation/MainHeader';

export default function MainPageLayout(): JSX.Element {
	return (
		<div className="flex flex-col min-h-screen">
			<link
				href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
				rel="stylesheet"
			/>
			<MainHeader />
			<main className="flex-grow">
				<Outlet />
			</main>
			<MainFooter />
		</div>
	);
}
