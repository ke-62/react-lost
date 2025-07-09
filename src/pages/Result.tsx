import React, {useEffect, useState} from 'react';
import ImageCard from '../components/ImageCard';
import Modal from '../components/Modal';

type ImageItem = {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
};

const Result: React.FC = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

    useEffect(() => {
        //api 연동
        // 일단 아무거나 넣어봄
        setImages([
            {
                id: 24010964,
                imageUrl: '/assets/bag1.jpg',
                title: '검은색 백팩',
                description: '학정 열람실에서 발견(2000-00-00)',
            },
            {
                id: 24012345,
                imageUrl: '/assets/airpods1.jpg',
                title: '에어팟 4세대',
                description: '광토 203호에서 발견(2000-00-00)',
            },
         ]);
    }, []);

    const handleCardClick = (item: ImageItem) => {
        setSelectedImage(item);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className='className=max-w-xl mx-auto p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {images.map((item) => (
                <ImageCard 
                    key={item.id}
                    imageUrl={item.imageUrl}
                    title={item.description}
                    description={item.description}
                    onClick={()=> handleCardClick(item)}
                />
            ))}

            <Modal open={!!selectedImage} onClose={handleCloseModal}>
                {selectedImage && (
                    <div>
                        <img   
                            src={selectedImage.imageUrl}
                            alt={selectedImage.title}
                            className='w-full h-60 object-cover rounded'
                        />
                        <h2 className='text-x1 font-bold mt-4'>{selectedImage.title}</h2>
                        <p className='mt-2 text-gray-700'>{selectedImage.description}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Result;