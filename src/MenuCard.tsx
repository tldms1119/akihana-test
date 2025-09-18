import React, { useState } from "react";
import type { MenuItem } from "./menu-items";

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxSizing: "border-box", // 패딩/보더 포함해서 폭 계산
        padding: "16px",
        marginBottom: "15px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        cursor: "pointer",
        textAlign: "center",
        transition: "0.3s",
        // width: "400px", // 폭 고정
        // maxWidth: "100%", // 화면이 좁으면 반응형
        width: "100%", // 화면에 맞춰 늘어남
        maxWidth: "400px", // 최대 폭 고정
      }}
      onClick={() => setOpen(!open)}
    >
      {/* 항상 보이는 메뉴명 */}
      <h3 style={{ margin: 0 }}>{item.name}</h3>

      {/* 클릭했을 때만 보이는 상세 */}
      {open && (
        <div
          style={{
            marginTop: "12px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <div>
              <b>{item.price}</b>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {item.vegan && <div>🥬 Vegan</div>}
              {item.glutenFree && <div>🌾 GF</div>}
              {item.togo && <div>🥡 To Go</div>}
            </div>
          </div>

          {item.ingredients.length > 0 && (
            <div style={{ marginBottom: "5px" }}>
              <b>Ingredients:</b> {item.ingredients.join(", ")}
            </div>
          )}
          {item.sauces.length > 0 && (
            <div style={{ marginBottom: "5px" }}>
              <b>Sauces:</b> {item.sauces.join(", ")}
            </div>
          )}
          {item.etc && (
            <div style={{ marginBottom: "5px" }}>
              ℹ️ <i>{item.etc}</i>
            </div>
          )}
          {item.question && (
            <div style={{ color: "red" }}>
              <b>{item.question}</b>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuCard;
