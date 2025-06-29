import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { VectorLLMChat } from '../Chat/VectorLLMChat';
import { CharacterCustomization } from '../Character/CharacterCustomization';

interface GameMode {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  subjects: string[];
  isUnlocked: boolean;
  progress?: number;
}

interface Subject {
  id: string;
  name: string;
  icon: string;
  progress: number;
  nextLesson: string;
  totalLessons: number;
  completedLessons: number;
}

export const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSubject, setActiveSubject] = useState<string>('physics');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'character'>('dashboard');

  const subjects: Subject[] = [
    { id: 'physics', name: 'Fyzika', icon: '⚗️', progress: 65, nextLesson: 'Gravitační síla', totalLessons: 24, completedLessons: 16 },
    { id: 'math', name: 'Matematika', icon: '📐', progress: 78, nextLesson: 'Kvadratické rovnice', totalLessons: 30, completedLessons: 23 },
    { id: 'chemistry', name: 'Chemie', icon: '🧪', progress: 45, nextLesson: 'Kyseliny a zásady', totalLessons: 20, completedLessons: 9 },
    { id: 'biology', name: 'Biologie', icon: '🌱', progress: 82, nextLesson: 'Buněčné dělení', totalLessons: 18, completedLessons: 15 }
  ];

  const gameModes: GameMode[] = [
    { id: 'story', name: 'Příběhový režim', icon: '📖', description: 'Učení prostřednictvím interaktivních příběhů a dobrodružství', difficulty: 'easy', estimatedTime: 30, subjects: ['physics', 'chemistry', 'biology'], isUnlocked: true, progress: 65 },
    { id: 'quiz', name: 'Kvízový režim', icon: '🎯', description: 'Rychlé otázky a odpovědi pro procvičení znalostí', difficulty: 'medium', estimatedTime: 15, subjects: ['math', 'physics', 'chemistry'], isUnlocked: true, progress: 80 },
    { id: 'exploration', name: 'Průzkumný režim', icon: '🔍', description: 'Svobodné objevování témat vlastním tempem', difficulty: 'medium', estimatedTime: 45, subjects: ['physics', 'biology', 'chemistry'], isUnlocked: true, progress: 45 },
    { id: 'discussion', name: 'Diskusní režim', icon: '💬', description: 'Konverzace s AI tutorem a spolužáky o problémech', difficulty: 'hard', estimatedTime: 25, subjects: ['math', 'physics'], isUnlocked: true, progress: 30 },
    { id: 'minigame', name: 'Mini-hry', icon: '🎮', description: 'Zábavné hry které učí vědecké principy', difficulty: 'easy', estimatedTime: 20, subjects: ['physics', 'chemistry', 'math'], isUnlocked: false, progress: 0 }
  ];

  const studentStats = { totalXP: 2540, level: 8, streak: 7, weeklyGoal: 150, weeklyProgress: 120, badges: 12, achievements: 8 };

  const startGameMode = (mode: GameMode) => {
    if (!mode.isUnlocked) {
      alert('🔒 Tento režim je zatím uzamčen. Dokončete více lekcí k odemčení!');
      return;
    }
    alert(`🎮 Spouštím ${mode.name}\n\n📚 Předmět: ${subjects.find(s => s.id === activeSubject)?.name}\n⏱️ Odhadovaný čas: ${mode.estimatedTime} minut\n\n🚀 Připravte se na učení!`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Snadný';
      case 'medium': return 'Střední';  
      case 'hard': return 'Těžký';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-header p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 text-glass">Vítej zpět, {user?.name}! 👋</h1>
              <p className="text-gray-600 text-glass">Pokračuj ve svém vzdělávacím dobrodružství</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="glass-button px-4 py-2">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-bold text-gray-900">{studentStats.totalXP} XP</span>
                </div>
              </div>
              <div className="glass-button px-4 py-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-500">🏆</span>
                  <span className="font-bold text-gray-900">Level {studentStats.level}</span>
                </div>
              </div>
              <button onClick={logout} className="glass-button px-4 py-2 text-red-600 hover:text-red-700">Odhlásit se</button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="glass-card p-4 mb-6">
          <div className="flex space-x-4">
            {[
              { id: 'dashboard', label: '🏠 Dashboard', icon: '🏠' },
              { id: 'chat', label: '🤖 AI Tutor Chat', icon: '🤖' },
              { id: 'character', label: '👤 Můj charakter', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'glass-card-hover bg-blue-100 text-blue-700' 
                    : 'glass-button hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold text-gray-900 text-glass mb-3">📅 Týdenní cíl</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 text-glass">Pokrok</span>
                    <span className="text-gray-900 text-glass">{studentStats.weeklyProgress}/{studentStats.weeklyGoal} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(studentStats.weeklyProgress / studentStats.weeklyGoal) * 100}%` }} />
                  </div>
                </div>
              </div>
              <div className="glass-card p-4">
                <h3 className="font-semibold text-gray-900 text-glass mb-3">🔥 Série</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">{studentStats.streak}</div>
                  <div className="text-sm text-gray-600 text-glass">dní v řadě</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-gray-900 text-glass mb-4">📚 Tvoje předměty</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {subjects.map((subject) => (
                    <button key={subject.id} onClick={() => setActiveSubject(subject.id)} className={`glass-card-hover p-4 text-left transition-all ${activeSubject === subject.id ? 'ring-2 ring-blue-500' : ''}`}>
                      <div className="text-2xl mb-2">{subject.icon}</div>
                      <h3 className="font-semibold text-gray-900 text-glass">{subject.name}</h3>
                      <p className="text-sm text-gray-600 text-glass mb-2">{subject.nextLesson}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${subject.progress}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 text-glass mt-1">{subject.completedLessons}/{subject.totalLessons} lekcí</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-gray-900 text-glass mb-4">🎮 Herní režimy pro {subjects.find(s => s.id === activeSubject)?.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gameModes.filter(mode => mode.subjects.includes(activeSubject)).map((mode) => (
                    <div key={mode.id} className={`glass-card-hover p-4 transition-all ${!mode.isUnlocked ? 'opacity-60' : 'cursor-pointer'}`} onClick={() => startGameMode(mode)}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">{mode.icon}</div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mode.difficulty)}`}>{getDifficultyText(mode.difficulty)}</span>
                          {!mode.isUnlocked && <span className="text-gray-400">🔒</span>}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-glass mb-2">{mode.name}</h3>
                      <p className="text-sm text-gray-600 text-glass mb-3">{mode.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 text-glass mb-2">
                        <span>⏱️ {mode.estimatedTime} min</span>
                        {mode.isUnlocked && <span>📈 {mode.progress}%</span>}
                      </div>
                      {mode.isUnlocked && mode.progress !== undefined && mode.progress > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div className="bg-green-500 h-1 rounded-full" style={{ width: `${mode.progress}%` }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-96">
            <VectorLLMChat 
              userRole="student" 
              studentId={user?.id} 
              subjectId={activeSubject}
            />
          </div>
        )}

        {activeTab === 'character' && (
          <CharacterCustomization 
            studentId={user?.id || ''} 
            currentXP={studentStats.totalXP}
            onUpdate={(traits) => console.log('Character updated:', traits)}
          />
        )}
      </div>
    </div>
  );
};