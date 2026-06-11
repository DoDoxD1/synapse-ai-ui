# 🎨 Synapse AI Frontend

**AI-Powered Exam Preparation Platform**

A comprehensive React-based learning management system with personalized study plans, adaptive practice sessions, analytics, and AI tutoring.

## 🚀 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui + Radix UI
- **Routing:** React Router v6
- **State Management:** Zustand
- **API Client:** Axios
- **Form Validation:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide React

## 📋 Features

✅ **Authentication & Authorization**
- User registration and login
- Protected routes with JWT tokens
- Profile management

✅ **Diagnostic Assessment**
- Comprehensive evaluation test
- Personalized study plan generation
- Strengths and weaknesses analysis

✅ **Adaptive Practice**
- Topic-wise practice sessions
- AI-powered question difficulty adjustment
- Real-time feedback and hints

✅ **Study Plan Management**
- Auto-generated weekly schedules
- Task tracking and progress monitoring
- Flexible plan adjustments

✅ **Spaced Repetition Review**
- Optimized review intervals
- Retention rate tracking
- Smart scheduling based on performance

✅ **Mock Tests**
- Full-length and sectional tests
- Detailed performance analysis
- Time management tracking

✅ **Analytics Dashboard**
- Topic mastery heatmap
- Performance trends and charts
- Subject-wise accuracy metrics

✅ **AI Tutor**
- Interactive chat interface
- Instant doubt resolution
- Concept explanations

✅ **Gamification**
- XP points and level system
- Study streaks
- Achievement badges
- Leaderboards

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd synapse-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/ws
VITE_APP_NAME=Synapse AI
VITE_ENVIRONMENT=development
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Build for Production

```bash
# Type check
npm run type-check

# Build
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── auth/           # Authentication components
│   └── layout/         # Layout components
├── pages/              # Page components
├── store/              # Zustand state management
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
├── styles/             # Global styles
└── App.tsx             # Main app with routing
```

## 🎨 Theming

Synapse AI uses a custom color scheme:
- **Primary:** Electric Purple (#7C3AED)
- **Secondary:** Cyan (#06B6D4)
- **Accent:** Orange (#F97316)

Supports both light and dark modes with automatic theme detection.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - TypeScript type checking

## 🌐 API Integration

The frontend expects a backend API running at the URL specified in `VITE_API_BASE_URL`.

API endpoints:
- `/auth/login` - User authentication
- `/auth/register` - User registration
- `/practice/topics` - Get available topics
- `/practice/start` - Start practice session
- `/analytics/*` - Analytics data
- And more...

## 🔐 Authentication Flow

1. User logs in via `/login`
2. JWT tokens stored in Zustand + localStorage
3. Protected routes check authentication status
4. Automatic token refresh on 401 errors
5. Redirect to login if token invalid

## 🚦 Routing

**Public Routes:**
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page

**Protected Routes:**
- `/dashboard` - Main dashboard
- `/assessment` - Diagnostic test
- `/practice` - Practice sessions
- `/study-plan` - Study schedule
- `/mock-tests` - Mock test interface
- `/analytics` - Performance analytics
- `/ai-tutor` - AI chat interface
- `/review` - Spaced repetition
- `/profile` - User profile

## 📱 Responsive Design

Fully responsive with mobile-first approach:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and type checking
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙋 Support

For issues and questions:
- Create an issue on GitHub
- Contact: support@synapseai.com

---

**Built with ❤️ for exam success**
