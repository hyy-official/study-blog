---
title: RAG에 대하여 (2) 사후 검색 강화와 데이터베이스
subtitle: survey 논문 기반 RAG 리서치
date: 2024-05-11
topics: ["NLP"]
featured_image: RAG_SURVEY_PART2.png
author: 홍윤영
---

#### PRCA - Post

[PRCA](https://aclanthology.org/2023.emnlp-main.326/)는 특정 데이터셋에 대해 Generator 대신 경량화된 어댑터(보상 모델)을 추가하여 보상 기반으로 검색된 문서를 증류합니다. 이 방식은 한번 더 정리 해보곘습니다.

#### Retrieve-Rerank-Generate- Post
[R2G](https://arxiv.org/abs/2207.06300)은 검색된 문서를 AI 모델이나 다른 방식으로 다시 랭크를 매겨 LLM(gerenertor)에 들어가기 전에 검색 결과의 강건성을 향상 시킬 수 있는 방법입니다.
