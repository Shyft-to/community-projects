import truncate from "@/lib/truncate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { NFTActivity } from "@/types";
import { getMarketplaceIconUri, getMarketplaceName } from "@/utils/marketplace";
import { Skeleton } from "./ui/skeleton";

export default function NFTTable({
  activities,
  loading,
}: {
  activities: NFTActivity[];
  loading: boolean;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Program</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>NFT</TableHead>
          <TableHead>Hash</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="max-h-[600px] over">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8" />
                </TableCell>
              </TableRow>
            ))
          : activities.map((activity) => {
              return (
                <TableRow key={activity.nft}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={getMarketplaceIconUri(activity.program)}
                        className="w-5 h-5 object-cover"
                      />
                      <p className="font-semibold">
                        {getMarketplaceName(activity.program)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>
                    {truncate(activity.nft ?? "", 24, false)}
                  </TableCell>
                  <TableCell>
                    {truncate(activity.hash ?? "", 24, false)}
                  </TableCell>
                </TableRow>
              );
            })}

        {!loading && !!activities && activities.length === 0 && (
          <TableRow>
            <TableCell className="text-center" colSpan={5}>
              No data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
