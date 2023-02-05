import React from 'react'

const Modal = ({}) => {

    useEffect(() => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_YOUTUBE_ENDPOINT}/playlistItems?part=snippet&part=contentDetails&playlistId=${PLAYLIST_ID}&maxResults=4&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`);
 const data = await res.json();
    }, [third])
    
  return (
    <div>
          res.map((item) => {
            <Image
              width={item.items[0].snippet.thumbnails.medium.width}
              height={item.items[0].snippet.thumbnails.medium.height}
              src={item.items[0].snippet.thumbnails.medium.url}
              alt=""
            />;
          }
        )</div>
  )
}

export default Modal