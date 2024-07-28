interface Props {
    seoTitle: string;
    seoDescription: string;
}

export default function MetaDataJobs({ seoTitle, seoDescription }: Props) {
    return (
        <>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="og:type" content="website" />
            {/* <meta name="og:title" content={title} />
            <meta name="keywords" content={keyword} />
            <meta name="og:url" content={url} />
            <meta name="og:description" content={description} />
            <meta name="og:image" content={image} /> */}
        </>
    );
}