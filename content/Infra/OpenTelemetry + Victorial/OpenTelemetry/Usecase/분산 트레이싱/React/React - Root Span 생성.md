**OTel Web SDK**가 동작합니다. 여기서 최초의 ID들이 생성됩니다.

- **Action:** `POST /api/order` 요청 생성
- **Generated Context:**
    
    - **Trace ID:** `4bf92f3577b34da6a3ce929d0e0e4736` (전체 트랜잭션을 관통하는 불변의 고유 ID)
        
    - **Span ID (Span A):** `00f067aa0ba902b7` (React에서 발생한 '클릭' 이벤트 자체의 ID)
        
    - **Parent Span ID:** `null` (이것이 뿌리(Root)이기 때문)
        
    - **Trace Flags:** `01` (Sampled: 기록하기로 결정함)
        
- **Service Name:** `frontend-react`
***
## Service Name:
```javscript

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// 🆕 [추가 1] 내 정체(리소스)를 정의하기 위한 모듈
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

// 1. 프로바이더 생성 (여기가 바뀌었습니다! ⭐️)
const provider = new WebTracerProvider({
  // 🆕 [추가 2] 리소스 설정: "제 이름은 frontend-react 입니다!"
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'frontend-react', // 이 이름으로 통계가 잡힙니다.
    'service.version': '1.0.0',            // 버전도 넣으면 더 좋습니다.
    'deployment.environment': 'production' // 배포 환경 (dev/prod)
  }),
});

// 2. Exporter 설정
provider.addSpanProcessor(new BatchSpanProcessor(
  new OTLPTraceExporter({
    url: 'http://collector.myshop.com:4318/v1/traces', 
  })
));

// 3. 컨텍스트 매니저
provider.register({
  contextManager: new ZoneContextManager(),
});

// 4. 감지기 등록
registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [
        /myshop\.com\/api/ 
      ],
    }),
  ],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

```
