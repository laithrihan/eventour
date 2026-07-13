"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

type SwaggerUIProps = {
  url: string;
};

export default function SwaggerUIComponent({ url }: SwaggerUIProps) {
  return (
    <div className="swagger-docs fixed inset-0 z-50 overflow-auto bg-white text-black">
      <SwaggerUI url={url} docExpansion="list" defaultModelsExpandDepth={1} />
    </div>
  );
}
