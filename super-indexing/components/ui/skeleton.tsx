import cx from "classnames";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx("animate-pulse rounded-md bg-gray-300", className)}
      {...props}
    />
  );
}

export { Skeleton };
