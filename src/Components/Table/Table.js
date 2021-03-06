import { useMemo, useCallback } from 'react';
import { Icon } from 'components';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import './Table.scss';

const blockName = 'table-wrapper';

const EditIcon = () => <Icon icon={faEdit} />;
const RemoveIcon = () => <Icon icon={faTrash} />;

const Table = ({
  data,
  headers,
  withAction,
  isEditable,
  isRemove,
  onEdit,
  onRemove,
  noRemove,
}) => {
  const handleRemoveItem = useCallback(
    (item) => {
      onRemove(item);
    },
    [onRemove],
  );
  const handleEditItem = useCallback(
    (item) => {
      onEdit(item);
    },
    [onEdit],
  );

  const renderHeaders = useMemo(() => {
    return headers.map((header) => (
      <th id={header.key} key={header.key}>
        {header.display}
      </th>
    ));
  }, [headers]);

  const renderBody = useMemo(() => {
    return data.map((_data, i) => {
      return (
        <tr key={_data._id}>
          <td>{i + 1}</td>
          {headers.map((header, index) => (
            <>
              <td key={`${_data._id}-${_data[header.key]}`}>
                {_data[header.key]}
              </td>
              {withAction && index + 1 === headers.length && (
                <td
                  key={`${_data._id}-actions`}
                  className={`${blockName}__action-cell-item`}
                >
                  {isEditable && (
                    <button onClick={() => handleEditItem(_data)}>
                      <EditIcon />
                    </button>
                  )}
                  {isRemove && (
                    <button onClick={() => handleRemoveItem(_data)}>
                      <RemoveIcon />
                    </button>
                  )}
                </td>
              )}
            </>
          ))}
        </tr>
      );
    });
  }, [
    data,
    headers,
    isEditable,
    isRemove,
    withAction,
    handleRemoveItem,
    handleEditItem,
  ]);

  if (data.length === 0) {
    return <h4>No hay registros</h4>;
  }

  return (
    <div className={blockName}>
      <table>
        <thead>
          <tr>
            <th className={`${blockName}__index-header`}>#</th>
            {renderHeaders}
            {withAction && (
              <th className={`${blockName}__action-cell-header`} />
            )}
          </tr>
        </thead>
        <tbody>{renderBody}</tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  data: [],
  headers: [],
  withAction: true,
  isEditable: true,
  isRemove: true,
  onEdit: () => {},
  onRemove: () => {},
};

export default Table;
