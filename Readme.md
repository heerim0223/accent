Dialingo (Dialect + Duolingo)

<img width="224" height="224" alt="Image" src="https://github.com/user-attachments/assets/2280030a-645c-4a7b-8c91-6a1d52024950" />

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

- 구현에 필요한 것들
  * 문제 겹치지 않도록 함
  * 난이도(난이도 별로 속도가 달라짐, 10개의 문제가 존재함)
  * 클래스(지역별로 문제의 유형이 달라짐)
  * 점수가 0점 이하일 때 이벤트 처리
