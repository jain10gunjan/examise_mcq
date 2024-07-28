"use client";

import { JobFilterValues } from "@/lib/validation";
import JobListItem from "./JobListItem";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

// Define the type for Job data
interface Job {
    title: string;
    companyName: string;
    type: string;
    slug: string;
    image: string;
    salary: number;
    description: string;
    _id: string,
    id:string;
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

interface JobResultProps {
    filterValues: JobFilterValues;
}


export default function JobResult({ filterValues: {experience , work, type, location } }: JobResultProps) {
    const [data, setData] = useState<Job[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
         async function fetchData() {
            try {
                if(type){
                    const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/jobsdata?category=${type}`);
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data: Job[] = await res.json();
                    setData(data);
                }else if(location){
                    const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/jobsdata?companyLocation=${location}`);
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data: Job[] = await res.json();
                    setData(data);
                }else if(experience){
                    console.log('fetching experience data')
                    const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/jobsdata?experience=${experience}`);
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data: Job[] = await res.json();
                    setData(data);
                }else if(type && location && experience && work){
                    const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/jobsdata?category=${type}&type=${work}&companyLocation=${location}&experience${experience}`);
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data: Job[] = await res.json();
                    setData(data);
                }else if(work){
                    const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/jobsdata?type=${work}`);
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data: Job[] = await res.json();
                    setData(data);
                }else{
                    const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/jobsdata`);
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data: Job[] = await res.json();
                    setData(data);
                }
                
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        console.log(experience);

        fetchData();
    }, [type,location,experience,work]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    //const searchString = q?.split(" ").filter(word => word.length > 0).join(" & ");

    return (
        <div className="space-y-4 grow">
            <div className="relative flex flex-col items-center justify-center sm:py-12">
            {data?.map((job, index) => (
                <JobListItem job={job} key={job.id || index} />
            ))}
            </div>
      <Toaster />
        </div>
    );
}
