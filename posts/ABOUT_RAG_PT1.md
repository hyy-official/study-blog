---
title: RAG에 대하여 (1) 검색과 사전 검색 강화
subtitle: survey 논문 기반 RAG 리서치
date: 2024-05-10
topics: ["NLP"]
featured_image: RAG_SURVEY.png
author: 홍윤영
---


#LLM, #RAG, #Survey
# 기존 `LLM`의 문제점

`Large Language Model(LLM)`은 `프롬프트 엔지니어링`과 `SFT(Supervised Fine-Tuning)`를 통해 통계 분석, 선호도 추천 등의 다양한 분야에서 큰 잠재력을 보여주었습니다. 그러나 여전히 **할루시네이션 문제**와 **도메인별 지식 문제**가 존재합니다. 특히, 의료, 법률, 제조 공정 등과 같이 인터넷 상에 데이터가 부족하거나 깊이가 필요한 도메인에서는 이러한 문제가 더욱 두드러집니다. 

최근 연구 결과에 따르면, 도메인마다 최신 데이터를 사용해 `LLM`을 `SFT`할 경우, **큰 계산 비용**으로 인해 모델을 학습하고 서빙하는 데 어려움이 있을 것으로 예상됩니다. 이는 `LLM`의 활용도를 제한하는 주요 요인 중 하나로 작용하고 있습니다.

# `RAG(Relevance-Augmented Generation)`

본래 검색은 입력된 쿼리를 이해하고 외부 데이터 소스에서 관련 정보를 추출하는 가장 기본적인 데이터 마이닝 기술 중 하나입니다. `Bing`, `Google`, `Baidu`, `Naver` 등의 검색 엔진은 오래전부터 관련성 기반으로 콘텐츠를 사용자에게 제공해왔습니다. 

최근 검색 시장은 **`LLM` 모델**을 도입하기 시작했습니다. 관련성 높은 콘텐츠를 `LLM` 모델에 추가적으로 삽입하는 **`RAG(Relevance-Augmented Generation)`** 기술을 통해, 자연어 모델들이 잘하는 요약, Q&A 영역으로 이동시켜 사용자에게 맞춤 정보를 제공할 수 있도록 설계되었습니다. 초기에는 `MS`사의 `코파일럿`과 `빙챗`이 레퍼런스를 제공하며 신뢰성 있는 정보를 제공했다면, 최근에는 막강한 `Google Overview`와 `Perplexity.ai`가 각광받고 있습니다.

`Perplexity.ai`는 다른 AI 기반 검색 모델과는 달리 **크롤링 차단 시스템을 우회**하는 경우가 있습니다. 이로 인해 `뉴욕 타임즈`와 `포브스` 같은 퍼블리셔들이 **광고 수익에 손해를 보고 있어 논란**이 되고 있습니다.

![Perplexity 뉴스](/images/ABOUT_RAG_PT1/perplexity_news.png)

## `RAG` 근황
2020년에 `NeurlPS`에 발표된 `RAG(Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks)` 논문에서 **할루시네이션 및 도메인 문제를 해결할 가능성**이 보이면서 연구가 활발히 진행되었습니다. 이를 통해 프레임워크 및 파이프라인을 구축하는 `RAG Framework/Pipeline`부터, `RAG Learning`, `Retriever Learning`, `Pre-/Post-Retrieval Technique`까지 `RAG`의 성능을 높이기 위한 다양한 방법들이 지속적으로 연구되고 있습니다.

![RAG 종류-연도별 정리](/images/ABOUT_RAG_PT1/rag_preview.png)

이처럼, `LLM` 시대에서의 `RAG` 프레임워크는 검색, 생성 및 증강, 검색 여부 결정 등의 여러 프로세스로 구성됩니다. 하나하나 살펴보고자 합니다.

## 검색(`Retrieval`)
`LLM` 프레임워크 안에서의 검색은 공개/비공개된 외부 지식 소스에서 관련 정보를 제공하는 것이 목표입니다. 가장 중요한 검색기(`Retriever`)는 아래 그림에서 볼 수 있듯이 여러 절차로 구성되어 있습니다. 이번 섹션에서는 아래와 같은 검색과 관련된 구성 요소들을 정리해보려 합니다.

![Retriever의 구성요소](/images/ABOUT_RAG_PT1/retrieval_elements.png)

### 검색기 유형(`Retriever Type`)
검색기 유형은 정보 인코딩 방법에 따라 크게 `Sparse` 검색과 `Dense` 검색으로 분류할 수 있습니다.

#### 희소(`Sparse`) 검색
**`희소(Sparse)` 검색은 단어 기반으로 텍스트 검색에 주로 적용됩니다.** 예를 들면, `TF-IDF` 및 `BM25`와 같은 일반적인 지표를 기반으로 랭킹 및 필터링 등의 방식으로 검색을 수행합니다. 이 방식은 `LLM` 모델이 컨텐츠를 생성할 때, 쿼리에 대한 정보를 보강하는 형식으로도 제공할 수 있지만, 더 나아가서 `In-Context Learning`[참고: 3, 4, 5, 6]에도 사용할 수 있습니다. **희소 검색은 학습이 필요 없는 장점이 있지만, 데이터베이스와 쿼리의 품질에 크게 의존한다는 문제점이 존재합니다.**

#### 밀집(`Dense`) 검색
**`밀집(Dense)` 검색은 입력 쿼리와 외부 지식을 벡터 공간에 임베딩하여 후처리를 통해 원하는 컨텐츠를 검색합니다.** 간단하게 `BERT`와 같은 사전 훈련된 언어 모델을 기반으로 임베딩을 계산하고, `코사인 유사도`를 기반으로 관련성을 측정합니다. 기존에 가장 간단한 방법은 이렇듯 임베딩 모델 1개만을 사용하여 검색을 수행했지만, 현재는 `DPR(Dense Passage Retriever)` 논문에서 영감을 받아 쿼리 인코더와 문서 인코더를 사용하는 듀얼 인코더 구조를 많이 사용하는 것으로 보입니다.  
"매번 임베딩 모델을 통해 연산을 해야 하니까 추론 속도에 영향을 받고 시간이 많이 쓰이지 않냐?"는 질문을 받을 수 있는데, `K-NN` 알고리즘을 통하면 효율적인 검색도 가능합니다.
### 검색 단위(`Retrieval Granularity`)

`검색 단위(Retrieval Granularity)`는 코퍼스를 색인화하는 단위로 `document`, `passage`, `token` 등을 나타냅니다. **`RAG`에서의 검색 단위는 데이터베이스의 저장 공간과 검색의 계산 비용을 결정하는 중요한 요소입니다.**

#### `document` 검색
초기의 `RAG`[참고 7, `REALM`, `RAG`, `Atlas`]는 전체 문서의 청크에 대해서 주어진 쿼리에 관련된 문서나 텍스트 일부들을 찾고 `기계 이해 모델(machine comprehension model)`을 사용하여 답변 범위를 특정합니다.

#### `토큰` 검색
`토큰` 검색은 더 세밀하게 검색할 수 있으며 토큰의 수가 문서보다 작기 때문에 좀 더 빠르게 검색할 수 있는 장점이 존재합니다. 하지만, 데이터베이스에서의 저장 용량을 많이 필요로 합니다. 주로 `토큰` 검색은 희귀 패턴이나 도메인 외 데이터를 요구하는 경우에 더 적합하며, `kNN-LM`에서 적용했던 반복 토큰 검색 전략을 주로 사용합니다.

별개로, `kaggle`의 `LLM Example`에서 1등한 팀 `LLM Studio`의 [솔루션](https://www.kaggle.com/competitions/kaggle-llm-science-exam/discussion/446422)을 보았을 때, **컨텍스트의 길이는 추론에 영향을 미치는 것을 볼 수 있었고 이를 통해서 개별의 3개의 청크 컨텍스트로 모델을 훈련하고 추론 시, 5개 청크로 추론을 실행하니 점수가 더 높아졌다는 실험 결과를 볼 수 있었습니다.**

### 사전/후 검색(`Pre/Post-retrieval Enhancement`)
검색 품질(정확성, 관련성)을 보장하기 위해 다양한 검색 전략이 제안되었습니다.

`Pre-retrieval Enhancement`는 주로 검색기에 쿼리를 입력하기 전에 외부 지식의 검색 조건에 맞게 쿼리를 변형시켜 검색 품질을 향상시킵니다.

`Post-retrieval Enhancement`는 검색기에서 추출한 상위 k개의 문서를 생성기로 전달하기 전에 처리하여 검색 결과를 정렬 시켜 품질을 향상시킬 수 있습니다.

#### `LLM` 기반 쿼리 확장 - `Pre`
Few-shot 프롬프트를 기반으로 생성된 가상 문서를 통해 쿼리 확장 -> 관련 정보 추가 -> 쿼리의 모호성 삭제 -> 검색 진행하는 [`Query2Doc`](https://arxiv.org/abs/2303.07678)는 사전 검색 강화의 가장 대표적인 예입니다. 유사한 방법으로는 주어진 쿼리에 대해 `LLM`이 가짜 문서를 생성하고 이러한 가짜 문서를 새로운 쿼리로 사용하는 [`HyDE`](https://arxiv.org/abs/2212.10496)가 있습니다.
![alt text](/images/ABOUT_RAG_PT1/q2d_hyde.png)



#### 쿼리 재작성 - `Pre`
`쿼리 재작성(query rewrite)`은 입력과 검색에 필요한 지식 간의 차이를 해소하고자 입력을 필요 지식에 유사하게 재구성하는 것을 목표합니다. 프롬프트 엔지니어링과 `LLM`을 통해 검색에 필요한 조건을 만족하도록 쿼리를 재작성하는 [`Rewrite-Retrieve-Read`](https://arxiv.org/abs/2305.14283) 방법은 Naive-RAG보다 EM(ACC)에서 좀 더 우수한 성능을 보입니다. 그 밖에도, [`Retrieval Necessity Judgment`](https://arxiv.org/pdf/2402.120520) 방식을 통해 작은 모델로도 효과적으로 쿼리를 재작성하는 방법 또한 존재합니다.

![alt text](/images/ABOUT_RAG_PT1/Rewrite-Retrieve-Read.png)

#### 쿼리 증강(`Query Augmentation`) - `Pre`
초기 생성된 출력과 원래의 쿼리를 결합하여 새로운 쿼리로 사용하여 외부 데이터베이스에서 관련 정보를 검색하는 [`쿼리 증강 기술`](https://arxiv.org/abs/2305.14002) 또한 존재합니다. 해당 논문에서는 새 쿼리에 초기 출력을 포함하면, 쿼리와 검색된 문서 간의 어휘적으로나 의미적으로나 겹치기 때문에 검색이 더욱 강화된다고 합니다. 하지만, 이 부분은 핵심만 보고 넘어갔기 때문에 잘 모르는 분야입니다. 한번 날잡아서 정리 하겠습니다.

![alt text](/images/ABOUT_RAG_PT1/REFEED.png)

# 결론

현재 `LLM`의 한계점을 보완하고, 더 나아가 다양한 도메인에서 효과적인 정보를 제공하기 위해 `RAG(Relevance-Augmented Generation)` 기술이 활발히 연구되고 있습니다. `RAG`는 검색(`Retrieval`), 생성(`Generation`), 증강(`Augmentation`) 등의 다양한 기술을 결합하여, 특히 의료, 법률, 제조 공정 등과 같은 전문 분야에서도 신뢰성 있는 정보를 제공하려고 많은 연구진들이 노력 중입니다.

이번 포스팅에서는 `RAG`의 필요성과 검색 분야 중에서 사전 검색 강화까지를 정리하였습니다. 다음 포스팅에서는 사후 처리 강화, 데이터베이스, 그리고 생성 섹션으로 넘어가서 `LLM`을 어떻게 사용하는지에 대해 중점적으로 정리할 예정입니다. 전반적인 `RAG`에 대해 정리한 후에는 지금까지 참고 자료로 주어졌던 논문들을 하나씩 자세하게 분석하고, 구현까지 코드 스니펫으로 제공함으로써 유익한 정보를 제공할 예정입니다.


#### 참고문헌
[1] Ding, Yujuan, et al. "A survey on rag meets llms: Towards retrieval-augmented large language models." arXiv preprint arXiv:2405.06211 (2024).  
[2] Lewis, Patrick, et al. "Retrieval-augmented generation for knowledge-intensive nlp tasks." Advances in Neural Information Processing Systems 33 (2020): 9459-9474.  
[3] Sweta Agrawal, Chunting Zhou, Mike Lewis, Luke Zettlemoyer, and Marjan Ghazvininejad. 2023. In-context Examples Selection for Machine Translation. In ACL (Findings). Association for Computational Linguistics, 8857–8873.  
[4] Man Luo, Xin Xu, Zhuyun Dai, Panupong Pasupat, Mehran Kazemi, Chitta Baral, Vaiva Imbrasaite, and Vincent Y Zhao. 2023. Dr. icl: Demonstration-retrieved in-context learning. arXiv preprint arXiv:2305.14128 (2023).  
[5] Ohad Rubin, Jonathan Herzig, and Jonathan Berant. 2022. Learning To Retrieve Prompts for In-Context Learning. In NAACL-HLT. Association for Computational Linguistics, 2655–2671.  
[6]  Jiacheng Ye, Zhiyong Wu, Jiangtao Feng, Tao Yu, and Lingpeng Kong. 2023. Compositional exemplars for in-context learning. In International Conference on Machine Learning. PMLR, 39818–39833.   
[7] Danqi Chen, Adam Fisch, Jason Weston, and Antoine Bordes. 2017. Reading Wikipedia to Answer Open-Domain Questions. In ACL (1). Association for Computational Linguistics, 1870–1879.




 