import React from 'react';

interface ImageCardProps {
    imageUrl: string;
    title: string;
    description?: string;
    onClick?:() =>void;
}

const ImageCard:React.FC<ImageCardProps> = ({imageUrl, title, description,
    onClick }) => (
        <div className= "border rounded shadow hover:shadow-lg cursor-pointer"
        onClick={onClick}>
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-t" />
            <div className="p-3">
                <h3 className="font-bold text-lg">{title}</h3>
                {description && <p className="text-gray-600">{description}</p>}
                </div>
            </div>
    );

export default ImageCard;