import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

type JobListItemsProps = {
    title: string;
    companyName: string;
    type: string;
    slug: string;
    image: string;
    salary: number;
    description: string;
    _id: string,
    searchid: string,
    experience: string,
    sharetext: string,
    createdat: string,
    companyLocation: string,
    category: string,
    requirements: null,
    applyBefore: string,
    link: string,
}

export default function JobListItem({ job }: { job: JobListItemsProps }) {
    // Function implementation here
    const handleCopy = () => {
        const textToCopy = `${job?.sharetext}
Company Name: ${job?.companyName}
Title: ${job?.title}
Type: ${job?.type}
Category: ${job?.category}
Location: ${job?.companyLocation}
Salary: ${job?.salary}
Apply Link: ${job?.link}`;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast.success("Copied The Job Successfully");
            })
            .catch(() => {
                toast.error("Failed to copy");
            });
    };
    return (
        <>
        
    <div className="relative mt-4 bg-white  shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 rounded-md">
   <div>
   <Image src={job.image} height={60} width={60} className="justify-start rounded-xl self-center" alt="company-logo" />
     <span className="font-extrabold text-purple-800 text-sm">{job?.companyName}</span>
     <h3 className="font-extrabold mt-px">{job?.title}</h3>
     <span className="text-sm mt-px">{job?.category}</span>
     <div className="flex items-center gap-3 mt-2">
       <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Full-time</span>
       <span className="text-slate-600 text-sm flex gap-1 items-center"> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
   <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
   <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg> {job?.experience}</span>
     </div>
   </div>
   <div className="">
    
   <div className="absolute top-0 right-0 mb-3 py-4 px-5 flex gap-3">
       <Link href={`/jobs/${job?._id}`} className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Apply Now</Link>
   <button onClick={handleCopy} className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Share</button>

   {/* <Link href={`/job/${job._id}`}><button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md gap-1 ">Apply Now  </button></Link>
 <Link href={`/job/${job._id}`}><button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md gap-1 items-center">Share  
</button></Link> */}
     </div> 
   </div>
    </div>
  
        {/* <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted/60">
           <Image src={job.image} height={100} width={100} className="rounded-lg self-center" alt="company-logo" />
            <div className="flex-grow space-y-3">
                <div>
                    <h2 className="text-xl font-medium">{job.title}</h2>
                    <p className="text-muted-foreground">{job.companyName}</p>
                </div>

                <div className="text-muted-foreground">
                    <Badge> {job.type === null ? "Not Known" : job.type}
                    </Badge>
                    <p className="flex items-center gap-1.5 pt-4">
                        <CornerDownRight  size={16} className="shrink-0" />
                        Category:{job.category}
                    </p>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock size={16} />
                         Created:{job.createdat}
                    </span>
                    <p className="flex items-center gap-1.5">
                        <CornerDownRight  size={16} className="shrink-0" />
                        Hiring For:{job.experience}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <Globe2 size={16} className="shrink-0" />
                        Location: {job.companyLocation || "WorldWide"}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <Banknote size={16} className="shrink-0" />
                        {formatMoney()} 
                        Salary: {job.salary.toString() === "Not Disclosed" ? "Not Disclosed" : formatMoney(job.salary)}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <CornerDownRight  size={16} className="shrink-0" />
                        Apply Before:{job.applyBefore}
                    </p>
                </div>
            </div>
        </article> */}
        </>

    )
}
