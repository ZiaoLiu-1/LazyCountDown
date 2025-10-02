# LazyCountdown Brownfield Enhancement PRD

**Version:** v0.1  
**Date:** 2025-10-02  
**Status:** Draft  
**Platform:** iOS Mobile (Capacitor)

---

## Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|---------|
| Initial Creation | 2025-10-02 | v0.1 | Brownfield PRD created from existing vibe-coded implementation | John (PM) |

---

## 1. Intro: Project Analysis and Context

### Analysis Source
**IDE-based fresh analysis** - Complete codebase analyzed including comprehensive Chinese architecture documentation (`src/CODEBASE_ARCHITECTURE.md`)

### Current Project State

**LazyCountdown (懒人倒计时)** is an iOS mobile countdown and task management application with the following characteristics:

- **Primary Purpose**: iOS app for managing countdown timers and tasks organized into "Event Books" (事件薄)
- **Platform**: iOS mobile app using Capacitor 7.4.3 (primary focus), Android secondary
- **Design Philosophy**: Morandi color aesthetic with bilingual support (Chinese/English)
- **Current Status**: Beautiful, complete UI from Figma design with non-functional backend (all data hardcoded)

**Current Capabilities (UI Complete, Logic Missing):**
- ✅ Event book creation UI with custom icons/colors
- ✅ Task creation UI with countdown timers (one-time and recurring)
- ✅ Task filtering UI by status (all, completed, pending, overdue, efficiency)
- ✅ Category management UI
- ✅ ICS calendar import UI (non-functional)
- ✅ 4 theme variations (dark, rose, blue, morandi)
- ✅ Complete bilingual interface (Chinese/English)
- ✅ Mobile-optimized responsive design
- ❌ No data persistence (all hardcoded)
- ❌ No real countdown calculations (static strings)
- ❌ No recurring task logic
- ❌ No notifications

### Available Documentation

✅ **Tech Stack Documentation** - Documented in `package.json` and architecture file  
✅ **Source Tree/Architecture** - Comprehensive Chinese documentation at `src/CODEBASE_ARCHITECTURE.md` (487 lines)  
⚠️ **Coding Standards** - Implied through codebase but not formally documented  
✅ **Component Architecture** - Well-documented with 41 numbered sections  
❌ **API Documentation** - N/A (no backend, client-side only)  
❌ **Technical Debt Documentation** - Not documented

### Enhancement Scope Definition

**Enhancement Type:**
- ☑️ Major Feature Modification - Making existing UI functional
- ☑️ New Feature Addition - iOS notifications, persistence layer
- ☑️ Bug Fix and Stability Improvements - Fixing vibe-coded logic

**Enhancement Description:**

**Retroactive Product Design & Enhancement Project**: Convert beautiful but non-functional Figma prototype into production-ready iOS app by implementing data persistence, real-time countdown calculations, simplified recurring task logic, and iOS notifications - all while preserving the existing Morandi-themed design.

**Impact Assessment:**
- ☑️ **Significant Impact** - Adding entire data layer beneath existing UI
  - Implementing data persistence with IndexedDB
  - Adding real-time countdown calculation system
  - Implementing simplified recurring task logic
  - Integrating iOS native notifications
  - Maintaining visual design while adding functionality

### Goals and Background Context

**Goals:**
- Implement data persistence for all user-created content (tasks, event books, categories)
- Add real-time countdown calculations that update dynamically
- Implement simplified recurring task logic (completion resets per period)
- Add iOS local notifications for task reminders
- Fix display bugs and improve iOS mobile experience
- Maintain the beautiful Morandi aesthetic and bilingual support

**Background Context:**

LazyCountdown was developed from a Figma prototype with excellent visual design but without data persistence or business logic ("vibe coding"). The beautiful UI is complete and satisfactory. The goal is to make it production-ready for iOS by:

1. **Adding the missing data layer**: Implement proper storage and retrieval
2. **Making features functional**: Real calculations instead of hardcoded values
3. **Adding iOS native features**: Notifications, haptics, iOS-optimized interactions
4. **Keeping design intact**: No UI changes, only logic implementation

This PRD documents what needs to be built to make the existing UI functional for iOS users.

---

## 2. Requirements

### Functional Requirements

**Core Task & Countdown Management:**
- **FR1**: Users shall be able to create tasks with titles, descriptions, deadlines, and priority levels, with data persisting across app sessions
- **FR2**: Countdowns shall be calculated dynamically from deadline dates and update in real-time (not hardcoded strings)
- **FR3**: Users shall be able to mark tasks as complete, with completion state persisting
- **FR4**: Users shall be able to delete tasks, with changes persisting
- **FR5**: Overdue tasks shall be automatically detected and visually indicated
- **FR6**: Users shall be able to edit existing tasks with all changes persisting

**Event Book Management:**
- **FR7**: Users shall be able to create event books with custom names, descriptions, icons (12 preset options), and colors (8 Morandi colors)
- **FR8**: Event books shall persist across app sessions with all associated tasks
- **FR9**: Users shall be able to view task statistics per event book (total, completed, in-progress)
- **FR10**: Users shall be able to delete event books (with confirmation for data safety)

**Task Organization & Filtering:**
- **FR11**: Users shall be able to filter tasks by status (all, completed, pending, overdue, efficiency)
- **FR12**: Users shall be able to filter tasks by event book in the "All Tasks" view
- **FR13**: Users shall be able to view tasks grouped by type (one-time vs recurring)
- **FR14**: Users shall be able to assign categories to tasks and filter by category

**Recurring Tasks (Simplified):**
- **FR15**: Users shall be able to create recurring tasks with simple patterns (daily, weekly, monthly)
- **FR16**: Recurring tasks shall display the next occurrence time (e.g., "Every Monday 9:00 AM")
- **FR17**: When a recurring task is marked complete, it shall automatically reset to incomplete at the start of the next period
- **FR18**: Users shall be able to specify duration for recurring tasks (for display purposes)

**iOS Notifications:**
- **FR19**: Users shall be able to enable/disable notifications per task
- **FR20**: The app shall send iOS local notifications for tasks approaching their deadline (configurable: 1 day, 1 hour, 30 min before)
- **FR21**: Tapping a notification shall open the app to the specific task detail view
- **FR22**: Users shall be able to configure global notification preferences in Settings

**User Experience:**
- **FR23**: All UI text shall display correctly in both Chinese and English based on user preference
- **FR24**: Users shall be able to switch between 4 themes (dark, rose, blue, morandi) with preference persisting
- **FR25**: Users shall be able to switch between Chinese and English language with preference persisting
- **FR26**: Task cards shall visually indicate urgency (tasks within 3 days of deadline)

**Import/Export (Future Feature):**
- **FR27**: [FUTURE v1.1+] Import .ics calendar files functionality (UI exists, will be implemented later)
- **FR28**: [FUTURE v1.1+] Import .csv files functionality (UI exists, will be implemented later)

### Non-Functional Requirements

**Performance:**
- **NFR1**: Countdown updates shall occur every minute without causing UI lag
- **NFR2**: The app shall remain responsive with up to 500 tasks across 50 event books
- **NFR3**: Task list filtering shall complete within 100ms

**Data Integrity:**
- **NFR4**: All user data shall persist locally using IndexedDB
- **NFR5**: Data shall survive app closure, phone restart, and app updates
- **NFR6**: No data loss shall occur during app crashes or unexpected termination

**Usability:**
- **NFR7**: All existing UI components and layouts shall be preserved (maintain Morandi aesthetic)
- **NFR8**: All features shall work equally well in both Chinese and English

**iOS Platform Specific:**
- **NFR9**: All touch targets shall be minimum 44pt × 44pt per Apple Human Interface Guidelines
- **NFR10**: The app shall use iOS-native haptic feedback for confirmations and interactions (via Capacitor Haptics)
- **NFR11**: All UI shall respect iOS safe areas (notch, Dynamic Island, home indicator)
- **NFR12**: The app shall support iOS 14+ (align with Capacitor 7.x requirements)
- **NFR13**: The app shall use iOS-optimized storage (Capacitor Preferences API for settings, IndexedDB for task data)
- **NFR14**: Scrolling shall use iOS momentum scrolling with bounce effect
- **NFR15**: Navigation shall support iOS edge-swipe back gesture where appropriate
- **NFR16**: The app shall maintain 60fps scrolling on iPhone 12 and newer
- **NFR17**: Countdown timer updates shall not impact battery life (update frequency optimized)
- **NFR18**: App launch time shall be under 2 seconds on iPhone 12

**Code Quality:**
- **NFR19**: TypeScript shall be used with proper type definitions (no `any` types)
- **NFR20**: All date/time calculations shall handle timezone and DST correctly
- **NFR21**: Error states shall be handled gracefully with user-friendly messages

### Compatibility Requirements

**CR1: UI Design Compatibility** - All new features must maintain the existing Morandi color aesthetic and component design patterns (ShadCN/UI, Tailwind CSS v4). No UI changes, only logic implementation.

**CR2: Bilingual Compatibility** - All new features must support both Chinese and English text, following the existing translation pattern in ThemeContext.

**CR3: iOS Platform Compatibility** - All features must work on iOS 14+ through Capacitor WebView, optimized for iOS-first experience.

**CR4: Data Schema Compatibility** - Any future data structure changes must include migration logic to preserve existing user data.

**CR5: Theme System Compatibility** - New UI elements (if any) must adapt to all 4 existing themes (dark, rose, blue, morandi) automatically.

---

## 3. Technical Constraints and Integration Requirements

### Existing Technology Stack

**Languages:** TypeScript 5.9.2, JavaScript (ES6+)

**Frontend Framework:** 
- React 18.3.1 with React Hooks (useState, useEffect, useContext)
- No Redux or external state management (keep it simple)

**Mobile Platform:** 
- Capacitor 7.4.3 (iOS primary target)
- iOS SDK: 14.0+ minimum
- WKWebView container

**Build Tool:** 
- Vite 6.3.5 with SWC plugin for fast compilation
- Build output: Static bundle in `build/` directory

**UI Component Library:** 
- Radix UI primitives (dialogs, dropdowns, switches, etc.)
- ShadCN/UI component patterns
- Lucide React icons
- Embla Carousel for sliders

**Styling:** 
- Tailwind CSS v4 with custom CSS variables
- Custom animations in `globals.css`
- Morandi color palette via CSS variables in ThemeContext

**Date/Time Handling:** 
- Custom utilities in `utils/dateUtils.ts` (needs enhancement)
- **TO ADD:** `date-fns` library for robust date calculations

**State Management:** 
- React Context API (ThemeContext for theme/language)
- Component-level useState (will be enhanced for data persistence)

**Infrastructure:** 
- No backend - fully client-side application
- No external APIs currently

**Database/Storage:** 
- **CURRENT**: None (all data hardcoded)
- **TO IMPLEMENT**: Capacitor Preferences API (settings) + IndexedDB via Dexie.js (task data)

### Integration Approach

**Database Integration Strategy:**
```
Settings Storage: Capacitor Preferences API
- Theme preference
- Language preference  
- Notification settings

Task Data Storage: IndexedDB via Dexie.js wrapper
- Event Books table
- Tasks table
- Categories table
- Relationships preserved via eventBookId foreign keys

Data Access Pattern: Repository pattern
- EventBookRepository.ts
- TaskRepository.ts
- All components access data through repositories
```

**iOS Native Integration Strategy:**
```
Local Notifications: @capacitor/local-notifications plugin
- Request permissions on first use
- Schedule notifications for task deadlines
- Handle notification taps to navigate to tasks

Haptic Feedback: @capacitor/haptics plugin
- Light impact on task complete
- Medium impact on task delete
- Success notification on save

Status Bar: @capacitor/status-bar plugin
- Adapt status bar to current theme
- Light content for dark themes, dark for light themes
```

**Frontend Integration Strategy:**
```
Keep existing component structure intact
Add data layer between components and storage:
- Custom React hooks: useEventBooks(), useTasks(), useCategories()
- These hooks abstract IndexedDB operations
- Components remain clean and UI-focused

Real-time Countdown: 
- useCountdown() custom hook
- Efficiently updates only visible countdowns
- Uses requestAnimationFrame for smooth updates

Recurring Task Logic:
- useRecurringTasks() custom hook
- Checks and resets completed recurring tasks
- Runs on app launch and midnight transitions
```

### Code Organization and Standards

**File Structure Approach:**
```
src/
├── components/       (EXISTING - keep as is)
├── contexts/         (EXISTING - keep as is)
├── hooks/            (NEW - custom hooks for data/logic)
│   ├── useEventBooks.ts
│   ├── useTasks.ts
│   ├── useCountdown.ts
│   ├── useRecurringTasks.ts
│   └── useNotifications.ts
├── repositories/     (NEW - data access layer)
│   ├── EventBookRepository.ts
│   ├── TaskRepository.ts
│   └── db.ts (Dexie configuration)
├── services/         (NEW - business logic)
│   ├── CountdownService.ts
│   ├── NotificationService.ts
│   └── RecurringTaskService.ts
├── types/            (NEW - centralized TypeScript types)
│   ├── EventBook.ts
│   ├── Task.ts
│   └── index.ts
├── utils/            (EXISTING - enhance with date-fns)
└── styles/           (EXISTING - keep as is)
```

**Naming Conventions:**
- Components: PascalCase (TaskCard.tsx)
- Hooks: camelCase with 'use' prefix (useEventBooks.ts)
- Services: PascalCase with 'Service' suffix
- Types/Interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE

**Coding Standards:**
- TypeScript strict mode enabled
- No `any` types - use proper typing or `unknown`
- Async/await preferred over promises
- Error boundaries for graceful error handling
- Consistent use of optional chaining (?.) and nullish coalescing (??)

### Deployment and Operations

**Build Process Integration:**
```bash
npm run dev          # Vite dev server for web testing
npm run build        # Vite production build → build/
npm run cap:sync     # Copy build to iOS project
npm run cap:open:ios # Open Xcode
# Then build/run from Xcode
```

**Deployment Strategy:**
- TestFlight for beta testing
- App Store for production release
- No web deployment (mobile-only focus)

### Risk Assessment and Mitigation

**Technical Risks:**
- **Risk**: IndexedDB quota limits on iOS (could hit storage limits with many tasks)
  - **Mitigation**: Implement data cleanup for old completed tasks, warn users at 80% quota
  
- **Risk**: Countdown timer performance with 100+ tasks
  - **Mitigation**: Only update visible countdowns, use virtualized lists if needed

- **Risk**: iOS notification permissions denied by user
  - **Mitigation**: App remains functional without notifications, gracefully handle denied state

**Integration Risks:**
- **Risk**: Capacitor plugin compatibility issues with iOS updates
  - **Mitigation**: Pin Capacitor version, test on beta iOS versions

- **Risk**: Data migration complexity when adding new features
  - **Mitigation**: Version data schema, write migration functions upfront

**Deployment Risks:**
- **Risk**: App Store review rejection
  - **Mitigation**: Follow HIG strictly, test thoroughly, prepare clear app description

- **Risk**: Performance issues on older iPhones
  - **Mitigation**: Test on older devices, optimize bundle size

---

## 4. Epic and Story Structure

### Epic Approach

**Single Comprehensive Epic for Brownfield Enhancement**

Given that this is a brownfield project with beautiful existing UI that needs functional implementation, we'll use a **single epic** approach. The work is cohesive: making the existing application functional by adding the data and logic layer beneath the UI.

**Epic Structure Decision**: Single epic ("Make LazyCountdown Functional") with stories sequenced to build foundational capabilities first (persistence, countdown calculations) before advanced features (notifications, recurring tasks).

---

## Epic 1: Make LazyCountdown Production-Ready for iOS

**Epic Goal**: Transform the existing beautiful UI prototype into a fully functional iOS countdown and task management app by implementing data persistence, real-time countdown calculations, simplified recurring task logic, and iOS notifications - all while preserving the existing Morandi design.

**Integration Requirements**: 
- Preserve all existing UI components and layouts
- Add data layer (IndexedDB + Dexie.js) without changing component interfaces
- Integrate Capacitor plugins for iOS native features
- Maintain bilingual support throughout all implementations

---

### Story 1.1: Setup Data Persistence Foundation

As a developer,
I want to set up the data persistence infrastructure with IndexedDB and Dexie.js,
so that I have a foundation for storing tasks and event books.

**Acceptance Criteria:**
1. Dexie.js is installed and configured with proper TypeScript types
2. Database schema is defined with tables for: EventBooks, Tasks, Categories
3. EventBookRepository with CRUD methods (create, read, update, delete, getAll)
4. TaskRepository with CRUD methods and filtering capabilities
5. Database versioning and migration system in place
6. All repositories have proper error handling

**Integration Verification:**
- IV1: Existing UI components can be imported without breaking
- IV2: No visual changes to the app when this code is added
- IV3: Database initializes on app launch without errors

---

### Story 1.2: Implement TypeScript Type Definitions

As a developer,
I want centralized TypeScript type definitions for all data models,
so that the codebase has type safety and consistency.

**Acceptance Criteria:**
1. EventBook interface with all properties (id, name, description, icon, color, taskCount, completedCount, createdAt)
2. Task interface with all properties (id, title, description, deadline, countdown, type, priority, category, eventBookId, completed, notificationEnabled)
3. RecurringTask interface extending Task with recurrence properties
4. Category interface defined
5. NotificationSettings interface defined
6. All interfaces exported from central types/index.ts

**Integration Verification:**
- IV1: Existing components compile without TypeScript errors
- IV2: All hardcoded data arrays match new type definitions
- IV3: No runtime behavior changes

---

### Story 1.3: Create Event Books with Persistence

As a user,
I want to create event books that persist across app restarts,
so that my organizational structure is saved.

**Acceptance Criteria:**
1. CreateEventBook form saves to IndexedDB when submitted
2. Event books appear in EventBooksList after creation
3. Event book data persists after app restart
4. Event book includes: name, description, icon (from 12 presets), color (from 8 Morandi colors), creation date
5. Newly created event book shows 0 tasks initially
6. User is navigated back to EventBooksList after successful creation

**Integration Verification:**
- IV1: Existing CreateEventBook UI unchanged, only wired to persistence
- IV2: Hardcoded sample event books can coexist with user-created ones (for testing)
- IV3: Theme and language switching still works

---

### Story 1.4: Create One-Time Tasks with Persistence

As a user,
I want to create one-time countdown tasks that persist,
so that I can track important deadlines.

**Acceptance Criteria:**
1. TaskDetail form saves new tasks to IndexedDB
2. Task includes: title, description, deadline date/time, priority, category, eventBookId
3. Task appears in appropriate event book's task list
4. Task appears in "All Tasks" view
5. Task persists after app restart
6. User is navigated back to task list after successful creation

**Integration Verification:**
- IV1: Existing TaskDetail UI unchanged, only wired to persistence
- IV2: Task is associated with correct event book
- IV3: Hardcoded sample tasks can coexist with user-created ones

---

### Story 1.5: Implement Real-Time Countdown Calculations

As a user,
I want to see accurate countdowns that update automatically,
so that I know exactly how much time remains until my deadlines.

**Acceptance Criteria:**
1. CountdownService calculates time difference between now and deadline
2. Countdown displays in format: "X days Y hours" (bilingual)
3. Countdowns update every 60 seconds automatically
4. Overdue tasks show "Overdue X days" (bilingual)
5. Tasks within 3 days show urgent styling (already in UI)
6. Countdown updates only for visible tasks (performance optimization)
7. useCountdown hook provides countdown string to components

**Integration Verification:**
- IV1: Existing TaskCard component displays dynamic countdowns
- IV2: Language switching updates countdown text format
- IV3: No performance degradation with 50+ tasks

---

### Story 1.6: Implement Task Completion Toggle

As a user,
I want to mark tasks as complete and have that state persist,
so that I can track my progress.

**Acceptance Criteria:**
1. Tapping "Complete" button in TaskDetail marks task as completed
2. Completed tasks show checkmark and "Completed" text
3. Completed tasks appear in "Completed" filter
4. Completion status persists after app restart
5. User can toggle completion status (complete ↔ incomplete)
6. Event book statistics update (completedCount) when tasks are completed

**Integration Verification:**
- IV1: Existing completed task styling is applied
- IV2: Filter chips show correct counts
- IV3: Event book progress bars update correctly

---

### Story 1.7: Implement Task Editing

As a user,
I want to edit existing tasks,
so that I can update information as plans change.

**Acceptance Criteria:**
1. Tapping a task opens TaskDetail with pre-filled data
2. User can modify: title, description, deadline, priority, category
3. Changes are saved to IndexedDB on "Save" button
4. Updated task appears in lists with new information
5. Countdown recalculates if deadline changed
6. Changes persist after app restart

**Integration Verification:**
- IV1: Existing TaskDetail form works for both create and edit modes
- IV2: Task remains associated with correct event book
- IV3: No duplicate tasks are created

---

### Story 1.8: Implement Task Deletion

As a user,
I want to delete tasks I no longer need,
so that my task lists stay organized.

**Acceptance Criteria:**
1. "Delete" button in TaskDetail prompts confirmation dialog
2. Confirming deletion removes task from IndexedDB
3. Task no longer appears in any task lists
4. Event book task count decrements
5. User is navigated back to previous view after deletion
6. Deletion is permanent and persists after app restart

**Integration Verification:**
- IV1: Existing confirmation UI is used
- IV2: Event book statistics update correctly
- IV3: No orphaned task data remains

---

### Story 1.9: Implement Event Book Deletion

As a user,
I want to delete event books I no longer need,
so that my organizational structure stays relevant.

**Acceptance Criteria:**
1. Event book deletion option is available (long-press or swipe action)
2. Confirmation dialog warns if event book contains tasks
3. Deleting event book deletes all associated tasks
4. Event book no longer appears in lists
5. Deletion persists after app restart

**Integration Verification:**
- IV1: UI pattern matches iOS conventions (swipe-to-delete or action sheet)
- IV2: All tasks associated with event book are removed
- IV3: App doesn't crash if currently viewing deleted event book

---

### Story 1.10: Implement Simplified Recurring Tasks

As a user,
I want to create recurring tasks that automatically reset after completion,
so that I can track regular activities.

**Acceptance Criteria:**
1. User can select "Recurring" task type in TaskDetail
2. User selects recurrence pattern: Daily, Weekly (with day), or Monthly (with date)
3. Recurring task displays next occurrence time (e.g., "Every Monday 9:00 AM")
4. Marking recurring task complete sets completed=true
5. At next period start (midnight for daily, specified day/time for weekly/monthly), task automatically resets to incomplete
6. RecurringTaskService checks and resets tasks on app launch and at midnight
7. Recurring tasks persist across app restarts

**Integration Verification:**
- IV1: Existing recurring task UI (type selector) is wired to functionality
- IV2: Recurring tasks show distinctive icon and "Recurring" label
- IV3: Countdown display differs for recurring vs one-time tasks

---

### Story 1.11: Setup iOS Local Notifications Infrastructure

As a user,
I want to receive notifications for upcoming tasks,
so that I don't miss important deadlines.

**Acceptance Criteria:**
1. @capacitor/local-notifications plugin installed
2. NotificationService requests notification permissions on first use
3. Permission request shows iOS native dialog
4. Permission status is stored in Capacitor Preferences
5. Settings page shows notification permission status
6. Graceful handling if permissions denied (app still functional)

**Integration Verification:**
- IV1: Requesting permissions doesn't break existing functionality
- IV2: Permission dialog only shows once (not on every app launch)
- IV3: Settings page displays correct permission status

---

### Story 1.12: Schedule Task Deadline Notifications

As a user,
I want notifications scheduled for my task deadlines,
so that I'm reminded in advance.

**Acceptance Criteria:**
1. When creating/editing task, user can toggle "Enable Notifications"
2. If enabled, app schedules 3 notifications: 1 day before, 1 hour before, 30 minutes before deadline
3. Notification shows: task title, event book name, time remaining
4. Notifications are bilingual (match app language setting)
5. Editing task deadline reschedules notifications
6. Deleting task cancels scheduled notifications
7. Completing task cancels remaining notifications

**Integration Verification:**
- IV1: Notifications appear on iOS lock screen and notification center
- IV2: Notification content displays correctly in both languages
- IV3: No duplicate notifications are scheduled

---

### Story 1.13: Handle Notification Taps

As a user,
I want tapping a notification to open the specific task,
so that I can quickly view or complete it.

**Acceptance Criteria:**
1. Tapping notification launches app (if not running) or brings to foreground
2. App navigates directly to TaskDetail view for the notified task
3. Task is highlighted or shows animation to indicate it was opened via notification
4. If task was deleted, graceful handling (show message, navigate to home)
5. Notification tap handling works when app is: closed, backgrounded, or active

**Integration Verification:**
- IV1: Deep linking works correctly for notification taps
- IV2: App state is properly restored when opened via notification
- IV3: No crashes if navigating to deleted task

---

### Story 1.14: Implement Notification Settings

As a user,
I want to configure notification preferences globally,
so that I can control how and when I'm notified.

**Acceptance Criteria:**
1. Settings page includes "Notifications" section
2. Toggle to enable/disable all notifications globally
3. Options to customize timing: 1 day, 1 hour, 30 min, or custom
4. Option to enable/disable notification sounds
5. Link to iOS Settings if permissions denied
6. Preferences persist using Capacitor Preferences API

**Integration Verification:**
- IV1: Existing Settings UI is extended with notification options
- IV2: Global notification toggle overrides individual task settings
- IV3: Settings persist across app restarts

---

### Story 1.15: Add iOS Haptic Feedback

As a user,
I want to feel haptic feedback for important actions,
so that the app feels native and responsive.

**Acceptance Criteria:**
1. @capacitor/haptics plugin installed
2. Light haptic on: task complete toggle, category selection, theme switch
3. Medium haptic on: task deletion, event book deletion
4. Success notification haptic on: successful save operations
5. Haptic feedback respects iOS system settings (disabled if user has it off)

**Integration Verification:**
- IV1: Haptic feedback feels natural and matches iOS conventions
- IV2: No haptics if running in simulator or on devices without haptic engine
- IV3: Haptic feedback doesn't interfere with UI interactions

---

### Story 1.16: Implement Automatic Overdue Detection

As a user,
I want overdue tasks automatically detected and highlighted,
so that I can prioritize catching up.

**Acceptance Criteria:**
1. Task deadline is compared to current time on every render
2. Tasks past deadline show "Overdue X days" text (bilingual)
3. Overdue tasks appear in "Overdue" filter
4. Overdue tasks show red accent color (already in UI)
5. Event book shows count of overdue tasks
6. Overdue detection runs efficiently (doesn't cause lag)

**Integration Verification:**
- IV1: Existing overdue styling is automatically applied
- IV2: Overdue count updates in real-time
- IV3: Timezone and DST changes are handled correctly

---

### Story 1.17: Optimize Performance for Large Data Sets

As a developer,
I want the app to perform well with 500+ tasks,
so that users with extensive task lists have a smooth experience.

**Acceptance Criteria:**
1. Task lists use virtualized rendering (react-window or similar) for 100+ tasks
2. Countdown updates are throttled (60 second interval, not continuous)
3. Only visible countdowns are calculated and updated
4. IndexedDB queries are optimized with proper indexes
5. App launches in under 2 seconds with 500 tasks
6. Scrolling maintains 60fps on iPhone 12

**Integration Verification:**
- IV1: Existing UI appearance unchanged with virtualized lists
- IV2: No visual performance degradation with realistic data volumes
- IV3: Memory usage remains stable during extended use

---

### Story 1.18: Add Data Migration and Error Handling

As a developer,
I want robust error handling and data migration,
so that users don't lose data during app updates.

**Acceptance Criteria:**
1. Database version number defined in schema
2. Migration functions for schema changes (if needed in future)
3. Error boundaries catch and display user-friendly messages
4. Failed database operations show retry options
5. App doesn't crash if IndexedDB unavailable
6. Loading states shown during data operations

**Integration Verification:**
- IV1: App gracefully handles database errors
- IV2: Users see informative error messages, not technical details
- IV3: App remains usable even if some features fail

---

### Story 1.19: Polish iOS-Specific UI Details

As a user,
I want the app to feel like a native iOS application,
so that it's intuitive and familiar.

**Acceptance Criteria:**
1. Status bar adapts to theme (light content for dark themes)
2. Safe areas properly respected on all devices (iPhone 14 Pro notch, etc.)
3. iOS edge-swipe back gesture works correctly
4. Pull-to-refresh on task lists (if applicable)
5. iOS-style action sheets for destructive actions
6. Keyboard dismisses on scroll
7. Form inputs show iOS native keyboard types (number, email, etc.)

**Integration Verification:**
- IV1: App passes iOS Human Interface Guidelines review
- IV2: All interactions feel natural on iPhone
- IV3: No UI elements hidden behind safe areas

---

### Story 1.20: Fix Display Bugs and Edge Cases

As a user,
I want all UI elements to display correctly,
so that the app looks polished and professional.

**Acceptance Criteria:**
1. Identify and document all existing display bugs
2. Long task titles/descriptions truncate gracefully with ellipsis
3. Empty states show helpful messages (no tasks, no event books)
4. Date/time pickers display correctly on iOS
5. Chinese and English text both render properly (no character truncation)
6. Theme colors apply consistently across all views
7. Category chips display correctly when many categories exist

**Integration Verification:**
- IV1: Visual regression testing on iPhone SE (small screen) and iPhone 14 Pro Max (large screen)
- IV2: All themes tested for visual consistency
- IV3: Both languages tested for layout issues

---

## 5. Implementation Notes

### Story Sequencing Rationale

Stories are sequenced to:
1. **Build foundation first** (1.1-1.2): Data layer and types
2. **Core CRUD next** (1.3-1.9): Make basic features work
3. **Advanced features** (1.10-1.14): Recurring tasks, notifications
4. **Polish and optimization** (1.15-1.20): iOS native feel, performance

Each story delivers value while maintaining system integrity. Stories can be worked on by AI agents sequentially.

### Dependencies

- Stories 1.3-1.9 depend on 1.1-1.2 (data foundation)
- Stories 1.12-1.13 depend on 1.11 (notification infrastructure)
- Story 1.17 should be done after most features work
- Story 1.20 is ongoing (fix bugs as discovered)

### Success Criteria

**The enhancement is successful when:**
- ✅ Users can create, edit, delete tasks and event books with persistence
- ✅ Countdowns update in real-time and show accurate time remaining
- ✅ Recurring tasks automatically reset after completion
- ✅ iOS notifications remind users of upcoming deadlines
- ✅ App performs well with realistic data volumes (100+ tasks)
- ✅ Beautiful Morandi design is completely preserved
- ✅ Bilingual support works flawlessly
- ✅ App is ready for TestFlight beta testing

---

**End of PRD**

