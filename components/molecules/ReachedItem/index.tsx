interface ReachedProps {
  desc1: any;
  desc2: any;
}

export default function ReachedItem(props: ReachedProps) {
  const { desc1, desc2 } = props;
  return (
    <div className="me-lg-35">
      <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0"> {desc1}</p>
      <p className="text-lg text-lg-start text-center color-palette-2 m-0">{desc2}</p>
    </div>
  );
}
