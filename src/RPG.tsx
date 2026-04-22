import React, { useReducer } from "react";

type State = {
  hp: number;
  mp: number;
  strength: number;
  agility: number;
  history: string[]; 
};

type TrainPayload = {
  stat: "strength" | "agility";
  value: number;
};

type Action =
| { type: "TAKE_DAMAGE"; payload?: number }
| { type: "HEAL"; payload?: number }
| { type: "TRAIN"; payload?: TrainPayload }
| { type: "RESET" }
| { type: "LEVEL_UP" }
| { type: "HISTORY"; payload?: string };

const initialState: State = {
  hp: 100,
  mp: 50,
  strength: 10,
  agility: 10,
  history: [],
};


function History(history: string[], entry?: string): string[] {
  if (!entry) return history;
  const newHistory = [entry, ...history].slice(0, 3);
  return newHistory;
}


function reducer(state: State, action: Action): State {

  switch (action.type) {

    case "TAKE_DAMAGE": {
      const dmg = action.payload ?? 0;
      const newHp = Math.max(0, state.hp - dmg);
      return {
        ...state,
        hp: newHp,
        history: History(state.history, `Получил ${dmg} урон`),
      };
    }

    case "HEAL": {
      const heal = action.payload ?? 0;
      const newHp = Math.max(0, state.hp + heal);
      return {...state, hp: newHp, history: History(state.history, `Хилка ${heal}`),
      };
    }

    case "TRAIN": {
      const payload = action.payload ?? { stat: "strength", value: 0 };
      if (payload.stat === "strength") {
        const newStrength = Math.min(100, state.strength + (payload.value ?? 0));
        return {...state,strength: newStrength,history: History(state.history, `Сила +${payload.value ?? 0}`),
        };
      } else {
        const newAgility = Math.min(100, state.agility + (payload.value ?? 0));
        return {...state,agility: newAgility,history: History(state.history, `Ловкость +${payload.value ?? 0}`),
        };
      }
    }

    case "LEVEL_UP": {
      const newStrength = Math.min(100, state.strength + 5);
      const newAgility = Math.min(100, state.agility + 5);
      return {...state,strength: newStrength,agility: newAgility,history: History(state.history, `+5 к силе и к ловкости, повысил уровень на 1`),
      };
    }

    case "RESET":
      return { ...initialState, history: History(state.history, "сбросил") };

    case "HISTORY": {
      return { ...state, history: History(state.history, action.payload) };
    }

    default:
      return state;
  }
}


function Stats({ state }: { state: State }) {
  const overallLevel = Math.floor((state.strength + state.agility) / 10);

  return (
    <div style={{ padding: 12, width: 320 }}>
      <h3>Характеристики</h3>
      <div>ХП: {state.hp}</div>
      <div>Броня: {state.mp}</div>
      <div>Сила: {state.strength}</div>
      <div>Ловкость: {state.agility}</div>
      <div><strong>Общий уровень: </strong> {overallLevel}</div>
      <div style={{ marginTop: 8 }}>
        <strong>История: </strong>
        <ul>
          {state.history.length === 0 ? <li>(Пока что нет действий)</li> : state.history.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      </div>
    </div>
  );
}
function Panel({ dispatch }: { dispatch: React.Dispatch<Action> }) {
  return (
    <div style={{ marginTop: 12 }}>
      <h3>Панель управления</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => dispatch({ type: "TAKE_DAMAGE", payload: 10 })}>Атаковать</button>
        <button onClick={() => dispatch({ type: "HEAL", payload: 10 })}>Похилиться</button>
        <button onClick={() => dispatch({ type: "TRAIN", payload: { stat: "strength", value: 5 } })}>Сила</button>
        <button onClick={() => dispatch({ type: "TRAIN", payload: { stat: "agility", value: 5 } })}>Ловкость</button>
        <button onClick={() => dispatch({ type: "LEVEL_UP" })}>Повысить уровень (+5 и силе и к ловкости)</button>
        <button onClick={() => dispatch({ type: "RESET" })}>Сбросить</button>
      </div>
    </div>
  );
}
export default function App() {
 const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <h2>Менеджер характеристик RPG-персонажа</h2>
      <Stats state={state} />
      <Panel dispatch={dispatch} />
    </div>
  );
}
