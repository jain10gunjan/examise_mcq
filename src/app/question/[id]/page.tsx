"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useParams } from "next/navigation";
import Link from "next/link";
import MetaData from "@/components/MetaData";
import MetaDataJobs from "@/components/MetaDataJobs";
import Head from "next/head";

export default function Question() {
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

  let qid = useParams<{ id: string }>();
  const [data, setData] = useState<ApiResponse | any>([]);
  const [simillarData, setSimillarData] = useState<ApiResponse | any>([]);

  useEffect(() => {
    async function fetchData() {
      console.log("working useEffect");
      try {
        const res = await fetch(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/aptitudeData?_id=${qid.id}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data1: ApiResponse | any = await res.json();
        const res2 = await fetch(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/aptitudeData?topicwise=${data1?.data[0]?.topic}`
        );
        const data2: ApiResponse = await res2.json();

        setData(data1?.data);
        setSimillarData(data2?.data);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [qid]);

  const handleOptionClick = (option: string) => {
    if (!data || option !== data[0]?.correct_option) {
      toast.error("Wrong option");
    } else {
      toast.success("Correct option");
    }

    const optionDiv = document.getElementById(option);
    if (optionDiv) {
      optionDiv.className =
        option === data[0]?.correct_option ? "correct" : "wrong";
    }
  };

  const chapterName = data[0]?.topic;
  interface JsonLdObject {
    "@context": string;
    "@type": string;
    about: {
      "@type": string;
      name: string;
    };
    educationalAlignment: {
      "@type": string;
      alignmentType: string;
      targetName: string;
    }[];
    hasPart: {
      "@context": string;
      "@type": string;
      eduQuestionType: string;
      text: string;
      acceptedAnswer: {
        "@type": string;
        text: string;
      };
    }[];
  }

  const jsonLd: JsonLdObject[] = [
    {
      "@context": "https://schema.org/",
      "@type": "Quiz",
      about: {
        "@type": "Question",
        name: `${data[0]?.question.replace(/<[^>]*>?/gm, "")}`,
      },
      educationalAlignment: [
        {
          "@type": "AlignmentObject",
          alignmentType: "educationalSubject",
          targetName: `${chapterName}`,
        },
      ],
      hasPart: [
        {
          "@context": "https://schema.org/",
          "@type": "Question",
          eduQuestionType: "Flashcard",
          text: `${data[0]?.question.replace(/<[^>]*>?/gm, "")}`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Correct option is : ${data[0]?.correct_option.replace(
              /<[^>]*>?/gm,
              ""
            )} \n ${data[0]?.solution.replace(/<[^>]*>?/gm, "")}`,
          },
        },
      ],
    },
  ];

  //  const schemajson = jsonLd;

  return (
    <>
      <MetaDataJobs
        seoTitle={data[0]?.question.replace(/<[^>]*>?/gm, "")}
        seoDescription={`${data[0]?.question.replace(/<[^>]*>?/gm, "")}\n${
          data[0]?.correct_option
        }`}
      />
      {/* {console.log(jsonLd[0].about.name == 'undefined')} */}
      {jsonLd[0].about.name !== "undefined" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <section className="mt-20 text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
          {/* <Adsense dataAdSlot='9103370999' /> */}

          <div className="w-full md:w-2/3 flex flex-col mb-16">
            <div className="mb-8 overflow-x-auto scrolling-touch">
              <div className="flex border-b border-gray-200">
                <MathJaxContext>
                  <div>
                    <div className="relative question-numbercontainer">
                      <p className="text-xs text-gray-600">
                        Aptitude Questions <br />
                        Chapter : {data[0]?.topic}{" "}
                      </p>
                      <p className="text-xs text-gray-600">
                        Difficulty : {data[0]?.difficulty}{" "}
                      </p>
                    </div>

                    <div className="questioncontainer">
                      <MathJax inline dynamic>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.question,
                          }}
                        />
                      </MathJax>
                    </div>
                    <div className="flex-col leading-none optionscontainer">
                      <MathJax inline dynamic>
                        <div
                          onClick={() => handleOptionClick("A")}
                          id="A"
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.options["A"],
                          }}
                        ></div>
                      </MathJax>
                      <MathJax inline dynamic>
                        <div
                          onClick={() => handleOptionClick("B")}
                          id="B"
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.options["B"],
                          }}
                        ></div>
                      </MathJax>
                      <MathJax inline dynamic>
                        <div
                          onClick={() => handleOptionClick("C")}
                          id="C"
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.options["C"],
                          }}
                        ></div>
                      </MathJax>
                      <MathJax inline dynamic>
                        <div
                          onClick={() => handleOptionClick("D")}
                          id="D"
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.options["D"],
                          }}
                        ></div>
                      </MathJax>
                    </div>
                    <div></div>

                    {/* Buttons */}

                    <div className="relative mt-0 mb-20 flex flex-wrap items-center">
                      {/* Accordian */}
                      <span className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        {/* Correct Option:  <span dangerouslySetInnerHTML={{ __html: data?.correct_option }}></span>   */}
                        <MathJax inline dynamic>
                          The answer for the question is:{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: data[0]?.solution,
                            }}
                          ></span>
                        </MathJax>
                      </span>
                    </div>
                    {/* Buttons */}

                    <div className="flex flex-col items-center">
                      <h2 className="font-bold text-5xl mt-5 tracking-tight">
                        Simillar
                      </h2>
                      <p className="text-neutral-500 text-xl mt-3">
                        Frequenty Simillar Questions
                      </p>
                    </div>

                    <div className="relative flex flex-col jus items-center justify-center overflow-hidden p-6 sm:py-12">
                      {Array.isArray(simillarData) ? (
                        simillarData?.map((data: any, index: number) => (
                          <div
                            key={index}
                            className="w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center hover:bg-purple-100 hover:cursor-pointer justify-between px-5 py-4 rounded-md"
                          >
                            <Link href={`/question/${data._id}`}>
                              <span
                                className="text-purple-800 text-sm"
                                dangerouslySetInnerHTML={{ __html: data.topic }}
                              ></span>
                              <MathJax inline dynamic>
                                <h3
                                  className="font-bold mt-px"
                                  dangerouslySetInnerHTML={{
                                    __html: data.question,
                                  }}
                                ></h3>
                              </MathJax>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                                  Practice
                                </span>
                                <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                                  Share
                                </span>
                              </div>
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div>No data available</div>
                      )}
                    </div>
                  </div>
                </MathJaxContext>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
}
