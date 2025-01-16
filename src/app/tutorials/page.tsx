import { Folder } from 'lucide-react';

export default function Tutorials() {
    return (
        <div className="mx-auto mt-6 bg-white p-6 rounded-lg border border-gray-300 w-full md:w-[440px] h-[348px] md:h-[634px] flex flex-col overflow-y-auto">
            <div className="inline-grid grid-cols-3 gap-12">
                <div className="flex flex-col justify-evenly">
                    <Folder color="black" size={48} />
                    <span>Theory</span>
                </div>
                <div>
                    <Folder color="black" size={48} />
                    <span>Scales</span>
                </div>
                <div>
                    <Folder color="black" size={48} />
                    <span>Blues</span>
                </div>
                <div>
                    <Folder color="black" size={48} />
                    <span>Rock</span>
                </div>
            </div>
        </div>
    )
}