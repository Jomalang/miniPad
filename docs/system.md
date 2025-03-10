minipad/
├── src/
│ ├── components/
│ │ ├── editor/
│ │ │ ├── MarkdownEditor.vue # 에디터 컴포넌트
│ │ │ └── EditorToolbar.vue # 에디터 도구 모음
│ │ ├── layout/
│ │ │ ├── AppHeader.vue # 앱 헤더
│ │ │ └── MinimizedView.vue # 최소화된 뷰
│ │ └── settings/
│ │ └── SettingsPanel.vue # 설정 패널
│ ├── stores/
│ │ ├── editor.ts # 에디터 상태 관리
│ │ ├── settings.ts # 설정 상태 관리
│ │ └── memo.ts # 메모 데이터 관리
│ ├── services/
│ │ ├── storage.ts # 로컬 저장소 관리
│ │ └── windowManager.ts # 창 관리
│ └── utils/
│ └── zoom.ts # 확대/축소 기능
├── electron/
│ ├── main.ts # 메인 프로세스
│ ├── preload.ts # 프리로드 스크립트
│ └── ipc/ # IPC 통신
│ ├── storage.ts # 저장소 관련 IPC
│ └── window.ts # 창 관리 IPC
