```Bash

npm install \
  @opentelemetry/api \
  @opentelemetry/sdk-trace-web \
  @opentelemetry/sdk-trace-base \
  @opentelemetry/instrumentation \
  @opentelemetry/instrumentation-fetch \
  @opentelemetry/instrumentation-xml-http-request \
  @opentelemetry/context-zone \
  @opentelemetry/exporter-trace-otlp-http \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions
  

```
- **SDK/API/Base**는 시스템을 켜고 관리하는 **두뇌**입니다.
    
- **Instrumentation(Fetch/XHR)**은 요청을 낚아채서 Trace ID를 붙이는 **손발**입니다.
    
- **Exporter**는 기록된 데이터를 서버로 보내는 **트럭**입니다.
