import { useEffect, useState } from "react";
import { MENU } from "./menu-items";
import MenuCard from "./MenuCard";

export default function App() {
  useEffect(() => {
    document.title = "Sushi Menu";
  }, []);
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [veganOnly, setVeganOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);
  const [toGoOnly, setToGoOnly] = useState(false);
  const [questionOnly, setQuestionOnly] = useState(false);

  const filtered = MENU.filter((item) => {
    const q = query.toLowerCase();
    const matchQuery =
      q === "" ||
      item.name.toLowerCase().includes(q) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
      item.sauces.some((ing) => ing.toLowerCase().includes(q));

    const matchCategory = category === "All" || item.category === category;
    const matchVegan = !veganOnly || item.vegan;
    const matchGlutenFree = !glutenFreeOnly || item.glutenFree;
    const matchToGo = !toGoOnly || item.togo;
    const matchQuestion = !questionOnly || item.question;

    return (
      matchQuery &&
      matchCategory &&
      matchVegan &&
      matchGlutenFree &&
      matchToGo &&
      matchQuestion
    );
  });

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 수직 정렬
        justifyContent: "flex-start", // 상단부터 시작
        height: "100vh", // 전체 화면 높이 차지
      }}
    >
      {/* 🔝 고정 영역 (검색 + 카테고리 + 체크박스) */}
      <div
        style={{
          flexShrink: 0, // 크기 고정
          borderBottom: "1px solid #ddd",
          padding: "10px",
          background: "#fff", // 리스트 스크롤 시 배경 유지
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <h2 style={{ margin: 0 }}>🍣 Sushi Menu</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "8px",
              fontSize: "16px",
              flexShrink: 1, // 줄어드는 건 select만
              maxWidth: "250px", // 너무 길어지면 잘리도록
            }}
          >
            <option value="All">All</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Salad">Salad</option>
            <option value="Tempura">Tempura</option>
            <option value="A La Carte">A La Carte</option>
            <option value="Noodle">Noodles</option>
            <option value="Oshi Sushi">Oshi Sushi</option>
            <option value="Donburi">Donburi</option>
            <option value="Sashimi">Sashimi</option>
            <option value="Nigiri">Nigiri</option>
            <option value="Rolls">Rolls</option>
            <option value="Special Roll">Special Roll</option>
            <option value="Baked Special Roll">Baked Special Roll</option>
            <option value="Deep Fried Roll">Deep Fried Roll</option>
            <option value="Combo">Combo</option>
            <option value="Bento Box">Bento Box</option>
            <option value="Party Tray">Party Tray</option>
          </select>
          <input
            type="text"
            placeholder="Search ingredient, name, sauce..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "8px",
              fontSize: "16px",
              flex: 1, // 남는 공간 다 차지
              minWidth: "400px",
            }}
          />
        </div>

        <div style={{ marginBottom: "5px" }}>
          <label style={{ marginRight: "12px" }}>
            <input
              type="checkbox"
              checked={veganOnly}
              onChange={(e) => setVeganOnly(e.target.checked)}
            />
            Vegan
          </label>
          <label style={{ marginRight: "12px" }}>
            <input
              type="checkbox"
              checked={glutenFreeOnly}
              onChange={(e) => setGlutenFreeOnly(e.target.checked)}
            />
            Gluten Free
          </label>
          <label style={{ marginRight: "12px" }}>
            <input
              type="checkbox"
              checked={toGoOnly}
              onChange={(e) => setToGoOnly(e.target.checked)}
            />
            To Go
          </label>
          <label>
            <input
              type="checkbox"
              checked={questionOnly}
              onChange={(e) => setQuestionOnly(e.target.checked)}
            />
            질문
          </label>
        </div>
      </div>

      {/* 🔽 리스트 영역 (스크롤 가능) */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "10px",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((item, index) => (
            <li key={index}>
              <MenuCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
