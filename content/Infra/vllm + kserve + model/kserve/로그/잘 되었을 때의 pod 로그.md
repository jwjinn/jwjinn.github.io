
```shell

(APIServer pid=1) INFO 12-25 04:48:38 [api_server.py:1351] vLLM API server version 0.13.0
(APIServer pid=1) INFO 12-25 04:48:38 [utils.py:253] non-default args: {'port': 8080, 'model': '/mnt/models/model-files', 'trust_remote_code': True, 'dtype': 'bfloat16', 'max_model_len': 8192, 'served_model_name': ['qwen-custom']}
(APIServer pid=1) The argument `trust_remote_code` is to be used with Auto classes. It has no effect here and is ignored.
(APIServer pid=1) INFO 12-25 04:48:44 [model.py:514] Resolved architecture: Qwen3VLMoeForConditionalGeneration
(APIServer pid=1) INFO 12-25 04:48:44 [model.py:1661] Using max model len 8192
(APIServer pid=1) INFO 12-25 04:48:45 [scheduler.py:230] Chunked prefill is enabled with max_num_batched_tokens=8192.
(EngineCore_DP0 pid=79) INFO 12-25 04:48:51 [core.py:93[] Initializing a V1 LLM engine (v0.13.0) with config: model='/mnt/models/model-files', speculative_config=None, tokenizer='/mnt/models/model-files', skip_tokenizer_init=False, tokenizer_mode=auto, revision=None, tokenizer_revision=None, trust_remote_code=True, dtype=torch.bfloat16, max_seq_len=8192, download_dir=None, load_format=auto, tensor_parallel_size=1, pipeline_parallel_size=1, data_parallel_size=1, disable_custom_all_reduce=False, quantization=None, enforce_eager=False, kv_cache_dtype=auto, device_config=cuda, structured_outputs_config=StructuredOutputsConfig(backend='auto', disable_fallback=False, disable_any_whitespace=False, disable_additional_properties=False, reasoning_parser='', reasoning_parser_plugin='', enable_in_reasoning=False), observability_config=ObservabilityConfig(show_hidden_metrics_for_version=None, otlp_traces_endpoint=None, collect_detailed_traces=None, kv_cache_metrics=False, kv_cache_metrics_sample=0.01, cudagraph_metrics=False, enable_layerwise_nvtx_tracing=False), seed=0, served_model_name=qwen-custom, enable_prefix_caching=True, enable_chunked_prefill=True, pooler_config=None, compilation_config={'level': None, 'mode': <CompilationMode.VLLM_COMPILE: 3>, 'debug_dump_path': None, 'cache_dir': '', 'compile_cache_save_format': 'binary', 'backend': 'inductor', 'custom_ops': ['none'], 'splitting_ops': ['vllm::unified_attention', 'vllm::unified_attention_with_output', 'vllm::unified_mla_attention', 'vllm::unified_mla_attention_with_output', 'vllm::mamba_mixer2', 'vllm::mamba_mixer', 'vllm::short_conv', 'vllm::linear_attention', 'vllm::plamo2_mamba_mixer', 'vllm::gdn_attention_core', 'vllm::kda_attention', 'vllm::sparse_attn_indexer'], 'compile_mm_encoder': False, 'compile_sizes': [], 'compile_ranges_split_points': [8192[], 'inductor_compile_config': {'enable_auto_functionalized_v2': False, 'combo_kernels': True, 'benchmark_combo_kernel': True}, 'inductor_passes': {}, 'cudagraph_mode': <CUDAGraphMode.FULL_AND_PIECEWISE: (2, 1)>, 'cudagraph_num_of_warmups': 1, 'cudagraph_capture_sizes': [1, 2, 4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 256, 272, 288, 304, 320, 336, 352, 368, 384, 400, 416, 432, 448, 464, 480, 496, 512], 'cudagraph_copy_inputs': False, 'cudagraph_specialize_lora': True, 'use_inductor_graph_partition': False, 'pass_config': {'fuse_norm_quant': False, 'fuse_act_quant': False, 'fuse_attn_quant': False, 'eliminate_noops': True, 'enable_sp': False, 'fuse_gemm_comms': False, 'fuse_allreduce_rms': False}, 'max_cudagraph_capture_size': 512, 'dynamic_shapes_config': {'type': <DynamicShapesType.BACKED: 'backed'>, 'evaluate_guards': False}, 'local_cache_dir': None}
(EngineCore_DP0 pid=79) INFO 12-25 04:48:52 [parallel_state.py:1203] world_size=1 rank=0 local_rank=0 distributed_init_method=tcp://10.20.17.20:41881 backend=nccl
(EngineCore_DP0 pid=79) INFO 12-25 04:48:52 [parallel_state.py:1411] rank 0 in world size 1 is assigned as DP rank 0, PP rank 0, PCP rank 0, TP rank 0, EP rank 0
(EngineCore_DP0 pid=79) INFO 12-25 04:48:55 [gpu_model_runner.py:3562] Starting to load model /mnt/models/model-files...
(EngineCore_DP0 pid=79) INFO 12-25 04:48:56 [mm_encoder_attention.py:104] Using AttentionBackendEnum.FLASH_ATTN for MMEncoderAttention.
(EngineCore_DP0 pid=79) INFO 12-25 04:49:12 [cuda.py:351] Using FLASH_ATTN attention backend out of potential backends: ('FLASH_ATTN', 'FLASHINFER', 'TRITON_ATTN', 'FLEX_ATTENTION')
(EngineCore_DP0 pid=79) INFO 12-25 04:49:12 [layer.py:372] Enabled separate cuda stream for MoE shared_experts
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:   0% Completed | 0/13 [00:00<?, ?it/s]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:   8% Completed | 1/13 [00:07<01:30,  7.56s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  15% Completed | 2/13 [00:23<02:17, 12.51s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  23% Completed | 3/13 [00:35<02:03, 12.36s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  31% Completed | 4/13 [00:50<02:00, 13.42s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  38% Completed | 5/13 [01:03<01:46, 13.28s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  46% Completed | 6/13 [01:18<01:36, 13.80s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  54% Completed | 7/13 [01:30<01:19, 13.28s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  62% Completed | 8/13 [01:46<01:09, 13.97s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  69% Completed | 9/13 [02:02<00:58, 14.68s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  77% Completed | 10/13 [02:18<00:44, 14.94s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  85% Completed | 11/13 [02:33<00:30, 15.12s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards:  92% Completed | 12/13 [02:46<00:14, 14.43s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards: 100% Completed | 13/13 [03:02<00:00, 15.06s/it]
(EngineCore_DP0 pid=79) 
Loading safetensors checkpoint shards: 100% Completed | 13/13 [03:02<00:00, 14.07s/it]
(EngineCore_DP0 pid=79) 
(EngineCore_DP0 pid=79) INFO 12-25 04:52:15 [default_loader.py:308] Loading weights took 182.98 seconds
(EngineCore_DP0 pid=79) INFO 12-25 04:52:16 [gpu_model_runner.py:3659] Model loading took 58.2299 GiB memory and 199.672085 seconds
(EngineCore_DP0 pid=79) INFO 12-25 04:52:16 [gpu_model_runner.py:4446] Encoder cache will be initialized with a budget of 16384 tokens, and profiled with 1 image items of the maximum feature size.
(EngineCore_DP0 pid=79) INFO 12-25 04:52:39 [backends.py:643] Using cache directory: /root/.cache/vllm/torch_compile_cache/e99a04a2f0/rank_0_0/backbone for vLLM's torch.compile
(EngineCore_DP0 pid=79) INFO 12-25 04:52:39 [backends.py:703] Dynamo bytecode transform time: 7.73 s
(EngineCore_DP0 pid=79) INFO 12-25 04:52:54 [backends.py:261] Cache the graph of compile range (1, 8192) for later use
(EngineCore_DP0 pid=79) WARNING 12-25 04:52:56 [fused_moe.py:888] Using default MoE config. Performance might be sub-optimal! Config file not found at /usr/local/lib/python3.12/dist-packages/vllm/model_executor/layers/fused_moe/configs/E=128,N=768,device_name=NVIDIA_H100_NVL.json
(EngineCore_DP0 pid=79) INFO 12-25 04:53:53 [backends.py:278] Compiling a graph for compile range (1, 8192) takes 65.64 s
(EngineCore_DP0 pid=79) INFO 12-25 04:53:53 [monitor.py:34] torch.compile takes 73.37 s in total
(EngineCore_DP0 pid=79) INFO 12-25 04:53:54 [gpu_worker.py:375] Available KV cache memory: 19.40 GiB
(EngineCore_DP0 pid=79) INFO 12-25 04:53:55 [kv_cache_utils.py:1291] GPU KV cache size: 211,936 tokens
(EngineCore_DP0 pid=79) INFO 12-25 04:53:55 [kv_cache_utils.py:1296] Maximum concurrency for 8,192 tokens per request: 25.87x
(EngineCore_DP0 pid=79) 2025-12-25 04:53:55,211 - INFO - autotuner.py:256 - flashinfer.jit: [Autotuner]: Autotuning process starts ...
(EngineCore_DP0 pid=79) 2025-12-25 04:53:55,241 - INFO - autotuner.py:262 - flashinfer.jit: [Autotuner]: Autotuning process ends
(EngineCore_DP0 pid=79) 
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):   0%|          | 0/51 [00:00<?, ?it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):   4%|▍         | 2/51 [00:00<00:03, 13.27it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):   8%|▊         | 4/51 [00:00<00:03, 13.63it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  12%|█▏        | 6/51 [00:00<00:03, 13.65it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  16%|█▌        | 8/51 [00:00<00:03, 13.85it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  20%|█▉        | 10/51 [00:00<00:02, 13.81it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  24%|██▎       | 12/51 [00:00<00:02, 13.84it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  27%|██▋       | 14/51 [00:01<00:02, 13.78it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  31%|███▏      | 16/51 [00:01<00:02, 13.68it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  35%|███▌      | 18/51 [00:01<00:02, 13.70it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  39%|███▉      | 20/51 [00:01<00:02, 13.67it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  43%|████▎     | 22/51 [00:01<00:02, 13.65it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  47%|████▋     | 24/51 [00:01<00:01, 13.67it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  51%|█████     | 26/51 [00:01<00:01, 13.65it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  55%|█████▍    | 28/51 [00:02<00:01, 13.58it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  59%|█████▉    | 30/51 [00:02<00:01, 13.45it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  63%|██████▎   | 32/51 [00:02<00:01, 13.40it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  67%|██████▋   | 34/51 [00:02<00:02,  8.36it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  71%|███████   | 36/51 [00:02<00:01,  9.36it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  75%|███████▍  | 38/51 [00:03<00:01, 10.26it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  78%|███████▊  | 40/51 [00:03<00:00, 11.01it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  82%|████████▏ | 42/51 [00:03<00:00, 11.26it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  86%|████████▋ | 44/51 [00:03<00:00, 11.72it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  90%|█████████ | 46/51 [00:03<00:00, 12.07it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  94%|█████████▍| 48/51 [00:03<00:00, 12.25it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE):  98%|█████████▊| 50/51 [00:04<00:00, 12.53it/s]
Capturing CUDA graphs (mixed prefill-decode, PIECEWISE): 100%|██████████| 51/51 [00:04<00:00, 11.55it/s]
(EngineCore_DP0 pid=79) 
Capturing CUDA graphs (decode, FULL):   0%|          | 0/51 [00:00<?, ?it/s]
Capturing CUDA graphs (decode, FULL):   4%|▍         | 2/51 [00:00<00:03, 14.77it/s]
Capturing CUDA graphs (decode, FULL):   8%|▊         | 4/51 [00:00<00:03, 15.34it/s]
Capturing CUDA graphs (decode, FULL):  12%|█▏        | 6/51 [00:00<00:02, 15.53it/s]
Capturing CUDA graphs (decode, FULL):  16%|█▌        | 8/51 [00:00<00:02, 15.73it/s]
Capturing CUDA graphs (decode, FULL):  20%|█▉        | 10/51 [00:00<00:02, 15.78it/s]
Capturing CUDA graphs (decode, FULL):  24%|██▎       | 12/51 [00:00<00:02, 15.83it/s]
Capturing CUDA graphs (decode, FULL):  27%|██▋       | 14/51 [00:00<00:02, 15.85it/s]
Capturing CUDA graphs (decode, FULL):  31%|███▏      | 16/51 [00:01<00:02, 15.90it/s]
Capturing CUDA graphs (decode, FULL):  35%|███▌      | 18/51 [00:01<00:02, 15.83it/s]
Capturing CUDA graphs (decode, FULL):  39%|███▉      | 20/51 [00:01<00:01, 15.83it/s]
Capturing CUDA graphs (decode, FULL):  43%|████▎     | 22/51 [00:01<00:01, 15.76it/s]
Capturing CUDA graphs (decode, FULL):  47%|████▋     | 24/51 [00:01<00:01, 15.72it/s]
Capturing CUDA graphs (decode, FULL):  51%|█████     | 26/51 [00:01<00:01, 15.59it/s]
Capturing CUDA graphs (decode, FULL):  55%|█████▍    | 28/51 [00:01<00:01, 15.60it/s]
Capturing CUDA graphs (decode, FULL):  59%|█████▉    | 30/51 [00:01<00:01, 15.59it/s]
Capturing CUDA graphs (decode, FULL):  63%|██████▎   | 32/51 [00:02<00:01, 15.64it/s]
Capturing CUDA graphs (decode, FULL):  67%|██████▋   | 34/51 [00:02<00:01, 15.67it/s]
Capturing CUDA graphs (decode, FULL):  71%|███████   | 36/51 [00:02<00:00, 15.65it/s]
Capturing CUDA graphs (decode, FULL):  75%|███████▍  | 38/51 [00:02<00:00, 15.69it/s]
Capturing CUDA graphs (decode, FULL):  78%|███████▊  | 40/51 [00:02<00:00, 15.75it/s]
Capturing CUDA graphs (decode, FULL):  82%|████████▏ | 42/51 [00:02<00:00, 15.72it/s]
Capturing CUDA graphs (decode, FULL):  86%|████████▋ | 44/51 [00:02<00:00, 15.73it/s]
Capturing CUDA graphs (decode, FULL):  90%|█████████ | 46/51 [00:02<00:00, 15.73it/s]
Capturing CUDA graphs (decode, FULL):  94%|█████████▍| 48/51 [00:03<00:00, 15.75it/s]
Capturing CUDA graphs (decode, FULL):  98%|█████████▊| 50/51 [00:03<00:00, 15.80it/s]
Capturing CUDA graphs (decode, FULL): 100%|██████████| 51/51 [00:03<00:00, 15.72it/s]
(EngineCore_DP0 pid=79) INFO 12-25 04:54:03 [gpu_model_runner.py:4587] Graph capturing finished in 9 secs, took 0.66 GiB
(EngineCore_DP0 pid=79) INFO 12-25 04:54:03 [core.py:259] init engine (profile, create kv cache, warmup model) took 107.64 seconds
(APIServer pid=1) INFO 12-25 04:54:04 [api_server.py:1099] Supported tasks: ['generate']
(APIServer pid=1) WARNING 12-25 04:54:04 [model.py:1487] Default sampling parameters have been overridden by the model's Hugging Face generation config recommended from the model creator. If this is not intended, please relaunch vLLM instance with `--generation-config vllm`.
(APIServer pid=1) INFO 12-25 04:54:04 [serving_responses.py:201] Using default chat sampling params from model: {'temperature': 0.8, 'top_k': 20, 'top_p': 0.95}
(APIServer pid=1) INFO 12-25 04:54:04 [serving_chat.py:137] Using default chat sampling params from model: {'temperature': 0.8, 'top_k': 20, 'top_p': 0.95}
(APIServer pid=1) INFO 12-25 04:54:04 [serving_completion.py:77] Using default completion sampling params from model: {'temperature': 0.8, 'top_k': 20, 'top_p': 0.95}
(APIServer pid=1) INFO 12-25 04:54:04 [serving_chat.py:137] Using default chat sampling params from model: {'temperature': 0.8, 'top_k': 20, 'top_p': 0.95}
(APIServer pid=1) INFO 12-25 04:54:04 [api_server.py:1425] Starting vLLM API server 0 on http://0.0.0.0:8080
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:38] Available routes are:
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /openapi.json, Methods: GET, HEAD
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /docs, Methods: GET, HEAD
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /docs/oauth2-redirect, Methods: GET, HEAD
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /redoc, Methods: GET, HEAD
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /scale_elastic_ep, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /is_scaling_elastic_ep, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /tokenize, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /detokenize, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /inference/v1/generate, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /pause, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /resume, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /is_paused, Methods: GET
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /metrics, Methods: GET
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /health, Methods: GET
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /load, Methods: GET
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/models, Methods: GET
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /version, Methods: GET
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/responses, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/responses/{response_id}, Methods: GET
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/responses/{response_id}/cancel, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/messages, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/chat/completions, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/completions, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/audio/transcriptions, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/audio/translations, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /ping, Methods: GET
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /ping, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /invocations, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /classify, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/embeddings, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /score, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/score, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /rerank, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v1/rerank, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /v2/rerank, Methods: POST
(APIServer pid=1) INFO 12-25 04:54:04 [launcher.py:46] Route: /pooling, Methods: POST
(APIServer pid=1) INFO:     Started server process [1]
(APIServer pid=1) INFO:     Waiting for application startup.
(APIServer pid=1) INFO:     Application startup complete.


```