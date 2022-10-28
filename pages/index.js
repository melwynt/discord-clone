// import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="bg-gray-800 w-60 flex flex-col">
        <div className="h-12 px-3 shadow-md flex items-center font-title text-white">
          Dashboard
        </div>
        <div className="text-gray-300 p-3 flex-1 overflow-y-scroll no-scrollbar space-y-2 font-medium">
          <p className="text-white">Friends</p>
        </div>
      </div>

      <div className="bg-gray-700 flex-1 flex flex-col"></div>
    </>
  );
}
