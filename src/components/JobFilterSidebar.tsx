import { jobTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { Button } from "./ui/button";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import { fetchData } from "./placeholderJobs";

 
async function filterJobs(formData: FormData) {
    "use server"
    // console.log(formData.get("q") as string);

    const values = Object.fromEntries(formData.entries());
    // const parseResult = jobFilterSchema.parse(values);

    //Destructuring parseResult
    // const { q, type, location } = jobFilterSchema.parse(values);
    const { experience , type, location, work } = jobFilterSchema.parse(values);
    const searchParams = new URLSearchParams({
        ...(experience && { experience }),
        ...(work && { work }),
        ...(type && { type }),
        ...(location && { location }),
    });

    //redirecting
    redirect(`jobs/?${searchParams.toString()}`)
}

export default async function JobFilterSidebar() {
    //Create an api that return only the locations of the job
    try {
        const data = await fetchData();
         //console.log(data.companyLocation.filter((loc:any) => loc !== null))
        return (
            <aside className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
                <form action={filterJobs}>
                    <div className="space-y-4">
                        {/* <div className="flex flex-col gap-2">
                            <Label htmlFor="q">
                                Search
                            </Label>
                            <Input id="q" name="q" placeholder="title,company,etc" />
                        </div> */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="experience">Experience</Label>
                            <Select id="experience" name="experience" defaultValue="">
                                <option value="">All Experience</option>
                                {data.experience.filter((t:string) => t !== null).map((t:any, index:number) => (
                                    <option key={index} value={t}>{t}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="work">Work Type</Label>
                            <Select id="work" name="work" defaultValue="">
                                <option value="">Work Type</option>
                                {data.type.filter((w:string) => w !== null).map((w:any, index:number) => (
                                    <option key={index} value={w}>{w}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="type">Categories</Label>
                            <Select id="type" name="type" defaultValue="">
                                <option value="">All Categories</option>
                                {data.category.filter((loc:string) => loc !== null).map((type:any, index:number) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="location">
                                Location
                            </Label>
                            <Select id="location" name="location" defaultValue="">
                                <option value="">All Locations</option>
                                {data.companyLocation.filter((loc:any) => loc !== null).map((locations:any, index:number) => (
                                    <option key={index} value={locations}>{locations}</option>
                                ))}
                            </Select>
                        </div>
                        <Button type="submit" className="w-full">Filter Jobs</Button>
                    </div>
                </form>
            </aside>
        )
    } catch (error: any) {
        Error(error.message)
    }

 
    
}