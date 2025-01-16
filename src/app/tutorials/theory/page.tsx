export default function Theory() {
    return (
        <div className="mx-auto mt-6">
            <div className="text-xl font-bold text-center mb-6">Music Theory Tutorials</div>
            {/* Embedded Youtube Videos */}
            <div className="flex justify-center">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <iframe width="480" height="275" src="https://www.youtube.com/embed/3i0skCjRo1E?si=rxU0YQF2gq18sGtQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div>
                        <iframe width="480" height="275" src="https://www.youtube.com/embed/o-qNepGpI3U?si=elRbZkP75fh1OCs9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div>
                    <iframe width="480" height="275" src="https://www.youtube.com/embed/qF3mJzDulJ8?si=etEZAh5zeXipUyvO" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}