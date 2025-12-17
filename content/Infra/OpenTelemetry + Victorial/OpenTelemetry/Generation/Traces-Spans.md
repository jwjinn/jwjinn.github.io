애플리케이션의 **동작 흐름**을 기록한 데이터입니다. 각 동작 단위인 'Span'에는 다음과 같은 **속성(Attributes)**들이 포함되어 전송됩니다.

#### A. HTTP 수신 (Inbound - Flask, Django, FastAPI 등)

서버가 클라이언트의 요청을 받았을 때 생성되는 Root Span입니다.

- **`http.method`**: HTTP 메서드 (`GET`, `POST`, `PUT`, `DELETE`)
    
- **`http.target`** 또는 **`http.route`**: 요청 경로 (예: `/api/v1/users`, `/login`)
    
- **`http.status_code`**: 응답 상태 코드 (`200`, `404`, `500`)
    
- **`http.scheme`**: 프로토콜 (`http`, `https`)
    
- **`net.peer.ip`**: 클라이언트 IP 주소
    
- **`http.user_agent`**: 클라이언트의 User-Agent 정보
    
- **Start/End Time**: 요청 시작 및 종료 시각 (이를 통해 **Latency** 계산)
    

#### B. HTTP 발신 (Outbound - requests, aiohttp 등)

서버가 외부 서비스나 다른 마이크로서비스를 호출할 때 생성됩니다.

- **`http.url`**: 호출한 외부 대상의 전체 URL (예: `https://api.google.com/search?q=...`)
    
- **`http.method`**: 호출 메서드
    
- **`http.status_code`**: 외부 서버로부터 받은 응답 코드
    

#### C. 데이터베이스 (DB Client - SQLAlchemy, PyMySQL 등)

DB 쿼리를 수행할 때 생성됩니다.

- **`db.system`**: 데이터베이스 종류 (`mysql`, `postgresql`, `redis`, `mongodb` 등)
    
- **`db.name`**: 접속한 데이터베이스 이름
    
- **`db.statement`**: 실행된 SQL 쿼리문
    
    - _보안상 매개변수 값은 `?` 또는 `$1` 등으로 자동 마스킹 처리됨_
        
    - 예: `SELECT * FROM users WHERE id = ?`
        
- **`db.operation`**: 수행 작업 종류 (`SELECT`, `INSERT`, `UPDATE`)
    
- **`net.peer.name`**: DB 서버 호스트 주소
    

#### D. 예외 및 에러 (Exceptions)

코드 실행 중 에러가 발생했을 때 Span에 이벤트 형태로 첨부됩니다.

- **`exception.type`**: 에러 클래스 이름 (예: `ValueError`, `TimeoutError`)
    
- **`exception.message`**: 에러 메시지 내용
    
- **`exception.stacktrace`**: 스택 트레이스 전체 내용 (디버깅용)