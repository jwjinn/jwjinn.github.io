```javascript

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- OpenTelemetry 설정 (실무용) ---
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
// ★ 변경됨: 콘솔 대신 HTTP 전송 모듈 사용
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// 1. 프로바이더 생성
const provider = new WebTracerProvider();

// 2. [실무용] Exporter 설정: 지정된 수집 서버 URL로 데이터 전송
provider.addSpanProcessor(new BatchSpanProcessor(
  new OTLPTraceExporter({
    // ★ 여기에 실제 수집 서버 주소를 넣으세요 (예: Jaeger, OTel Collector 등)
    url: 'http://collector.myshop.com:4318/v1/traces', 
  })
));

// 3. 컨텍스트 매니저 등록 (필수)
provider.register({
  contextManager: new ZoneContextManager(),
});

// 4. Fetch 감지기 등록
registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      // ★ 중요: 여전히 백엔드 API 요청 시 헤더에 Trace ID를 붙여야 함
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

