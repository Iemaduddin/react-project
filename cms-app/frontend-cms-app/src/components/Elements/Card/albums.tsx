type CardAlbumProps = {
  image: string;
  title: string;
};

const CardAlbum = ({ image, title }: CardAlbumProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-hover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
    </div>
  );
};
export default CardAlbum;
