import Image from "next/image"

export default function About() {
    return (
        <div className="flex row">
            <div className="hidden md:block">
            <Image
                src="/guitar-studio.png"
                alt="Background Image"
                width={700}
                height={800}
                priority
            />
            </div>
            <div className="justify-center w-full md:w-1/2 mx-auto text-base mt-8 p-12">
                Shreddy is an AI-powered guitar mentor designed to revolutionize the way guitarists learn and play. Combining cutting-edge technology with the soul of a true rockstar, Shreddy delivers personalized guidance, generates epic riffs, and offers real-time feedback to help players of all levels sharpen their skills. Whether you're mastering your first chord or perfecting your solos, Shreddy is here to make learning fun, engaging, and uniquely tailored to your style. Get ready to shred like never before with the ultimate AI guitar agent!
            </div>
        </div>
    )
}