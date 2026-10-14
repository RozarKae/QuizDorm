import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/admin/", "/school/", "/teacher/", "/student/", "/auth/"],
    },
    sitemap: "https://quizdorm.com/sitemap.xml",
  };
}
