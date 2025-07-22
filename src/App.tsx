import { AuthProvider } from './auth/AuthProvider';
import DashboardLayoutBasicDemo from './components/DashboardLayoutDemo';

function App() {
  return (
    <AuthProvider>
      <DashboardLayoutBasicDemo />
    </AuthProvider>
  );
}

export default App;
