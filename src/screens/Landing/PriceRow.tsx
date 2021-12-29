import React from "react";
import { Link } from "react-router-dom";

const PriceRow: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="table-body table-row">
      <div className="table-cell">
        <img src={item.logo} alt="img" className="landing__prices--logo" />
        <span>{item.name}</span>
      </div>
      <div className="table-cell">${item.price}</div>
      {/*<div className="table-cell">+ 115%</div>*/}
      <div className="table-cell">
        <button className="button secondary medium">
          <Link className="ignore-link" to={"/" + item.pool}>
            Trade
          </Link>
        </button>
      </div>
    </div>
  );
};
export default PriceRow;
