import IconAlert from '../icons/IconAlert';

export interface IAlert {
  desc: string;
  title?: string;
  visible?: boolean;
  color?: string;
  bgColor?: string;
}
const AlertComponent: React.FC<IAlert> = ({title, desc, color, bgColor}) => {
  return (
    <div
      className={`flex ${bgColor} rounded-lg p-4 mb-4 text-sm  ${color}`}
      role="alert">
      <IconAlert />
      <div>
        {title && title !== '' && <span className="font-medium">{title}</span>}
        {desc}
      </div>
    </div>
  );
};

export default AlertComponent;
