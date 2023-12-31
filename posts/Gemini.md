---
title: "Gemini 테크니컬 리포트 리뷰"
subtitle: Gemini 리뷰
date: 2023-12-08
topics: ["NLP"]
featured_image: /study-blog/images/mamba.png
author: 홍윤영
---
​Google에서 개발한 고성능 다중 모드 모델 제품군인 Gemini를 소개합니다. 

우리는 각 영역에 대한 최첨단 이해 및 추론 성능과 함께 양식 전반에 걸쳐 강력한 일반 기능을 모두 갖춘 모델을 구축할 목적으로 이미지, 오디오, 비디오 및 텍스트 데이터 전반에 걸쳐 Gemini를 공동으로 교육했습니다. 

첫 번째 버전인 Gemini 1.0은 매우 복잡한 작업을 위한 Ultra, 대규모 성능 및 배포 가능성을 위한 Pro, 온디바이스 애플리케이션을 위한 Nano 등 세 가지 크기로 제공됩니다. 각 크기는 다양한 계산 제한 및 애플리케이션 요구 사항을 해결하도록 특별히 맞춤화되었습니다. 우리는 광범위한 언어, 코딩, 추론 및 다중 모드 작업을 다루는 포괄적인 내부 및 외부 벤치마크 제품군을 통해 Gemini 모델의 성능을 평가합니다. Gemini는 대규모 언어 모델링 분야에서 최첨단 기술을 발전시켰습니다(Anil et al., 2023; Brown et al., 2020; Chowdhery et al., 2023; Hoffmann et al., 2022; OpenAI, 2023a; Radford et al. al., 2019; Rae et al., 2021), 이미지 이해(Alayrac et al., 2022; Chen et al., 2022; Dosovitskiy et al., 2020; OpenAI, 2023b; Reed et al., 2022; Yu et al. al., 2022a), 오디오 처리(Radford et al., 2023; Zhang et al., 2023), 비디오 이해(Alayrac et al., 2022; Chen et al., 2023). 또한 시퀀스 모델(Sutskever et al., 2014), 신경망 기반 딥 러닝(LeCun et al., 2015) 및 기계 학습 분산 시스템(Barham et al., 2022; Bradbury et al., 2018; Dean et al., 2012) 대규모 훈련을 가능하게 합니다. 가장 유능한 모델인 Gemini Ultra는 인기 있는 텍스트 및 추론 벤치마크 12개 중 10개, 이미지 이해 벤치마크 9개 중 9개, 비디오 이해 벤치마크 6개 중 6개를 포함하여 우리가 보고하는 32개 벤치마크 중 30개에서 새로운 최첨단 결과를 달성합니다. , 음성 인식 및 음성 번역 벤치마크 5개 중 5개. Gemini Ultra는 일련의 시험을 통한 탁월한 벤치마크 테스트 지식 및 추론인 MMLU(Hendrycks et al., 2021a)에서 인간 전문가의 성능을 90% 이상의 점수로 달성한 최초의 모델입니다. 텍스트 외에도 Gemini Ultra는 까다로운 다중 모드 추론 작업에서 눈에 띄는 발전을 이루었습니다. 예를 들어, 대학 수준의 주제 지식과 의도적인 추론이 필요한 다분야 작업의 이미지에 대한 질문으로 구성된 최근 MMMU 벤치마크(Yue et al., 2023)에서 Gemini Ultra는 새로운 최고 점수를 획득했습니다. 62.4%로 이전 최고 모델보다 5%포인트 이상 높은 성능을 보였습니다. 이는 비디오 질문 응답 및 오디오 이해 벤치마크에 대해 균일한 성능 향상을 제공합니다.

정성적 평가는 인상적인 교차 모달 추론 기능을 보여줌으로써 모델이 오디오, 이미지 및 텍스트의 입력 시퀀스를 기본적으로 이해하고 추론할 수 있도록 해줍니다(그림 5 및 표 13 참조). 그림 1에 묘사된 교육 환경을 예로 들어보겠습니다. 교사는 스키어가 슬로프를 내려가는 물리학 문제를 그렸고, 학생은 이에 대한 해결책을 모색했습니다. Gemini의 다중 모달 추론 기능을 사용하여 모델은 지저분한 필기를 이해하고, 문제 공식을 올바르게 이해하고, 문제와 솔루션을 모두 수학적 조판으로 변환하고, 학생이 문제 해결에서 잘못한 추론의 특정 단계를 식별할 수 있습니다. 문제에 대한 올바른 해결 방법을 제공합니다. 이는 흥미로운 교육 가능성을 열어주며, Gemini 모델의 새로운 다중 모드 및 추론 기능이 여러 분야에 걸쳐 극적으로 응용될 수 있다고 믿습니다. 대규모 언어 모델의 추론 기능은 보다 복잡한 다단계 문제를 해결할 수 있는 일반 에이전트 구축에 대한 가능성을 보여줍니다. AlphaCode 팀은 Gemini의 추론 기능과 검색 및 도구 사용을 결합하여 경쟁력 있는 프로그래밍 문제를 해결하는 데 탁월한 성능을 발휘하는 

새로운 Gemini 기반 에이전트인 AlphaCode 2(Leblond et al, 2023)를 구축했습니다. 

AlphaCode 2는 Codeforces 경쟁 프로그래밍 플랫폼의 상위 15% 참가자에 속하며, 이는 상위 50%에 속하는 최첨단 이전 버전에 비해 크게 향상되었습니다(Li et al., 2022).

이와 함께 우리는 온디바이스 배포를 목표로 하는 일련의 소형 모델인 Gemini Nano를 통해 효율성의 한계를 뛰어넘었습니다. 

이러한 모델은 요약, 독해, 텍스트 완성 작업과 같은 기기 내 작업에 탁월하며 크기에 비해 추론, STEM, 코딩, 다중 모드 및 다국어 작업에서 인상적인 기능을 보여줍니다. 다음 섹션에서는 먼저 모델 아키텍처, 교육 인프라 및 교육 데이터 세트에 대한 개요를 제공합니다. 그런 다음 영어 성능과 다국어 기능을 모두 포함하는 텍스트, 코드, 이미지, 오디오 및 비디오 전반에 걸쳐 잘 연구된 벤치마크와 인간 선호도 평가를 다루는 Gemini 모델 제품군에 대한 자세한 평가를 제시합니다. 또한 배포 결정 전 영향 평가, 모델 정책 개발, 평가 및 피해 완화 프로세스를 포함하여 책임 있는 배포2에 대한 접근 방식에 대해서도 논의합니다. 마지막으로, 우리는 AI 연구 및 혁신의 새로운 시대를 여는 Gemini의 더 넓은 의미, 잠재적 응용 프로그램과 함께 제한 사항에 대해 논의합니다.

Gemini 모델은 아키텍처 및 모델 최적화의 개선으로 향상된 Transformer 디코더(Vaswani et al., 2017)를 기반으로 구축되어 Google의 Tensor 처리 장치에 대한 대규모의 안정적인 학습과 최적화된 추론을 가능하게 합니다. 효율적인 주의 메커니즘(예: 다중 쿼리 주의(Shazeer, 2019))을 사용하여 32k 컨텍스트 길이를 지원하도록 훈련되었습니다. 첫 번째 버전인 Gemini 1.0은 표 1에 설명된 대로 광범위한 애플리케이션을 지원하는 세 가지 주요 크기로 구성됩니다.