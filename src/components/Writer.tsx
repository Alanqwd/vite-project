//Состояние 

import { useState, type ChangeEvent } from "react";

export default function Writer() {

  const [textDefault, setDefault] = useState<string>("wdwdwdwd");
  const [textUpdate, setUpdate] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdate(e.target.value);
  };

  const applyUpdate = () => {
    setDefault(textUpdate); 
 };

  return (
    <div>
      <input
        type="text"
        value={textUpdate}
        onChange={handleChange}
        placeholder="Введите текст..."
      />
      <p>Текущий текст: {textDefault}</p>
      <button onClick={applyUpdate}>Изменить текст</button>
    </div>
  );
}

