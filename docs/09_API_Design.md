# StudentPilot AI — API Design & Interface Contracts (v1.0)

This document defines the RESTful endpoints, WebSocket real-time contracts, authentication standards, and error handling formats for StudentPilot AI APIs.

---

## 🌐 1. API Architecture & Standards

- **Base URL**: `https://api.studentpilot.ai/api/v1`
- **Data Exchange Format**: `JSON` (UTF-8)
- **Protocol**: HTTPS (TLS 1.3), WebSockets (`wss://`)
- **Authentication**: `Bearer <JWT_TOKEN>` in Request Header `Authorization`
- **Rate Limiting**: 100 requests / min per IP (burst capacity 200).

---

## 🔑 2. Authentication & Authorization

### `POST /api/v1/auth/login`
Authenticates a user via email/password or OAuth code.

#### Request Payload:
```json
{
  "provider": "google",
  "auth_code": "4/0AeaYSHC..."
}
```

#### Response Payload (200 OK):
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJKV1QiLC...",
    "refresh_token": "d8a1f802-...",
    "expires_in": 3600,
    "user": {
      "user_id": "usr_948201",
      "full_name": "Paras Jain",
      "email": "paras@studentpilot.ai",
      "avatar_url": "https://assets.studentpilot.ai/avatars/usr_948201.png"
    }
  }
}
```

---

## 📋 3. Core Modules API Endpoints

### 3.1 Today Page API
`GET /api/v1/learner/today`

#### Response Payload (200 OK):
```json
{
  "success": true,
  "data": {
    "hero_task": {
      "task_id": "tsk_849201",
      "title": "Master React Custom Hooks & Async Data Fetching",
      "phase_title": "Phase 3: Advanced Frontend & State",
      "estimated_minutes": 45,
      "why_this_task": "Resolves your async error gap identified during yesterday's component challenge.",
      "roadmap_position": "Node 14 of 42",
      "weak_skill_addressed": "Async Exception Handling"
    },
    "weekly_strip": [
      { "day": "Mon", "status": "completed", "date": "2026-07-27" },
      { "day": "Tue", "status": "completed", "date": "2026-07-28" },
      { "day": "Wed", "status": "active",    "date": "2026-07-29" },
      { "day": "Thu", "status": "upcoming",  "date": "2026-07-30" },
      { "day": "Fri", "status": "upcoming",  "date": "2026-07-31" },
      { "day": "Sat", "status": "upcoming",  "date": "2026-08-01" },
      { "day": "Sun", "status": "upcoming",  "date": "2026-08-02" }
    ],
    "placement_readiness": {
      "current_score": 68.5,
      "target_goal": 85.0,
      "delta_this_week": "+3.2%"
    }
  }
}
```

---

### 3.2 Plan Page API
`GET /api/v1/learner/plan`

#### Response Payload (200 OK):
```json
{
  "success": true,
  "data": {
    "selected_day": "Wed",
    "total_estimated_minutes": 75,
    "tasks": [
      {
        "task_id": "tsk_849201",
        "title": "Master React Custom Hooks",
        "category": "Frontend Systems",
        "duration_minutes": 45,
        "status": "active"
      },
      {
        "task_id": "tsk_849202",
        "title": "B-Tree Indexing Exercises",
        "category": "Databases",
        "duration_minutes": 30,
        "status": "upcoming"
      }
    ],
    "phases": [
      { "phase_number": 1, "title": "Foundations & CS Fundamentals", "status": "completed" },
      { "phase_number": 2, "title": "Core Full Stack Engineering", "status": "completed" },
      { "phase_number": 3, "title": "Advanced Frontend & State", "status": "active" },
      { "phase_number": 4, "title": "Distributed Systems & Cloud", "status": "locked" },
      { "phase_number": 5, "title": "Placement & Mock Interviews", "status": "locked" }
    ]
  }
}
```

---

### 3.3 Gap Report API
`GET /api/v1/learner/gap-report`

#### Response Payload (200 OK):
```json
{
  "success": true,
  "data": {
    "target_career": "Full Stack Engineer",
    "readiness_score": 68.5,
    "skill_gaps": [
      {
        "skill_name": "System Architecture & Caching",
        "current_score": 45,
        "required_score": 80,
        "status": "critical_gap"
      },
      {
        "skill_name": "Database Index Optimization",
        "current_score": 60,
        "required_score": 75,
        "status": "deficit"
      }
    ],
    "recommended_project": {
      "title": "Build a High-Throughput Redis-Cached API Gateway",
      "estimated_hours": 12,
      "impact": "+8.5% Placement Readiness"
    }
  }
}
```

---

## ⚡ 4. Real-Time AI Mentor WebSocket Contract

- **WebSocket Connection Endpoint**: `wss://api.studentpilot.ai/ws/v1/mentor/stream`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

### Client Sent Frame (Message Request):
```json
{
  "event": "send_message",
  "payload": {
    "message": "Why am I getting an unhandled rejection in my custom hook?",
    "active_task_id": "tsk_849201",
    "code_context": "useEffect(() => { fetchData(); }, []);"
  }
}
```

### Server Streamed Chunk Frames (Real-Time Output):
```json
{
  "event": "message_chunk",
  "payload": {
    "chunk": "In your `useEffect`, `fetchData` returns a Promise that is not caught."
  }
}
```

### Server Final Frame:
```json
{
  "event": "message_complete",
  "payload": {
    "message_id": "msg_901823",
    "total_tokens": 142
  }
}
```

---

## ⚠️ 5. Standard Error Format & HTTP Status Codes

All error responses adhere strictly to the RFC 7807 Problem Details specification:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested task ID 'tsk_999999' was not found.",
    "status": 404,
    "timestamp": "2026-07-31T21:51:57Z"
  }
}
```

| HTTP Code | Error Code | Cause & Mitigation |
| :--- | :--- | :--- |
| **400 Bad Request** | `INVALID_PAYLOAD` | Missing required payload parameters or JSON formatting error. |
| **401 Unauthorized**| `TOKEN_EXPIRED` | JWT token expired or invalid; client should refresh token. |
| **429 Too Many Req**| `RATE_LIMIT_EXCEEDED` | Request threshold exceeded; retry after specified header delay. |
| **500 Server Error** | `INTERNAL_FAILURE` | Downstream service exception; alert logged for site reliability. |
