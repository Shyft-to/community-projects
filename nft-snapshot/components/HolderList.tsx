"use client";

import Button from "@/components/ui/button";
import { downloadCSV } from "@/lib/csv";
import { trackEvent } from "@/lib/gtag";
import { StatusEnum } from "./Form";


export default function HolderList({
  holders,
  status,
}: {
  status: StatusEnum;
  holders: { address: string; total: number }[];
}){
  if (status !== "finished") return null;

  return (
    <div className="mt-10">
      {holders.length > 0 && (
        <div className="flex justify-center mb-6">
          <Button
            onClick={(event) => {
              event.preventDefault();
              trackEvent("DOWNLOAD_CSV");
              downloadCSV(
                [
                  ["Holder", "Quantity"],
                  ...holders.map((holder) => [holder.address, holder.total]),
                ].join("\n")
              );
            }}
          >
            Download CSV
          </Button>
        </div>
      )}

      <div className="overflow-auto sm:rounded-lg max-h-[600px]">
        <table className="table-auto w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Holder
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {status === "finished" && holders.length === 0 && (
              <tr className="border-b border-gray-700 hover:bg-grey-darker">
                <th
                  colSpan={2}
                  scope="row"
                  className="px-6 py-4 text-center font-medium whitespace-nowrap"
                >
                  No item found
                </th>
              </tr>
            )}

            {holders.map((holder) => (
              <tr
                key={holder.address}
                className="border-b border-gray-700 hover:bg-grey-darker"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {holder.address}
                </th>
                <td className="px-6 ttext-right py-4">{holder.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
