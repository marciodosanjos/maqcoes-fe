import { GetStaticPaths, GetStaticProps } from "next";

export async function getStaticPaths() {
  // Fetch os posts da API
  const res = await fetch("https://dummyapi.online/api/blogposts");
  const posts = await res.json();

  // Gerar caminhos dinâmicos com base no `date_published` e `id`
  const paths = posts.map((post: any) => ({
    params: {
      posts: "posts", // Este é o parâmetro `date_published`
      id: post.id.toString(), // Este é o parâmetro `id` (convertido para string)
    },
  }));

  return {
    paths, // Caminhos gerados
    fallback: "blocking", // Garante que a página será gerada na primeira requisição, mas o usuário verá a página pronta
  };
}

// Esta função irá buscar os dados do post com base nos parâmetros
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { id } = params;
  const res = await fetch(`https://dummyapi.online/api/blogposts/${id}`);
  const post = await res.json();

  if (!post) {
    return {
      notFound: true, // Retorna uma página 404 se o post não for encontrado
    };
  }

  return {
    props: { post },
    revalidate: 60, // Revalida os dados a cada 60 segundos
  };
};

export default function Article({ post }: any) {
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
}
