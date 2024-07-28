"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Question {
    _id: string;
    topic: string;
    difficulty: string;
    question: string;
    options: string;
    correct_option: string;
    solution: string;
}

interface ApiResponse {
    data: {
        data: Question[]; // Adjusted to match the actual structure
    };
    total: number;
    pagenumber: number;
    limit: number;
}

const Homepage = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [text, setText] = useState<string>('');
    const [textflag, setTextflag] = useState<boolean | null>(false);

    const totalPages = 100;
    const [currentPage, setCurrentPage] = useState(1);

    const pageRange = 5;

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
        let endPage = Math.min(totalPages, startPage + pageRange - 1);

        if (endPage - startPage + 1 < pageRange) {
            startPage = Math.max(1, endPage - pageRange + 1);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const setTextForSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const searchQuestion = async () => {
        console.log('Working For SearchQuestion');
        if (textflag === false) {
            setTextflag(true);
        }

        console.log('working useEffect');
        try {
            const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/aptitudeData?question=${text}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data: ApiResponse = await res.json();
            setData(data);
            setTextflag(false);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/aptitudeData?pagenumber=${currentPage}&limit=20`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: ApiResponse = await res.json();
                setData(data);
                setTextflag(false);
            } catch (error: any) {
                console.error(error.message);
            }
        }

        fetchData();
    }, [currentPage]);


     return (
        <>
            <section className="h-auto bg-white tails-selected-element">
            <div className="bg-white dark:bg-gray-800 ">
    <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-5xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">
                Examise.in
            </span>
        </h2>

            <span className="block text-indigo-500">
                Your One Stop Need For All MCQ Problems.
            </span>
    </div>
</div>
                         

                        <form className="flex justify-center" action={searchQuestion}>
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input onChange={setTextForSearch} value={text} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                            </div>
                            <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                        </form>
                

                <div className="relative flex flex-col jus items-center justify-center overflow-hidden p-6 sm:py-12">

                {Array.isArray(data?.data) ? (
    data?.data.map((data, index) => (
        <div key={index} className="w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center hover:bg-purple-100 hover:cursor-pointer justify-between px-5 py-4 rounded-md">
            <Link href={`/question/${data._id}`}>
                <span className="text-purple-800 text-sm" dangerouslySetInnerHTML={{ __html: data.topic }}></span>
                <h3 className="font-bold mt-px" dangerouslySetInnerHTML={{ __html: data.question }}></h3>
                <div className="flex items-center gap-3 mt-2">
                    <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Practice</span>
                    <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Share</span>
                </div>
            </Link>
        </div>
    ))
) : (
    <div>No data available</div>
)}

                

                </div>
            </section>

            {!textflag && (
                <div className="flex items-center justify-center">
                <div className="p-6 rounded shadow-lg">
                      <div className="flex space-x-2">
                    <button
                      onClick={() => handleClick(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Prev
                    </button>
                    {renderPageNumbers().map((number) => (
                      <button
                        key={number}
                        onClick={() => handleClick(number)}
                        className={`px-4 py-2 rounded ${
                          number === currentPage
                            ? 'bg-blue-700 text-white'
                            : 'bg-blue-500 text-white hover:bg-blue-700'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() => handleClick(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  </div>
                  </div>
            )}
        </>
    );
};

export default Homepage;
