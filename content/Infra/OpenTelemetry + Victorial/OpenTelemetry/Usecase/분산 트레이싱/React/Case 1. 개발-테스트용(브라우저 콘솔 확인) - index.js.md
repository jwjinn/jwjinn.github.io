```javascript

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- OpenTelemetry 설정 (개발용) ---
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { BatchSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

// 1. 프로바이더 생성
const provider = new WebTracerProvider();

// 2. [개발용] Exporter 설정: 브라우저 콘솔에 로그를 출력함
// (수집 서버가 없어도 동작 확인 가능)
provider.addSpanProcessor(new BatchSpanProcessor(new ConsoleSpanExporter()));

// 3. 컨텍스트 매니저 등록 (필수)
provider.register({
  contextManager: new ZoneContextManager(),
});

// 4. Fetch 감지기 등록
registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      // ★ 중요: 백엔드 API 요청 시 헤더에 Trace ID를 붙임
      propagateTraceHeaderCorsUrls: [
        /myshop\.com\/api/ 
      ],
    }),
  ],
});
// --- 설정 끝 ---

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

```


