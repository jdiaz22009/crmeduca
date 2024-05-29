export interface IWidgetProps {
  title: string;
  point: number;
}

const Widget = ({title, point}: IWidgetProps) => {
  return (
    <div className="bg-black/60 p-6 rounded-lg w-max-10">
      <div className="flex flex-row items-center">
        <div>
          <p className="text-teal-300 text-sm font-medium uppercase leading-4">
            {title}
          </p>
          <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
            <span>{point}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
