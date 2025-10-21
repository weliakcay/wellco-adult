interface BlobShapeProps {
  className?: string;
  color?: string;
  opacity?: number;
  size?: number;
}

export function BlobShape({
  className = '',
  color = '#F5D5D8',
  opacity = 0.3,
  size = 200
}: BlobShapeProps) {
  return (
    <svg
      className={`${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        opacity={opacity}
        d="M43.3,-59.4C54.6,-48.6,61.1,-33.6,66.4,-17.7C71.7,-1.8,75.8,15,72.1,30.3C68.4,45.6,56.9,59.4,42.3,67.1C27.7,74.8,10,76.4,-6.8,75.6C-23.6,74.8,-39.5,71.6,-51.8,63C-64.1,54.4,-72.8,40.4,-76.1,25.2C-79.4,10,-77.3,-6.4,-70.9,-20.5C-64.5,-34.6,-53.8,-46.4,-41.2,-56.7C-28.6,-67,-14.3,-75.8,0.9,-77C16.1,-78.2,32.1,-70.2,43.3,-59.4Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function BlobShape2({
  className = '',
  color = '#FF6B9D',
  opacity = 0.2,
  size = 300
}: BlobShapeProps) {
  return (
    <svg
      className={`${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        opacity={opacity}
        d="M39.5,-65.5C50.9,-58.7,59.7,-46.9,65.3,-33.8C70.9,-20.7,73.3,-6.3,71.1,7.3C68.9,20.9,62.1,33.7,52.8,44.2C43.5,54.7,31.7,62.9,18.5,67.4C5.3,71.9,-9.3,72.7,-22.7,69.1C-36.1,65.5,-48.3,57.5,-57.6,46.8C-66.9,36.1,-73.3,22.7,-74.5,8.7C-75.7,-5.3,-71.7,-19.9,-64.2,-32.5C-56.7,-45.1,-45.7,-55.7,-33.2,-62C-20.7,-68.3,-6.7,-70.3,6.5,-79.7C19.7,-89.1,28.1,-72.3,39.5,-65.5Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function BlobShape3({
  className = '',
  color = '#E91E63',
  opacity = 0.15,
  size = 250
}: BlobShapeProps) {
  return (
    <svg
      className={`${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        opacity={opacity}
        d="M47.1,-77.3C59.9,-69.8,68.4,-54.3,73.7,-38.2C79,-22.1,81.1,-5.4,78.8,10.3C76.5,26,69.8,40.7,59.9,52.3C50,63.9,36.9,72.4,22.3,76.1C7.7,79.8,-8.4,78.7,-23.3,74.2C-38.2,69.7,-51.9,61.8,-62.4,50.7C-72.9,39.6,-80.2,25.3,-81.7,10.2C-83.2,-4.9,-78.9,-20.8,-70.8,-34.5C-62.7,-48.2,-50.8,-59.7,-37.3,-66.9C-23.8,-74.1,-9.6,-77,5.3,-85.3C20.2,-93.6,34.3,-84.8,47.1,-77.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
