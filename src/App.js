import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import List from "./List/list";
import initialList from "./List/initialList";

function App() {
  let initialRender = useRef(false);
  let loadingRef = useRef();
  let windowRef = useRef();
  const [enteredFilter, setEnteredFilter] = useState("");
  const [enteredList, setEnteredList] = useState(initialList);
  const [currmaxpage, setcurrmaxpage] = useState({ curr: 1, maxpage: null });
  const [loading, setloading] = useState({ condition: false, msg: "Loading" });

  //fetch names
  const getName = (names, pages, signal) => {
    setloading({ condition: true, msg: "Loading" });
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?name=${names}&page=${pages}`
      )
      .then((res) => res.data)
      .then((data) => {
        if (signal) {
          setEnteredList([...enteredList, ...data.results]);
          setcurrmaxpage((page) => ({ ...page, curr: pages }));
        } else {
          setEnteredList(data.results);
          setcurrmaxpage((page) => ({ curr: 1, maxpage: data.info.pages + 1 }));
          setloading({ condition: false, msg: "Loading" });
        }
      })
      .catch((err) => {
        return;
      });
  };

  //debouncing the api
  useEffect(() => {
    if (initialRender.current) {
      if (enteredFilter) {
        const timer = setTimeout(() => {
          getName(enteredFilter, 1, 0);
        }, 500);
        return () => {
          clearTimeout(timer);
        };
      } else {
        setEnteredList(initialList);
      }
    } else {
      initialRender.current = true;
    }
  }, [enteredFilter]);

  //observer API
  useEffect(() => {
    let options = {
      root: windowRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities, observer) => {
      const first = entities[0];
      if (first.isIntersecting) {
        const nextPage = currmaxpage.curr + 1;
        if (nextPage < currmaxpage.maxpage && enteredFilter) {
          getName(enteredFilter, nextPage, 1);
        } else {
          setloading({ condition: false, msg: "End of Results" });
        }
      }
    }, options);
    observer.observe(loadingRef.current);
    return () => observer.unobserve(loadingRef.current);
  }, [enteredList, currmaxpage]);

  let displaylist = enteredList.map((item, i) => {
    return (
      <List
        key={i}
        image={item.image}
        name={item.name}
        status={item.status}
        species={item.species}
        origin={item.origin.name}
        gender={item.gender}
        location={item.location.name}
      ></List>
    );
  });

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
      </div>
      <div ref={windowRef} className="listings">
        {displaylist}
        <div ref={loadingRef}>
          <span>{loading.msg}...</span>
        </div>
      </div>
    </div>
  );
}

export default App;
