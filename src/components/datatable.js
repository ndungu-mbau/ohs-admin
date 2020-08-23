import React from "react";
import transverseNested from "transverse-nested"

const DataTable = props => {
  const { options = { deleteable: false, editable: false, viewable: false }} = props
  if (!props.headers || !props.data) return null;
  return (
    <table
      className={`table table-responsive ${props.className}`}
      // width="100%"
    >
      <thead>
        <tr>
          {props.headers.map(header => {
            return <th key={header.key} title={header.label}>{header.label}</th>;
          })}
          {Object.values(options).some(val => val === true) && <th title="Actions">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {props.data.map(row => {
          return (
            <tr key={row.id}>
              {props.headers.map(header => {
                if(header.view) return header.view(row)
                return <td key={Math.random().toString()}>{transverseNested(row, header.key)}</td>;
              })}
              <td
                data-field="Actions"
                data-autohide-disabled="false"
              >
                <span
                  style={{
                    overflow: "visible",
                    position: "relative",
                    width: "110px"
                  }}
                >
                  {typeof options.editable === "function" ?
                    <button
                      title="Edit details"
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      hidden={!options.editable(row)}
                      onClick={() => {
                        props.edit(row);
                      }}
                    >
                      <i className="far fa-edit" />
                    </button>
                  : options.editable === true ? (
                    <button
                      title="Edit details"
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        props.edit(row);
                      }}
                    >
                      <i className="far fa-edit" />
                    </button>
                  ) : null}
                  {options.deleteable === true ? (
                    <button
                      title="Delete"
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        props.delete(row);
                      }}
                    >
                      <i className="far fa-trash-alt" />
                    </button>
                  ) : null}
                  {options.viewable === true? (
                    <button
                      title="View"
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => props.view(row)}
                    >
                      View
                    </button>
                  ) : null}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable