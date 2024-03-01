import SummaryCard from "./summary-card";

export default function Summary() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-10">
      <SummaryCard
        title="Marketplace"
        data={[
          {
            label: "List",
            value: 1,
          },
          {
            label: "Bid",
            value: 1,
          },
        ]}
      />
      <SummaryCard
        title="NFT-Fi"
        data={[
          {
            label: "Lend",
            value: 1,
          },
          {
            label: "Borrow",
            value: 1,
          },
        ]}
      />
      <SummaryCard
        title="Defi"
        data={[
          {
            label: "Lend",
            value: 1,
          },
          {
            label: "Borrow",
            value: 1,
          },
        ]}
      />
    </div>
  );
}
