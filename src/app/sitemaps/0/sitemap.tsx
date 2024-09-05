import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
  const start = 1;
  const end = 2000;
  interface ApiResponse {
    data: {
      data: []; // Adjusted to match the actual structure
    };
    total: number;
  }

  try {
    const res = await fetch(
      `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/sitemap?start=${start}&end=${end}`,
      {
        cache: "no-store", // Prevents caching and always fetches fresh data
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data: ApiResponse | any = await res.json();

    var result = data.data.map((id: string) => ({
      url: `https://mcq.examise.in${id}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.9,
    }));
  } catch (error: any) {
    console.error(error.message);
  }

  return result;
}
