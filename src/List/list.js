import "./list.css";
function List(props) {
  return (
    <div className={props.className}>
      <div className="info">
        <img className="image" src={props.src} />
        <h3>{props.name}</h3>
      </div>
      <span className="dot"></span>
        <h3>{props.status}-</h3>
        <h3>{props.spi}</h3>
    </div>
  );
}

export default List;
