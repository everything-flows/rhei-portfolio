# 🌊 rhei.me: 개인 포트폴리오 사이트

> 이력서, 기술 블로그, 실험실을 하나의 도메인에 통합한 개발자 포트폴리오입니다.  
> 다양한 기술 스택을 활용할 수 있도록 각각의 앱을 분리하여 개발 및 배포 후, 하나의 도메인 아래에서 제공하고 있습니다.

## 📌 소개

[rhei.me](https://rhei.me/resume)는 Remix, Next.js 등 다양한 기술을 활용하여 구성된  
**모노레포 기반의 통합 포트폴리오**입니다.

전체 페이지는 반응형 디자인이 적용되었고, 쿠키 기반 다크 모드를 지원합니다.

## 📎 링크

- 🏠 [메인 페이지](https://rhei.me)
- 📝 [이력서](https://rhei.me/resume)
- 📖 [블로그](https://rhei.me/blog)
- 🧪 [실험실](https://rhei.me/craft)

## 📁 프로젝트 구조

```
.
├── apps
│   ├── home # 메인 페이지
│   ├── blog # 블로그
│   ├── resume # 이력서
│   ├── craft # 실험실
└── packages
    ├── ui # 공통 UI 컴포넌트, 디자인 토큰, 모션 상수
    └── meta # SEO 및 공통 메타 정보
```

## 🔧 기술 스택

- **패키지 및 모노레포 관리**: `pnpm` 기반 모노레포 구성
- **라이브러리 및 프레임워크**:
  - [apps/home](./apps/home): `Remix`
  - [apps/blog](./apps/blog): `Remix`, `Zustand`
  - [apps/resume](./apps/resume): `Remix`
  - [apps/craft](./apps/craft): `Next.js`
- **스타일링**: `Tailwind`
- **DB & 인증**: `Supabase`
- **배포**: `Cloudflare Pages`

## 🚀 배포 구조

메인 페이지, 블로그, 이력서, 실험실은 각각 배포되며, Cloudflare Pages Functions를 통해 다음과 같이 요청을 프록시합니다.

- `/` → `apps/home`
- `/blog` → `apps/blog`
- `/resume` → `apps/resume`
- `/craft` → `apps/craft`
