import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(
            col =>
              col.path ? (
                <th
                  className="clickable"
                  key={col.path || col.key}
                  onClick={() => this.raiseSort(col.path)}
                >
                  {col.label}
                  {this.renderSortIcon(col)}
                </th>
              ) : (
                <th key={col.key} />
              )
          )}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
