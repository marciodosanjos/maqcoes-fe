/* ./pages/articles/[slug].js */

import { fetchAPI, getPageData } from "../../lib/api";
import Layout from "../../components/layout";

const Article = ({ article, preview }: any) => {
  const articleData = article.data[0];
  return (
    <>
      /* Section of code to add */ /* Beginning of Section */
      <div>
        {preview ? (
          <div className="relative bg-indigo-600">
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
              <div className="pr-16 sm:text-center sm:px-16">
                <p className="font-medium text-white">
                  <span>Preview mode is on,</span>
                  <span className="block sm:ml-2 sm:inline-block">
                    <a
                      href="http://localhost:3000/api/exit-preview"
                      className="underline hover:text-cyan transition-colors"
                    >
                      turn off
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      /* End of section */
      <Layout>
        <div className="mt-10">
          <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto">
            <div className="absolute left-0 bottom-0 w-full h-full" />
            <h1 className="text-6xl font-bold pb-4 text-center">
              {articleData.title}
            </h1>

            <h2 className="text-4xl pt-2 font-semibold text-gray-500 leading-tight">
              {articleData.description}
            </h2>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Article;

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles?populate=*");

  return {
    paths: articles.data.map((article: any) => ({
      params: {
        article: "article",
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = null }: any) {
  // const article = await fetchAPI(`/articles/?filters\[slug\][$eq]=${params.slug}&populate=*`);
  const article = await getPageData(params.slug, preview);

  return {
    props: { article, preview },
    revalidate: 1,
  };
}
