import { useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  const totalItem = items.length;
  const totalPacked = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((totalPacked / totalItem) * 100);
  function handleItem(item) {
    setItems((items) => [...items, item]);
  }
  function HandleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function UpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo></Logo>
      <Form OnHandleItem={handleItem}></Form>
      <PackingList
        items={items}
        onHanleDelete={HandleDelete}
        onUpdateItem={UpdateItem}
      ></PackingList>
      <Stats totalItem={totalItem} percentage={percentage}></Stats>
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}
function Form({ OnHandleItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    OnHandleItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onClick={handleSubmit}>
      <h3>What do you need for your tirp?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onHanleDelete, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onHanleDelete={onHanleDelete}
            onUpdateItem={onUpdateItem}
            key={item.id}
          ></Item>
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onHanleDelete, onUpdateItem }) {
  return (
    <li>
      <span>
        <input
          type="checkbox"
          onChange={() => {
            onUpdateItem(item.id);
          }}
        />
      </span>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onHanleDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ totalItem, percentage }) {
  return (
    <footer className="stats">
      {totalItem > 0
        ? `You have ${totalItem} items on your list,and you already packed${" "}
      ${percentage}%`
        : "Let's pack something for wonderful journey"}
    </footer>
  );
}
