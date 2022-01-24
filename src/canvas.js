import { Image as KonvaImage, Layer, Stage } from "react-konva";
import {useState } from 'react';
import useImage from 'use-image';
import StickerOne from './stickerone.png';
import StickerTwo from './stickertwo.png';
import StickerThree from './stickerthree.png';
import IndividualSticker from './individualsticker';

const stickersData = [
    {
      url: StickerOne,
      width: 100,
      alt: "Eiffel Tower"
    },
    {
      url: StickerTwo,
      width: 150,
      alt: "Statue of Liberty"
    },
    {
      url: StickerThree,
      width: 60,
      alt: "Big Ben"
    }
  ];



export default function Canvas() { 
    const [url, setUrl] = useState(null)
    const [image] = useImage(url);

    const [images, setImages] = useState([]);

    const addStickerToPanel = (src, width, x, y ) => {
        console.log(';')
        setImages((images) => [
          ...images,
          {
            width,
            src,
            x,
            y
          }
        ]);
      };

    return (
        <>
        <Stage width={image?.width} height={image?.height}>
            <Layer>
                <KonvaImage image={image} />
            </Layer>
            <Layer>
            {images.map(e => {
                    return (
                        <IndividualSticker image={e} />
                    )
                })}
            </Layer>
        </Stage>
        <input
            type="file"
            name="myImage"
            onChange={(event) => {
            console.log(event.target.files[0]);
            setUrl( URL.createObjectURL(event.target.files[0]) );
            }}
        />
        <h2>Stickers</h2>
        <div>
            {stickersData.map(e => {
                return (
                    <button
                        onClick={() =>addStickerToPanel(e.url, e.width)}
                    >
                        <img
                         alt={e.alt}
                         src={e.url}
                         width={e.width} />
                    </button>
                )
            })}

        </div>
        </>
    );
}