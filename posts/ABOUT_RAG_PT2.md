---
title: RAG에 대하여 (2) 사후 검색 강화와 데이터베이스
subtitle: survey 논문 기반 RAG 리서치
date: 2024-05-11
topics: ["NLP", "RAG", "Survey"]
featured_image: RAG_SURVEY_PART2.png
author: 홍윤영
---

# 들어가며 

이전 포스팅에서는 RAG의 필요성부터 검색의 구성요소 중 `Pre-retrieval Enhancement` 테크닉까지 알아보았다. 이번 포스팅에서는 `Post-retrieval Enhancement`를 살펴보려한다.

# 사후 검색 강화(`Post-retrieval Enhancement`)
사후 검색 강화는 검색기에서 추출한 상위 k개의 문서를 LLM 모델에 삽입하기 전에 다시 정렬시켜서 검색의 품질을 높이는 프로세스를 뜻합니다. 

## PRCA
[PRCA](https://aclanthology.org/2023.emnlp-main.326/)는 특정 데이터셋에 대해 Generator 대신 경량화된 어댑터(보상 모델)을 추가하여 보상 기반으로 검색된 문서를 증류합니다. 이 방식은 한번 더 정리 해보곘습니다.

## Retrieve-Rerank-Generate
[R2G](https://arxiv.org/abs/2207.06300)은 검색된 문서를 AI 모델이나 다른 방식으로 다시 랭크를 매겨 LLM(gerenertor)에 들어가기 전에 검색 결과의 강건성을 향상 시킬 수 있는 방법입니다.
![R2G](/ABOUT_RAG_PT2/R2G.png)

## 증강 프롬프팅 기법
LLM을 기반으로 정보 검색 모듈을 통해 반복적으로 외부 데이터를 검색하여 LLM의 생성 능력을 향상시키는 파이프라인(증강 프롬프팅 기법)[[Iter-RetGen](https://arxiv.org/abs/2305.15294), [Search-in-the-Chain](https://arxiv.org/abs/2304.14732), [React](https://arxiv.org/abs/2210.03629)]들이 나왔습니다.

### 증강 프롬프팅 기법의 문제점
하지만, 이러한 방법은 반복적으로 LLM에 삽입하여 검색 및 생성 능력을 향상 시키는 방법들로, LLM 모델의 성능이 좋지 않다면 오히려 성능이 떨어지는 문제가 발생합니다. 이러한 문제를 해결하기 위해 제안된 방법인 [FuRePA](https://arxiv.org/abs/2309.12767)는 Masking Previous Queries and Paths와 Plan Assessor를 제안하였습니다. 전체적으로 질문과 초기 정보를 LLM에 입력 -> Plan Path와 검색 쿼리를 생성하고 검색 쿼리를 바탕으로 정보를 다시 업데이트 합니다. 반복해서 생성된 검색 쿼리와 정보들을 바탕으로 Plan Assessor가 최적의 쿼리를 선택하고 최종 답변을 도출하는 형태로 반복된 생성이더라도 이전 정보들을 유지하기 때문에 해당 문제를 해결할 수 있습니다.  
![FuRePA](/ABOUT_RAG_PT2/FuRePA.png)  

## 모델 토큰 제한 우회 방안
기존 LLM의 주요 제한 사항 중 하나는 입력 토큰의 길이로, 긴 문서를 직접적으로 RA-LLMs에 넣지 못하게 합니다. 이러한 문제를 해결하기 위해, [RECOMP](https://arxiv.org/abs/2310.04408)는 검색된 문서를 요약하여 LLM에 삽입하는 방법을 제안하였습니다. 해당 방법은 기존 LLM의 요약은 사람에게 주요 정보를 추출하여 전달하는 능력이 높기 때문에, 정보 압축과는 거리가 멀어 Dual Encoder 구조를 사용한 새로운 모델(Abstractive Retriever)을 사용합니다. 다만 데이터셋이 존재하지 않아 LLM 기반으로 데이터셋을 생성하고 distillation 하는 형식으로 모델을 학습한다. 

![RECOMP](/ABOUT_RAG_PT2/RECOMP.png)  

다른 방법으로 `FiD`가 있는데 이건 한번 더 정리하겠다.


# 데이터 베이스
RAG에서의 검색은 외부 지식을 기반으로 수행되며, 이는 private와 public으로 구분될 수 있습니다. 일반적으로 private DB에서는 데이터를 키-값 쌍으로 저장합니다. 키는 희소 벡터(BM25) 또는 밀집 임베딩 기반의 유사도 검색을 기반으로 검색에 사용됩니다. 값(Value)은 일반적으로 키와 매칭이 되는 raw text입니다.
> 예시: 위키백과 문서를 100단어씩으로 분할할 경우, 초기 RAG에서 총 2100만 문서가 됩니다. 각 문서를 밀집 임베딩으로 인코딩하여 데이터베이스에 저장하여 RAG 시스템에 쓸 수 있습니다.
 또한 Public DB는 Google, Bing과 같은 인터넷 검색 엔진을 적용하면, index 관리할 필요가 없으며 최신 데이터에 접근할 수 있는 장점이 있습니다.
