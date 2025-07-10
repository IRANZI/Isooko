# Isooko - Water Quality Monitoring App

A comprehensive water quality monitoring application built with React Native (Expo) and Node.js backend. The app helps users track water quality, find nearby water sources, and earn achievements for environmental awareness.

## 🌟 Features

### User Authentication
- Secure signup and login with email validation
- Password reset functionality with OTP verification
- User profile management with first and last name

### Water Quality Monitoring
- Real-time water quality data tracking
- Historical data visualization
- Quality indicators and alerts

### Interactive Map
- Find water sources near your location in Rwanda
- Filter by water source type (rivers, lakes, wells, etc.)
- Real-time location-based recommendations

### Achievement System
- Gamified experience with environmental achievements
- Progress tracking and milestone rewards
- Community engagement features

### Notifications
- Real-time alerts for water quality changes
- Achievement notifications
- System updates and announcements

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your database and JWT configuration.

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure API URL:
   - Open `constants/api.ts`
   - Update `API_URL` to match your backend IP address
   - For local development: `http://localhost:5000`
   - For network access: `http://YOUR_IP_ADDRESS:5000`

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web

## 📱 App Structure

```
Isooko/
├── app/                    # Expo Router app directory
├── components/             # React Native components
│   ├── HomeScreen.tsx     # Main home screen
│   ├── SignInScreen.tsx   # Authentication screens
│   ├── MapTabScreen.tsx   # Interactive map
│   └── ...
├── backend/               # Node.js backend
│   ├── controllers/       # API controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
├── constants/             # App constants and configuration
└── assets/               # Images, fonts, and static files
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/reset-password` - Password reset

### Water Quality
- `GET /api/water-quality` - Get water quality data
- `POST /api/water-quality` - Add water quality reading
- `GET /api/water-quality/:id` - Get specific reading

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/user/:userId` - Get user achievements
- `POST /api/achievements/assign` - Assign achievement to user

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark as read

## 🗺️ Map Configuration

The app includes an interactive map showing water sources in Rwanda. Key features:

- **Location Services**: Uses device GPS for real-time location
- **Water Source Types**: Rivers, lakes, wells, springs, and more
- **Filtering**: Filter by source type and distance
- **Real-time Updates**: Live data from backend API

### Map Setup
1. Ensure location permissions are granted
2. The map will center on your current location
3. Water sources are displayed as markers
4. Tap markers for detailed information

## 🔐 Environment Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend (constants/api.ts)
```typescript
export const API_URL = 'http://YOUR_IP_ADDRESS:5000';
```

## 🐛 Troubleshooting

### Network Issues
1. **Backend not reachable**: Check if backend is running on correct port
2. **API_URL incorrect**: Verify IP address in `constants/api.ts`
3. **Firewall blocking**: Allow port 5000 through firewall
4. **Emulator network**: For LDPlayer, ensure proper network configuration

### Common Errors
- **Metro bundler issues**: Clear cache with `npx expo start --clear`
- **Dependencies missing**: Run `npm install` in both frontend and backend
- **Location not working**: Check app permissions in device settings

### Development Tips
- Use `console.log()` for debugging
- Check Metro bundler logs for frontend errors
- Monitor backend server logs for API issues
- Restart app after configuration changes

## 📱 Platform Support

- **Android**: Tested on Android 8.0+ (API level 26+)
- **iOS**: iOS 12.0+ (requires macOS for development)
- **Web**: Limited support for map features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Check the troubleshooting section above
- Review the API documentation
- Check backend server logs for errors
- Ensure all dependencies are properly installed

---

**Isooko** - Making water quality monitoring accessible to everyone in Rwanda and beyond.
