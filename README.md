# recipe-community-api

> Node.js + Express + Sequelize 기반 레시피 커뮤니티 REST API 서버

사용자 인증, 레시피, 댓글 기능을 제공하는 CRUD 기반 백엔드 API 서버입니다.

---

## 사용 기술

- Node.js / Express.js 4.x
- Sequelize ORM 6.x + MySQL
- express-session, bcrypt
- Nunjucks, morgan, dotenv

---

## 주요 기능

- 회원가입 및 사용자 CRUD
- 레시피 등록·조회·수정·삭제
- 댓글 CRUD
- 세션 기반 사용자 인증 (bcrypt 해싱)

---

## 프로젝트 구조

```
recipe-community-api/
├── app.js
├── config/config.json
├── models/
│   ├── index.js     # Sequelize 초기화, 관계 설정
│   ├── user.js
│   ├── recipe.js
│   └── comment.js
└── routes/
    ├── index.js     # 공통 조회 라우터
    ├── user.js
    ├── recipe.js
    └── comment.js
```

---

## API 엔드포인트

### User
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/user` | 목록 조회 |
| POST | `/user` | 회원가입 (bcrypt 해싱) |
| POST | `/user/update` | 정보 수정 |
| GET | `/user/delete/:id` | 삭제 |
| GET | `/user/:id/comments` | 사용자의 댓글 목록 |

### Comment
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/comment` | 댓글 작성 |
| PUT | `/comment/:id` | 댓글 수정 |
| DELETE | `/comment/:id` | 댓글 삭제 |

---

## 배운 점

Sequelize ORM을 처음 사용하면서 **SQL을 직접 쓰지 않고 JavaScript 객체로 DB를 조작**하는 방식이 낯설었습니다. `hasMany` / `belongsTo`로 관계를 선언하고, `include` 옵션으로 JOIN 쿼리를 처리하는 구조를 익히면서 ORM의 장점을 체감했습니다.

세션과 쿠키의 차이, `httpOnly` 플래그가 XSS 공격을 막는 원리 등 인증 흐름을 코드로 직접 구현하며 이해할 수 있었습니다.

---

## 어려웠던 점

댓글 수정·삭제 라우터를 구현할 때 Sequelize 메서드를 제대로 파악하지 못하고 MongoDB의 `findByIdAndDelete()`를 그대로 사용하는 실수를 했습니다. 런타임에서야 오류를 발견했고, Sequelize의 `findOne()` + `destroy()` 조합으로 수정했습니다. ORM마다 메서드 이름이 달라 공식 문서를 꼼꼼히 확인하는 습관의 중요성을 배웠습니다.

또한 사용자 삭제를 `DELETE /user/:id`가 아닌 `GET /user/delete/:id`로 구현한 부분은 REST 원칙에 맞지 않는다는 것을 나중에 알았습니다. HTTP 메서드의 의미를 처음부터 정확히 이해하고 설계에 반영하는 것이 중요함을 느꼈습니다.

---

## 아쉬운 점 및 개선 방향

- **인증 구조**: 세션 기반 인증을 JWT로 전환하면 서버 메모리 부담 없이 Stateless 구조를 만들 수 있습니다.
- **레시피 라우터 미완성**: 레시피 기능을 설계만 하고 실제 라우터 구현을 완성하지 못했습니다. 다음 기회에는 먼저 API 명세를 작성한 후 구현하는 순서로 진행하고 싶습니다.
- **예외 처리**: 현재는 try-catch로 에러를 넘기기만 해서, 클라이언트에 의미 있는 에러 메시지를 전달하지 못합니다. 에러 코드와 메시지를 표준화한 응답 형식이 필요합니다.
- **문서화**: Swagger(OpenAPI)로 API 명세를 자동 생성하면 협업 시 훨씬 편리할 것 같습니다.

---

## 추가로 공부해야 할 내용

- JWT 기반 인증 (Access Token / Refresh Token)
- REST API 설계 원칙 (HTTP 메서드 의미, 상태 코드)
- Sequelize 트랜잭션 처리
- API 예외 처리 미들웨어 설계
- Docker를 활용한 MySQL + Node.js 컨테이너 구성
