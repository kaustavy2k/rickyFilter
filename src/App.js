import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import List from "./List/list";

function App() {
  let initialRender = useRef(false);
  const [enteredFilter, setEnteredFilter] = useState("");
  const [enteredList, setEnteredList] = useState([
    {
      className: "list",
      image: "https://rickandmortyapi.com/api/character/avatar/180.jpeg",
      name: "Jessica",
      status: "Alive",
      species: "Cronenberg",
    },
    {
      className: "list",
      image: "https://rickandmortyapi.com/api/character/avatar/380.jpeg",
      name: "Weird Rick",
      status: "Unknown",
      species: "Human",
    },
    {
      className: "list",
      image: "https://rickandmortyapi.com/api/character/avatar/608.jpeg",
      name: "Jesus Christ",
      status: "Alive",
      species: "Human",
    },
    {
      className: "list",
      image: "https://rickandmortyapi.com/api/character/avatar/664.jpeg",
      name: "Ticktock",
      status: "Unknown",
      species: "Humanoid",
    },
  ]);

  useEffect(() => {
    if (initialRender.current) {
      console.log("hi");
      const timer = setTimeout(() => {
        axios
          .get(
            `https://rickandmortyapi.com/api/character/?name=${enteredFilter}&page=1`
          )
          .then((res) => res.data)
          .then((data) => {
            setEnteredList(data.results);
          });
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    } else {
      initialRender.current = true;
    }
  }, [enteredFilter]);
  let displaylist = enteredList.map((item, i) => {
    return (
      <List
        key={i}
        className="list"
        src={item.image}
        name={item.name}
        status={item.status}
        spi={item.species}
      ></List>
    );
  });
  console.log(displaylist);

  return (
    <div className="App">
      <div className="heading">
        <h1>Rick and Morty Search</h1>
      </div>
      <div className="search">
        <Input
          onChange={(event) => setEnteredFilter(event.target.value)}
          size="large"
          placeholder="Search here"
          prefix={<SearchOutlined />}
        />
        <div className="listings"></div>
        {displaylist}
      </div>
    </div>
  );
}

export default App;
