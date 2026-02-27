```
/src
 ├─ components
 │   ├─ SentenceDisplay.jsx
 │   ├─ ToneSlots.jsx
 │   ├─ ToneButtons.jsx
 │
 ├─ data
 │   └─ problems.json
 │
 ├─ App.jsx
 └─ main.jsx
```

### Usage
- Run the dev server inside `dialect-game`:
  ```bash
  cd dialect-game
  npm run dev
  ```
- 게임에서:
  * **↓ → ↑** 화살표로 톤(1,2,3)을 선택합니다 (각 칸마다 자동으로 이동).
  * **←** 왼쪽 화살표는 이전 칸으로 이동합니다.
  * **Enter** 또는 **Space**를 눌러 정답을 제출합니다.

구현에 필요한 것들
1. 문제 겹치지 않도록 함
2. 난이도(난이도 별로 속도가 달라짐, 10개의 문제가 존재함)
3. 클래스(지역별로 문제의 유형이 달라짐)
