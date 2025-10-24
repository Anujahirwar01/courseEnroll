import './App.css'
import AppRoutes from './routes/approute'
import { AuthProvider } from './context/authcontext'

function App() {

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
