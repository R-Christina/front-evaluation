import React from "react";

const Apercue = ({ ficheData }) => {
  return (
    <div className="border p-4 bg-gradient rounded">
      {/* Tableau Collaborateur/Manager */}
      <table className="table mb-4">
        <thead className="table-success">
          <tr>
            <th></th>
            <th>Collaborateur</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {ficheData?.header_selections?.["$values"] && ficheData.header_selections["$values"].length > 0 ? (
            ficheData.header_selections["$values"].map((header) => (
              <tr key={header.header_selection_id}>
                 <td>{header.selectionLabel}</td>
                <td></td>
                <td></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                Aucune en-tête sélectionnée
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Tableau principal */}
      <table className="table table-bordered table-responsive-sm">
        <thead className="tablee">
          <tr>
            <th></th>
            {ficheData?.ths?.["$values"] && ficheData.ths["$values"].map((th) => (
              <th key={th.th_id}>{th.th_nom}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ficheData?.td_principales?.["$values"] && ficheData.td_principales["$values"].map((td) => {
            const rows = [];
            for (let i = 0; i < td.ligne; i++) {
              if (i === 0) {
                rows.push(
                  <tr key={`${td.td_principale_id}-${i}`}>
                    <td rowSpan={td.ligne} className="align-middle" style={{ background: 'rgba(70, 77, 238, 0.1)' }}>
                      {td.td_principale_nom}
                    </td>
                    {ficheData.ths["$values"].map((th, index) => (
                      <td key={index} className="text-center"></td>
                    ))}
                  </tr>
                );
              } else {
                rows.push(
                  <tr key={`${td.td_principale_id}-${i}`}>
                    {ficheData.ths["$values"].map((th, index) => (
                      <td key={index} className="text-center"></td>
                    ))}
                  </tr>
                );
              }
            }
            return rows;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Apercue;