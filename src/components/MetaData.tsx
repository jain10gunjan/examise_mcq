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
interface Props {
    seoTitle: string;
    seoDescription: string;
    jsontld: JsonLdObject[];
}

export default function MetaData({ seoTitle, seoDescription, jsontld }: Props) {
    return (
        <>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="og:type" content="website" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsontld) }}
            ></script>
            {/* <meta name="og:title" content={title} />
            <meta name="keywords" content={keyword} />
            <meta name="og:url" content={url} />
            <meta name="og:description" content={description} />
            <meta name="og:image" content={image} /> */}
        </>
    );
}