import cx from "classnames";
import NumberFormat from "react-number-format";

interface TableRowProps {
  title: string;
  category: string;
  item: string;
  price: number;
  stats: string;
  image: string;
}

export default function TableRow(props: TableRowProps) {
  const { title, category, item, price, stats, image } = props;
  const stats2 = cx({
    "float-start icon-status": true,
    pending: stats === "Pending",
    failed: stats === "Failed",
    success: stats === "Success",
  });
  return (
    <tr className="align-middle">
      <th scope="row">
        <img className="float-start me-3 mb-lg-0 mb-3" src={image} width={80} height={60} alt="" />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">{title}</p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">{category}</p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">{item}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">
          {" "}
          <NumberFormat value={price} prefix="Rp. " displayType="text" thousandSeparator="." decimalSeparator="," />
        </p>
      </td>
      <td>
        <div>
          <span className={stats2} />
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">{stats}</p>
        </div>
      </td>
    </tr>
  );
}
