import {ICourse} from '@/types';

export interface TableRow {
  [key: string]: string;
}

interface TableProps {
  columns: string[];
  data: any;
  handlerEdit: (data: ICourse) => void;
  handlerDelete: (data: ICourse) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  handlerEdit,
  handlerDelete,
}) => {
  return (
    <>
      <div>
        <table className="min-w-full mt-1 border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  {column}
                </th>
              ))}
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {data.map((row: any, rowIndex: any) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? 'bg-gray-300' : 'bg-white'
                } border border-grey-500 md:border-none block md:table-row`}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      {column}
                    </span>
                    {row[column.toLowerCase()]}
                  </td>
                ))}
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <button
                    onClick={() => handlerEdit(row)}
                    className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-indigo-500 rounded">
                    Editar
                  </button>
                  <button
                    onClick={() => handlerDelete(row)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
