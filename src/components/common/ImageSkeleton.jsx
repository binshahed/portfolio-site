/* eslint-disable react/prop-types */

import './Skeleton.css'; // Import custom CSS for skeleton styles

const ImageSkeleton = ({ size = 200 }) => {
  return <div className="round-skeleton landing--img" style={{ width: size, height: size }}></div>;
};

export default ImageSkeleton;
