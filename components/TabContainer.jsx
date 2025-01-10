// // components/TabContainer.js
// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function TabContainer({ activeTab, artistId }) {
//   const pathname = usePathname();

//   return (
//     <div className="bg-[#00000030] bottom-0 absolute w-full px-[10%] flex gap-10">
//       <Link
//         href={`${pathname}?tab=songs`}
//         className={`text-white p-4 ${
//           activeTab === 'songs' ? 'border-red-500 border-b-4' : ''
//         }`}
//       >
//         All Songs
//       </Link>
//       <Link
//         href={`${pathname}?tab=bio`}
//         className={`text-white p-4 ${
//           activeTab === 'bio' ? 'border-red-500 border-b-4' : ''
//         }`}
//       >
//         Biography
//       </Link>
//     </div>
//   );
// }



// components/TabContainer.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabContainer({ activeTab, artistId }) {
  const pathname = usePathname();

  return (
    <div className="bg-[#00000030] bottom-0 absolute w-full px-[10%] flex gap-10">
      <Link
        href={`${pathname}?tab=songs`}
        className={`text-white p-4 ${
          activeTab === 'songs' ? 'border-red-500 border-b-4' : ''
        }`}
      >
        All Songs
      </Link>
      <Link
        href={`${pathname}?tab=videos`}
        className={`text-white p-4 ${
          activeTab === 'videos' ? 'border-red-500 border-b-4' : ''
        }`}
      >
        Videos
      </Link>
      <Link
        href={`${pathname}?tab=bio`}
        className={`text-white p-4 ${
          activeTab === 'bio' ? 'border-red-500 border-b-4' : ''
        }`}
      >
        Biography
      </Link>
    </div>
  );
}