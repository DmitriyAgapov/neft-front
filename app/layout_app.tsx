import GridLayout from "@/Components/GridLayout/GridLayout";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <GridLayout>
          {children}
      </GridLayout>
  );
}
