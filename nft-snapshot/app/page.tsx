import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="container px-4 md:px-8 flex mx-auto flex-col items-center py-20">
      <h2 className="text-4xl text-white font-extrabold text-center mb-10">
        Find NFT collection holders with ease
      </h2>
      <Form />
    </main>
  );
}
