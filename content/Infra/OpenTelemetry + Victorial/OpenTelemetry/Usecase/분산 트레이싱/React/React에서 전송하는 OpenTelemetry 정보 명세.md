#### ① 기본 정보 (누구인가?)
- **Trace ID & Span ID:** "이게 아까 그 777번 작업의 일부입니다."
- **Parent ID:** "저는 A함수가 시켜서 일했습니다." (부모-자식 관계)
    
#### ② 시간 정보 (얼마나 걸렸나?)

- **Start Time:** 14:00:00.000
- **End Time:** 14:00:02.500
- **Duration:** **2.5초** (질문하신 부분)
    
#### ③ 상황 정보 (Attributes/Tags - 핵심!)

- **`http.method`:** `GET`인지 `POST`인지
- **`http.url`:** 정확히 어떤 주소로 보냈는지 (`https://api.myshop.com/pay`)
- **`http.status_code`:** **200(성공)**인지 **500(서버 에러)**인지, **404(못 찾음)**인지
- **`net.peer.name`:** 목적지 도메인 (`api.myshop.com`)

#### ④ 에러 정보 (Events)

만약 실패했다면, 단순 실패가 아니라 **"왜 죽었는지"**가 포함됩니다.
- **`exception.type`:** `TypeError` 또는 `NetworkError`
- **`exception.message`:** "Failed to fetch" (인터넷 끊김 등)
- **`exception.stacktrace`:** 에러가 발생한 코드 위치