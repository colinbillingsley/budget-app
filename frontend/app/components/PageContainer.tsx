import React, { ReactNode } from "react";

const PageContainer = ({ children }: { children?: ReactNode }) => {
	return (
		<div className='min-h-screen w-full p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]"'>
			{children}
		</div>
	);
};

export default PageContainer;
