import Link from 'next/link';
import { Folder } from 'lucide-react';

export default function Tutorials() {
    return (
        <div className="mx-auto mt-6 bg-white p-6 rounded-lg border border-gray-300 w-full md:w-[440px] h-[348px] md:h-[634px] flex flex-col overflow-y-auto text-black">
            <div className="inline-grid grid-cols-3 gap-12">
                <Link href="/tutorials/theory">
                    <Folder color="black" size={48} />
                    <span>Theory</span>
                </Link>
                <Link href="/tutorials/scales">
                    <Folder color="black" size={48} />
                    <span>Scales</span>
                </Link>
                <Link href="/tutorials/blues">
                    <Folder color="black" size={48} />
                    <span>Blues</span>
                </Link>
                <Link href="/tutorials/rock">
                    <Folder color="black" size={48} />
                    <span>Rock</span>
                </Link>
            </div>
        </div>
    )
}