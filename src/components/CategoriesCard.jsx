import { Link } from "react-router-dom";

const CategoriesRoomTypeCard = ({ id, imageUrl, type }) => {
  return (
    <Link to="/booking">
      <div className="flex flex-col items-center rounded-lg hover:shadow-lg transition cursor-pointer relative">
        <img
          src={imageUrl || "src/assets/categories/category-room.jpg"}
          alt={type}
          className="w-full h-40 object-cover rounded-xl"
        />
        <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-sm rounded">
          {type}
        </span>
      </div>
    </Link>
  );
};

export default CategoriesRoomTypeCard;
