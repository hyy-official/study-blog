---
title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces"
subtitle: Mamba 논문 리뷰
date: 2023-12-07
topics: ["NLP"]
featured_image: /study-blog/images/mamba.png
author: 홍윤영
---
현재 딥 러닝 분야의 흥미로운 애플리케이션 대부분을 지원하는 기초 모델은 거의 보편적으로 Transformer 아키텍처와 핵심 주의 모듈을 기반으로 합니다.

linear attention, gated convolution and recurrent models, structured state space models(SSMs)과 같은 많은 하위 시간 아키텍처는 긴 시퀀스에 대한 Transformer의 계산 비효율성을 해결하기 위해 개발되었지만 다음과 같은 중요한 양식에 대한 관심만큼 성능을 발휘하지 못했습니다. 언어로. 우리는 이러한 모델의 주요 약점이 내용 기반 추론을 수행하고 몇 가지 개선을 수행할 수 없다는 점을 확인했습니다. 

첫째, SSM 매개변수를 입력의 함수로 두면 이산 양식의 약점을 해결하여 모델이 현재 토큰에 따라 시퀀스 길이 차원을 따라 정보를 선택적으로 전파하거나 잊을 수 있습니다.

둘째, 이러한 변경으로 인해 효율적인 컨볼루션을 사용할 수 없더라도 우리는 반복 모드에서 하드웨어 인식 병렬 알고리즘을 설계합니다. 

우리는 이러한 선택적 SSM을 주의나 MLP 블록(Mamba) 없이 단순화된 엔드투엔드 신경망 아키텍처에 통합합니다. 

Mamba는 빠른 추론(Transformer보다 5배 더 높은 처리량)과 시퀀스 길이의 선형 확장을 지원하며 실제 데이터에서 최대 백만 길이의 시퀀스까지 성능이 향상됩니다. 

일반 시퀀스 모델 백본인 Mamba는 언어, 오디오, 유전체학과 같은 여러 양식에 걸쳐 최첨단 성능을 달성합니다. 

언어 모델링에서 Mamba-3B 모델은 동일한 크기의 Transformer보다 성능이 뛰어나며 사전 학습 및 다운스트림 평가 모두에서 두 배 크기의 Transformer와 일치합니다.

