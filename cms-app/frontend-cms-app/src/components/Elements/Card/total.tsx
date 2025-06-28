type CardTotalProps = {
  title: string;
  total: number;
  bg: string;
  fontcolor: string;
};

const CardTotal = ({ title, total, bg, fontcolor }: CardTotalProps) => {
  return (
    <div className={`${bg} rounded-lg shadow-md overflow-hidden`}>
      <div className="p-4">
        <h2 className={`${fontcolor} text-lg font-bold`}>{title}</h2>
        <h5 className={`${fontcolor} text-lg font-semibold`}>{total}</h5>
      </div>
    </div>
  );
};
export default CardTotal;
