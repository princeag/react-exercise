import {useState} from 'react'
import './image-carousel.css'

const images = [
    "https://loremflickr.com/600/300/mountain?lock=1",
    "https://loremflickr.com/600/300/river?lock=2",
    "https://loremflickr.com/600/300/sunshet?lock=3",
    "https://loremflickr.com/600/300/sunrise?lock=4",
    "https://loremflickr.com/600/300/lake?lock=5",
]

export default function ImageCarousel() {
    const [imgIndex, setImgIndex] = useState(0);

    function handleClick(imgIndex2) {
        console.log('imgIndex2 :'+imgIndex2)
        if(imgIndex2 < 0) { // if reach to first image
            setImgIndex(images.length-1) // last image index
        }
        else if(imgIndex2 == images.length) { // if reach to last image
            setImgIndex(0) // first image index
        }
        else {
            setImgIndex(imgIndex2)
        }
    }

    return (
        <div className='image-carousel-container'>
            <h1>Image Carousel</h1>
            <div className='carousel-wrapper'>
                <img src={images[imgIndex]} alt={'random-image-'+imgIndex} />
            </div>
            <div>
                <button className='btn' onClick={()=> handleClick(imgIndex-1)} style={{backgroundColor: 'tomato'}}>Prev</button>
                <button className='btn' onClick={()=> handleClick(imgIndex+1)} style={{backgroundColor: 'greenyellow'}}>Next</button>
            </div>
        </div>
    )
}