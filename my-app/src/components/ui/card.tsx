// export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <div className={`bg-white rounded-lg shadow p-4 md:p-6 ${className}`}>
//       {children}
//     </div>
//   );
// }

// export function CardHeader({ children }: { children: React.ReactNode }) {
//   return <div className="border-b pb-2 mb-4">{children}</div>;
// }
// export function CardTitle({ children }: { children: React.ReactNode }) {
//   return <h3 className="text-lg font-semibold">{children}</h3>;
// }
// export function CardContent({ children }: { children: React.ReactNode }) {
//   return <div>{children}</div>;
// }



// Updated Card components with className support

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-lg shadow p-4 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`pb-2 mb-2 ${className}`}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
