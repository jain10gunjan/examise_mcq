import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Helmet } from 'react-helmet';
// import Footer from '../components/Footer';
import axios from 'axios';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Footer from '../components/Footer';
//import Adsense from '../../components/Adsense';


const Singlequestionpage = () => {

  //let { topic } = useParams();
  let { qid } = useParams();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);


  //const id = parseInt(qid);


  const apiEndpoint = process.env.REACT_APP_API;

  useEffect(() => {
    console.log('working');
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}?_id=${qid}`);
        const response2 = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/microtestfeature?topics=${response.data[0]?.topic}&number=5`);

        setData(response.data);
        setData2(response2.data);



        //console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiEndpoint, qid]);

  const handleOptionClick = (option) => {
    if (!data[0] || option !== data[0].correct_option) {
      toast.error('Wrong option');
    } else {
      toast.success('Correct option');
    }

    const optionDiv = document.getElementById(option);
    if (optionDiv) {
      optionDiv.className = option === data[0].correct_option ? 'correct' : 'wrong';
    }
  };

  const chapterName = data[0]?.topic;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Quiz",
    "about": {
      "@type": "Question",
      "name": `${data[0]?.question.replace(/<[^>]*>?/gm, '')}`
    },
    "educationalAlignment": [
      {
        "@type": "AlignmentObject",
        "alignmentType": "educationalSubject",
        "targetName": `${chapterName}`
      }
    ],
    "hasPart": [
      {
        "@context": "https://schema.org/",
        "@type": "Question",
        "eduQuestionType": "Flashcard",
        "text":
          `${data[0]?.question.replace(/<[^>]*>?/gm, '')}`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Correct option is : ${data[0]?.correct_option.replace(/<[^>]*>?/gm, '')}`
        }
      }
    ]
  };



  return (
    <>

      <Navbar />
      <Helmet>

        <title>{data[0]?.question ? data[0].question.slice(0, 90).replace(/<[^>]*>?/gm, '') : 'Aptitude Questions'}</title>
        <meta name="description" content={data[0]?.question.replace(/<[^>]*>?/gm, '')} />
        <meta name="keywords" content={`Aptitude Questions, Placements preparation, ${chapterName} Placements Questions, UPSC ${chapterName} Questions.`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section class="mt-20 text-gray-600 body-font">
        <div class="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
          {/* <Adsense dataAdSlot='9103370999' /> */}

          <div class="w-full md:w-2/3 flex flex-col mb-16">
            {/* <a href={`/practice/mcqs/${data[0]?.topic}`}><button class="mb-4 px-4 py-2 font-semibold text-gray inline-flex items-center space-x-2 rounded-lg border-2	hover:bg-blue-300">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path strokeLinecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

        <span>Practice More on {data[0]?.topic}</span>
    </button>
    </a> */}
            <div className="mb-8 overflow-x-auto scrolling-touch">
              <div className="flex border-b border-gray-200">
                <MathJaxContext>
                  <div>
                    <div class="relative question-numbercontainer">
                      <p class="text-xs text-gray-600">Aptitude Questions <br />Chapter : {chapterName} </p>
                      <p class="text-xs text-gray-600">Difficulty  : {data[0]?.difficulty} </p>

                      <div class="absolute top-0 right-0  flex items-center mb-3 space-x-3">




                      </div>



                    </div>




                    <div class="questioncontainer"> 
                      <MathJax>
                        <span dangerouslySetInnerHTML={{ __html: data[0]?.question }} />
                        </MathJax>
                    </div>
                    <div class="flex-col leading-none optionscontainer">



                      <MathJax><div onClick={() => handleOptionClick("A", data[0]?.id)} id="A" dangerouslySetInnerHTML={{ __html: data[0]?.options['A'] }}></div></MathJax>
                      <MathJax><div onClick={() => handleOptionClick("B", data[0]?.id)} id="B" dangerouslySetInnerHTML={{ __html: data[0]?.options['B'] }}></div></MathJax>
                      <MathJax><div onClick={() => handleOptionClick("C", data[0]?.id)} id="C" dangerouslySetInnerHTML={{ __html: data[0]?.options['C'] }}></div></MathJax>
                      <MathJax><div onClick={() => handleOptionClick("D", data[0]?.id)} id="D" dangerouslySetInnerHTML={{ __html: data[0]?.options['D'] }}></div></MathJax>

                    </div>
                    <div>
                    </div>

                    {/* Buttons */}

                    <div class="relative mt-0 mb-20 flex flex-wrap items-center">



                      {/* Accordian */}
                      <span class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        {/* Correct Option:  <span dangerouslySetInnerHTML={{ __html: data[0]?.correct_option }}></span>   */}
                        <MathJax>The answer for the question is: <span dangerouslySetInnerHTML={{ __html: data[0]?.solution }}></span></MathJax>



                      </span>







                      {/* Accordian 
    <a href={`/${pageValue + '/questions/' + i}`} className="absolute top-0 right-0 hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">Share</a>*/}


                    </div>
                    {/* Buttons */}

                    <div class="flex flex-col items-center">
                      <h2 class="font-bold text-5xl mt-5 tracking-tight">
                        Simillar
                      </h2>
                      <p class="text-neutral-500 text-xl mt-3">
                        Frequenty Simillar Questions
                      </p>
                    </div>

                    <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                      {data2.map((item, index) => (
                        <div key={index} className="py-5">

                          <div className="flex justify-between items-center font-medium cursor-pointer list-none">
                            <a href={`/questions/${item._id}`}><span dangerouslySetInnerHTML={{ __html: item.question }}></span></a>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                </MathJaxContext>
              </div>
            </div>
          </div>
          {/* <Adsense dataAdSlot='9103370999' /> */}

        </div>
      </section>




      <Toaster />
      <Footer />
    </>
  )
}

export default Singlequestionpage