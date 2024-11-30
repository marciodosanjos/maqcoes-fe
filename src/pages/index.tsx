/* ./pages/index.js */
import Link from "next/link";
import Layout from "../components/layout";
import { fetchAPI } from "../lib/api";

export default function Home({ articles }: any) {
  return (
    <>
      <Layout>
        <div>
          {articles.data.map((article: any) => (
            <div key={article.id} className="md:p-8 p-2 bg-white">
              <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate">
                {article.title}
              </h1>
              <Link href={`/article/${article.slug}`}>
                <div className="max-w-full">
                  <div className="text-base font-medium tracking-wide text-gray-600 mt-1">
                    {article.description}
                  </div>
                  <div>hello</div>
                </div>
              </Link>
              {/* <div className="flex items-center space-x-2 mt-20">
                <div>
                  {article.attributes.author && (
                    <div className="text-gray-900 font-semibold pb-2">
                      {article.author}
                    </div>
                  )}
                  <div className="text-gray-500 font-semibold text-sm">
                    Created on -{" "}
                    {new Date(article.attributes.createdAt).toDateString()}
                  </div>
                  <div className="text-gray-500 font-semibold text-sm">
                    Updated on -{" "}
                    {new Date(article.attributes.updatedAt).toDateString()}
                  </div>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  try {
    const articles = await fetchAPI("/articles?populate=*");
    return {
      props: {
        articles,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: error.message || "Ocorreu um erro ao buscar os artigos.",
      },
    };
  }
}
