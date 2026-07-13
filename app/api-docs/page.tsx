import type { Metadata } from "next";
import SwaggerUIComponent from "@/components/docs/SwaggerUI";

export const metadata: Metadata = {
  title: "API Docs | Eventour",
  description: "Interactive Swagger documentation for the Eventour REST API",
};

export default function ApiDocsPage() {
  return <SwaggerUIComponent url="/api/openapi" />;
}
