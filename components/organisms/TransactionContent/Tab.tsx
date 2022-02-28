import cx from "classnames";

interface TabProps {
  title: string;
  active: boolean;
  onClick: () => void;
}
export default function Tab(props: TabProps) {
  const { title, active, onClick } = props;
  const btnClass = cx({
    "btn btn-status rounded-pill text-sm me-3": true,
    "btn-active": active,
  });
  return (
    <button onClick={onClick} type="button" className={btnClass}>
      {title}
    </button>
  );
}
