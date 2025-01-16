export default function Rock() {
    return (
        <div className="mx-auto mt-6">
            <div className="text-xl font-bold text-center mb-6">Rock</div>
            {/* Embedded Youtube Videos */}
            <div className="flex justify-center">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <iframe width="480" height="275" src="https://www.youtube.com/embed/GO0iGsLau4I?si=KxXwwGeSjk8FpLlA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div>
                        <iframe width="480" height="275" src="https://www.youtube.com/embed/T4Yaf-vdc-Y?si=9NHlYvGFAJ9xLB7n" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div>
                        <iframe width="480" height="275" src="https://www.youtube.com/embed/Rxbi4XQCblA?si=msxHhMX4L1e73xF2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}