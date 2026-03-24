import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  colors = ['#3b82f6', '#a855f7', '#ec4899', '#3b82f6'],
  animationSpeed = 6,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span className={`gradient-text-animated ${showBorder ? 'with-border' : ''} ${className}`}>
      {showBorder && <span className="gradient-border" style={gradientStyle} />}
      <span className="gradient-text-content" style={gradientStyle}>
        {children}
      </span>
    </span>
  );
}
