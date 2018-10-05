import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
class TableBody extends Component {
  renderCell = (item, column) => {
    const labelName = _.get(item, column.path);
    return column.content ? (
      column.content(item)
    ) : column.linkto ? (
      <Link to={`/movies/${item._id}`}>{labelName}</Link>
    ) : (
      labelName
    );
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
