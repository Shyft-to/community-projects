"use client";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 md:px-8 py-24">
      <div className="max-w-screen-md mx-auto w-full bg-gray-800 rounded-2xl px-6 py-12">
        <h3 className="text-brand text-2xl mb-2">
          <span className="font-bold">SuperIndexer</span> (comming soon)
        </h3>
        <p className="mb-2">/ˌsuːpərˈɪndɛk.sər/</p>
        <p className="mb-2">noun</p>
        <ol className="list-decimal ml-4 leading-relaxed mb-2">
          <li>
            (Computing, Blockchain Technology) A software tool designed to
            comprehensively index and facilitate efficient access to all
            relevant data stored on a blockchain network.{" "}
            <span className="text-yellow">
              This typically includes transaction logs, account information, and
              smart contract events.
            </span>{" "}
            SuperIndexers aim to streamline data retrieval for developers
            working on blockchain applications, offering functionalities like:
            <ul className="list-disc ml-8">
              <li>
                Extensive data indexing: Covers a broader range of data compared
                to basic functionalities, potentially including transactions,
                accounts, and smart contract events.
              </li>
              <li>
                Efficient data access: Provides user-friendly interfaces (APIs)
                for developers to easily query and retrieve specific data sets.
              </li>
              <li>
                Enhanced performance: Employs caching and indexing mechanisms to
                ensure fast and reliable data retrieval.
              </li>
              <li>
                Real-time updates : Offers real-time data subscriptions,
                allowing applications to react instantly to changes on the
                blockchain.
              </li>

              <li>Origin: 2024s; formed from super + indexer.</li>
            </ul>
          </li>
        </ol>
        <p className="mb-2">Origin:</p>
        <p className="mb-8">2024s; formed from super + indexer.</p>
        <p className="">
          "<b>Shyft's Superindexer</b> enables developers to build more
          sophisticated applications on the Solana blockchain by providing them
          with comprehensive and readily accessible on-chain data in real-time"
        </p>
      </div>
    </main>
  );
}
