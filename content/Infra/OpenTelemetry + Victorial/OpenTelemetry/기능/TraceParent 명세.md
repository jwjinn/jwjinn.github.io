이 문자열은 **W3C 표준**에 따라 4구역으로 나뉜 **암호문**과 같습니다. 하이픈(`-`)을 기준으로 잘라서 해석해야 합니다.

**예시:** `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`

|**순서**|**구분**|**값 (예시)**|**의미 (해석)**|
|---|---|---|---|
|**1**|**버전**|`00`|**"이 형식은 W3C 표준 00버전입니다."**<br><br>  <br><br>나중에 표준이 바뀌면 이 숫자가 바뀔 수 있지만, 당분간은 무조건 `00`입니다.|
|**2**|**Trace ID** ⭐️|`4bf92f...`|**"전체 프로젝트 번호는 이겁니다."**<br><br>  <br><br>(32자리) 프론트엔드가 처음 만든 그 ID입니다. 끝까지 변하지 않습니다.|
|**3**|**Parent ID** 👨‍👦|`00f067...`|**"바로 직전에 나를 호출한 녀석의 ID입니다."**<br><br>  <br><br>(16자리)<br><br>  <br><br>• 프론트가 보낼 때: 프론트의 Span ID<br><br>  <br><br>• 백엔드A가 보낼 때: 백엔드A의 Span ID|
|**4**|**Flags** 🚩|`01`|**"녹화(Sampling) 여부입니다."**<br><br>  <br><br>• `01`: "이건 중요한 거니까 끝까지 기록해!" (Record)<br><br>  <br><br>• `00`: "이건 그냥 넘겨, 기록하지 마." (Don't Record)|
>[!tip]
>TraceParent는 서비스간에 통신을 할 때, 필요한 값들을 포장해서 전달하는 값이다.

***
## Flags:
- 트레이스를 제일 먼저 만든 곳에서 주로 설정을 한다.
- React에서는 OpenTelemetry SDK 설정에 `TraceIdRatioBased` 같은 옵션을 활용한다.

### 개발 상황:
- samplingRatio: 1.0 -> React는 무조건 Flag에 01을 입력해서 transparent로 전송을 한다.
### 운영 상황:
- samplingRatio: 0.1 -> 10퍼센트 확률로 로그를 저장을 한다.

```javascript

import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'; import { AlwaysOnSampler, TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-base'; // 1. [개발용] 무조건 100% 기록 (Flag 무조건 01) const provider = new WebTracerProvider({ sampler: new AlwaysOnSampler(), }); // OR // 2. [운영용] 10% 확률로 기록 (운 좋으면 01, 아니면 00) // const provider = new WebTracerProvider({ // sampler: new TraceIdRatioBasedSampler(0.1), // });

```
