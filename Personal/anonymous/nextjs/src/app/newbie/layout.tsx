



export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <>
      <h1 className="bg-orange-500 text-black text-2xl text-center">From Newbie Layout</h1>
        {children}
        </>
  );
}
