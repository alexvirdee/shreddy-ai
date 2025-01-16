export default function Blues() {
    return (
        <div className="mx-auto mt-6">
            <div className="text-xl font-bold text-center mb-6">Blues</div>
            {/* Embedded Youtube Videos */}
            <div className="flex justify-center">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <iframe width="480" height="275" src="https://www.youtube.com/embed/XFuXLSIYH7s?si=nWCmE95DWBrm02on" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div>
                        <iframe width="480" height="275" src="https://www.youtube.com/embed/NsZIzzvCutI?si=UWGQu_FOUJZm2Oyq" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div>
                        <iframe width="480" height="275" src="https://www.youtube.com/embed/HiSaMX45AMw?si=ayj9CpMloBFJzJ5K" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}