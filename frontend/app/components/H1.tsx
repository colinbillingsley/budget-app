import React, { ReactNode } from "react";

const H1 = ({ children }: { children: ReactNode }) => {
	return <h1 className="text-3xl font-semibold text-primary">{children}</h1>;
};

export default H1;
