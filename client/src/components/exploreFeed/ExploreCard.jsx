import {Link} from 'react-router-dom'

export default function ExploreCard({explore, isImage, isVideo, fileUrl, extension}) {
  return (
    <Link to={`/explore?path=${explore.id}/${explore.attachments[0].attachment}`}>
    <div
      className="break-inside-avoid mb-2 flex justify-center border rounded-lg overflow-hidden"
    >
      {isVideo && (
        <div
          className="relative"
          style={{ height: "600px", width: "400px" }}
        >
          <video
            className="h-full w-full absolute top-0 left-0 object-cover rounded-lg"
            autoPlay
            loop
          >
            <source src={fileUrl} type={`video/${extension}`} />
          </video>
        </div>
      )}
      {isImage && (
        <div
          className="relative"
          style={{ height: "400px", width: "400px" }}
        >
          <img
            className="h-full w-full rounded-lg absolute top-0 left-0 object-cover"
            src={fileUrl}
            alt="image"
          />
        </div>
      )}
    </div>
  </Link>
  )
}
