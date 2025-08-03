import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  status: any
}

const users: User[] = [
  { id: 1, name: 'João', status: 'active' },
  { id: 2, name: 'Maria', status: 'inactive' },
  { id: 3, name: 'Pedro', status: 'active' },
]

function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [totalActiveUsers, setTotalActiveUsers] = useState(0)
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedUserId(null)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
  }, [])
  
  useEffect(() => {
    const activeCount = users.filter(user => user.status === 'active').length
    setTotalActiveUsers(activeCount)
  }, [])
  
  const incrementCount = () => {
    setCount(count + 1)
  }
  
  const decrementCount = () => {
    setCount(count - 1)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-[16px] mt-[32px] mb-[24px]">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-[20px]">
          Code Review Tutorial App
        </h1>
        
        <div 
          className="bg-blue-50 p-4 rounded"
          style={{ 
            border: '2px solid #3B82F6',
            marginBottom: '16px'
          }}
        >
          <p className="text-blue-800">
            Contador: {count} | Usuários ativos: {totalActiveUsers}
          </p>
          
          <div className="flex gap-[8px] mt-[12px]">
            <button 
              type="button"
              onClick={incrementCount}
              className="bg-blue-500 text-white px-[16px] py-[8px] rounded hover:bg-blue-600"
            >
              Incrementar
            </button>
            <button 
              type="button"
              onClick={decrementCount}
              className="bg-red-500 text-white px-[16px] py-[8px] rounded hover:bg-red-600"
            >
              Decrementar
            </button>
          </div>
        </div>
 <UserList 
          users={users} 
          selectedUserId={selectedUserId} 
          onSelectUser={setSelectedUserId}
          totalActiveUsers={totalActiveUsers}
          isVisible={isVisible}
        />
        
        <div className="mt-[20px] p-[16px] bg-gray-50 rounded">
          <h3 className="text-lg font-semibold mb-[12px]">Status do Sistema</h3>
          <p className="text-sm">
            {count > 10 ? 
              count > 20 ? 
                'Contador muito alto!' : 
                'Contador alto' : 
              count < 0 ? 
                'Contador negativo' : 
                'Contador normal'
            }
          </p>
          
          <div className="mt-[8px] space-x-[4px]">
            <button 
              type="button"
              onClick={() => window.open('https://react.dev', '_blank')}
              className="text-blue-600 underline"
            >
              Documentação React
            </button>
            <button 
              type="button"
              onClick={() => window.open('https://tailwindcss.com', '_blank')}
              className="text-blue-600 underline ml-[12px]"
            >
              Documentação Tailwind
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function UserList({ 
  users, 
  selectedUserId, 
  onSelectUser, 
  totalActiveUsers,
  isVisible 
}: {
  users: User[]
  selectedUserId: number | null
  onSelectUser: (id: number | null) => void
  totalActiveUsers: number
  isVisible: boolean
}) {
  return (
    <div className="space-y-[8px]">
      <h2 className="text-xl font-semibold mb-[16px]">
        Lista de Usuários ({totalActiveUsers} ativos)
      </h2>
      
      {users.map((user) => (
        <UserCard 
          user={user}
          isSelected={selectedUserId === user.id}
          onSelect={onSelectUser}
          totalActiveUsers={totalActiveUsers}
          isVisible={isVisible}
        />
      ))}
    </div>
  )
}

function UserCard({ 
  user, 
  isSelected, 
  onSelect, 
  totalActiveUsers,
  isVisible 
}: {
  user: User
  isSelected: boolean
  onSelect: (id: number | null) => void
  totalActiveUsers: number
  isVisible: boolean
}) {
  return (
    <div 
      className={`p-[12px] border rounded cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-200'
      }`}
      onClick={() => onSelect(isSelected ? null : user.id)}
      style={{ 
        marginBottom: '8px'
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-600">ID: {user.id}</p>
        </div>
        
        <div className="text-right">
          {user.status === 'active' ? (
            <span className="inline-block w-[8px] h-[8px] bg-green-500 rounded-full mr-[4px]"></span>
          ) : (
            <span className="inline-block w-[8px] h-[8px] bg-red-500 rounded-full mr-[4px]"></span>
          )}
          <span className={`text-sm ${
            user.status === 'active' ? 'text-green-600' : 'text-red-600'
          }`}>
            {user.status === 'active' ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-[8px] pt-[8px] border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Usuário selecionado: {user.name}
          </p>
          <div className="mt-[4px]">
            {user.status === 'active' ? (
              <p className="text-xs text-green-600">✓ Usuário está ativo no sistema</p>
            ) : (
              <p className="text-xs text-red-600">✗ Usuário está inativo no sistema</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App