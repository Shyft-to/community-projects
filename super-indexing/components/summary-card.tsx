type SummaryCardProps = {
  title: string;
  data: Array<{ label: string; value: string | number }>;
};

export default function SummaryCard({ title, data }: SummaryCardProps) {
  return (
    <div className="rounded-2xl shadow-2xl p-6 bg-grey-darker space-y-4">
      <h3 className="text-white text-xl font-bold leading-normal">{title}</h3>
      <hr className="bg-white" />

      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <p className="text-white">{item.label}</p>
            <p className="text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
