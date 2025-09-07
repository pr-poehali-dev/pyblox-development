import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  username: string;
  displayName: string;
  coins: number;
  isAdmin: boolean;
  avatar: string;
}

interface GamePlace {
  id: string;
  name: string;
  description: string;
  creator: string;
  players: number;
  maxPlayers: number;
  image: string;
}

const PyBlox = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'places' | 'create' | 'website' | 'settings' | 'register' | 'login'>('home');
  const [language, setLanguage] = useState<'ru' | 'en' | 'ko'>('ru');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [isInGame, setIsInGame] = useState(false);
  const [currentPlace, setCurrentPlace] = useState<GamePlace | null>(null);

  const translations = {
    ru: {
      title: 'PyBlox',
      subtitle: 'Игровая платформа нового поколения',
      play: 'Играть в плейсы',
      create: 'Создать свой плейс',
      website: 'Сделать сайт',
      settings: 'Настройки',
      login: 'Войти',
      register: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердить пароль',
      coins: 'земейки',
      players: 'игроков',
      adminPanel: 'Админ панель',
      parkour: 'Паркур',
      maze: 'Лабиринт',
      joinGame: 'Войти в игру',
      backToHome: 'На главную',
      language: 'Язык',
      profile: 'Профиль',
      friends: 'Друзья',
      chat: 'Чат'
    },
    en: {
      title: 'PyBlox',
      subtitle: 'Next Generation Gaming Platform',
      play: 'Play Places',
      create: 'Create Place',
      website: 'Make Website',
      settings: 'Settings',
      login: 'Login',
      register: 'Register',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      coins: 'coins',
      players: 'players',
      adminPanel: 'Admin Panel',
      parkour: 'Parkour',
      maze: 'Maze',
      joinGame: 'Join Game',
      backToHome: 'Back to Home',
      language: 'Language',
      profile: 'Profile',
      friends: 'Friends',
      chat: 'Chat'
    },
    ko: {
      title: 'PyBlox',
      subtitle: '차세대 게이밍 플랫폼',
      play: '플레이스 플레이',
      create: '플레이스 만들기',
      website: '웹사이트 만들기',
      settings: '설정',
      login: '로그인',
      register: '회원가입',
      username: '사용자명',
      password: '비밀번호',
      confirmPassword: '비밀번호 확인',
      coins: '코인',
      players: '플레이어',
      adminPanel: '관리자 패널',
      parkour: '파쿠르',
      maze: '미로',
      joinGame: '게임 참가',
      backToHome: '홈으로',
      language: '언어',
      profile: '프로필',
      friends: '친구',
      chat: '채팅'
    }
  };

  const t = translations[language];

  const gamePlaces: GamePlace[] = [
    {
      id: '1',
      name: t.parkour,
      description: 'Преодолей все препятствия и доберись до финиша!',
      creator: 'sistemblok',
      players: 42,
      maxPlayers: 50,
      image: '/placeholder.svg'
    },
    {
      id: '2', 
      name: t.maze,
      description: 'Найди выход из запутанного лабиринта!',
      creator: 'sistemblok',
      players: 28,
      maxPlayers: 30,
      image: '/placeholder.svg'
    }
  ];

  useEffect(() => {
    const adminUser: User = {
      id: 'admin',
      username: 'sistemblok',
      displayName: 'Sistema Admin',
      coins: 999999,
      isAdmin: true,
      avatar: '🛡️'
    };
  }, []);

  const handleLogin = () => {
    if (loginForm.username === 'sistemblok' && loginForm.password === '38674128') {
      const adminUser: User = {
        id: 'admin',
        username: 'sistemblok', 
        displayName: 'Sistema Admin',
        coins: 999999,
        isAdmin: true,
        avatar: '🛡️'
      };
      setCurrentUser(adminUser);
      setActiveView('home');
    } else {
      alert('Неверные данные для входа');
    }
  };

  const handleRegister = () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    if (registerForm.username === 'sistemblok') {
      alert('Это имя пользователя зарезервировано');
      return;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username: registerForm.username,
      displayName: registerForm.username,
      coins: 100,
      isAdmin: false,
      avatar: '👤'
    };
    setCurrentUser(newUser);
    setActiveView('home');
  };

  const joinGame = (place: GamePlace) => {
    setCurrentPlace(place);
    setIsInGame(true);
  };

  const exitGame = () => {
    setIsInGame(false);
    setCurrentPlace(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gaming-green via-slate-900 to-gaming-blue flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-orbitron font-bold text-gaming-blue mb-2 animate-float">
              {t.title}
            </h1>
            <p className="text-slate-300 text-lg">{t.subtitle}</p>
          </div>

          <Tabs value={activeView === 'register' ? 'register' : 'login'} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
              <TabsTrigger 
                value="login" 
                onClick={() => setActiveView('login')}
                className="data-[state=active]:bg-gaming-blue"
              >
                {t.login}
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                onClick={() => setActiveView('register')}
                className="data-[state=active]:bg-gaming-purple"
              >
                {t.register}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <Card className="bg-slate-800/90 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-gaming-blue font-orbitron">{t.login}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="login-username">{t.username}</Label>
                    <Input
                      id="login-username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                      className="bg-slate-700 border-slate-600"
                      placeholder="sistemblok"
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">{t.password}</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="bg-slate-700 border-slate-600"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button 
                    onClick={handleLogin} 
                    className="w-full bg-gaming-blue hover:bg-gaming-blue/90 font-orbitron"
                  >
                    {t.login}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <Card className="bg-slate-800/90 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-gaming-purple font-orbitron">{t.register}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="reg-username">{t.username}</Label>
                    <Input
                      id="reg-username"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-password">{t.password}</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-confirm">{t.confirmPassword}</Label>
                    <Input
                      id="reg-confirm"
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  <Button 
                    onClick={handleRegister} 
                    className="w-full bg-gaming-purple hover:bg-gaming-purple/90 font-orbitron"
                  >
                    {t.register}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <Select value={language} onValueChange={(value: 'ru' | 'en' | 'ko') => setLanguage(value)}>
              <SelectTrigger className="w-32 mx-auto bg-slate-800/50 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="ko">🇰🇷 한국어</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  }

  if (isInGame && currentPlace) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 flex flex-col">
        <div className="bg-black/20 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-orbitron text-xl">{currentPlace.name}</h2>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {currentPlace.players}/{currentPlace.maxPlayers} {t.players}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveView('settings')}
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30"
            >
              <Icon name="Settings" size={16} />
            </Button>
            <Button
              onClick={exitGame}
              variant="destructive"
              size="sm"
            >
              {t.backToHome}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-32 h-32 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center text-6xl">
              {currentPlace.name === t.parkour ? '🏃' : '🌀'}
            </div>
            <h3 className="text-2xl font-orbitron mb-2">
              {currentPlace.name === t.parkour ? 'Паркур Арена' : 'Лабиринт Загадок'}
            </h3>
            <p className="text-white/80 mb-4">
              {currentPlace.name === t.parkour ? 
                'Используй WASD для движения, Пробел для прыжка' :
                'Найди выход из лабиринта! Используй WASD для движения'
              }
            </p>
            <div className="text-sm text-white/60">
              E - взаимодействие | TAB - показать счёт
            </div>
          </div>
        </div>

        <div className="bg-black/20 p-4">
          <div className="bg-black/40 rounded p-2 text-white text-sm">
            <div className="font-bold text-gaming-blue mb-1">[Общий чат]</div>
            <div><span className="text-yellow-400">sistemblok:</span> Добро пожаловать в {currentPlace.name}! 🎮</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gaming-green via-slate-900 to-gaming-blue">
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 
              className="text-3xl font-orbitron font-bold text-gaming-blue cursor-pointer animate-float"
              onClick={() => setActiveView('home')}
            >
              {t.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full">
              <span className="text-yellow-400 text-sm">💰</span>
              <span className="text-yellow-400 font-bold">{currentUser.coins}</span>
              <span className="text-yellow-300 text-sm">{t.coins}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gaming-blue text-white">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-white font-medium">{currentUser.displayName}</span>
              {currentUser.isAdmin && (
                <Badge className="bg-red-500 text-white text-xs">ADMIN</Badge>
              )}
            </div>

            <Select value={language} onValueChange={(value: 'ru' | 'en' | 'ko') => setLanguage(value)}>
              <SelectTrigger className="w-24 bg-slate-800/50 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="ru">🇷🇺</SelectItem>
                <SelectItem value="en">🇺🇸</SelectItem>
                <SelectItem value="ko">🇰🇷</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        {activeView === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center py-12">
              <h2 className="text-5xl font-orbitron font-bold text-white mb-4">
                {t.subtitle}
              </h2>
              <p className="text-slate-300 text-xl max-w-2xl mx-auto">
                Создавай, играй и исследуй безграничные миры вместе с друзьями
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card 
                className="bg-gradient-to-br from-gaming-blue/20 to-gaming-blue/5 border-gaming-blue/30 hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveView('places')}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">🎮</div>
                  <h3 className="text-xl font-orbitron font-bold text-gaming-blue mb-2">{t.play}</h3>
                  <p className="text-slate-400">Исследуй тысячи уникальных миров</p>
                </CardContent>
              </Card>

              <Card 
                className="bg-gradient-to-br from-gaming-purple/20 to-gaming-purple/5 border-gaming-purple/30 hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveView('create')}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">🛠️</div>
                  <h3 className="text-xl font-orbitron font-bold text-gaming-purple mb-2">{t.create}</h3>
                  <p className="text-slate-400">Построй свой собственный мир</p>
                </CardContent>
              </Card>

              <Card 
                className="bg-gradient-to-br from-gaming-orange/20 to-gaming-orange/5 border-gaming-orange/30 hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveView('website')}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">🌐</div>
                  <h3 className="text-xl font-orbitron font-bold text-gaming-orange mb-2">{t.website}</h3>
                  <p className="text-slate-400">Создай крутой сайт без кода</p>
                </CardContent>
              </Card>

              <Card 
                className="bg-gradient-to-br from-slate-500/20 to-slate-500/5 border-slate-500/30 hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveView('settings')}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">⚙️</div>
                  <h3 className="text-xl font-orbitron font-bold text-slate-300 mb-2">{t.settings}</h3>
                  <p className="text-slate-400">Настрой свой профиль</p>
                </CardContent>
              </Card>
            </div>

            {currentUser.isAdmin && (
              <Card className="bg-red-900/20 border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-red-400 font-orbitron flex items-center gap-2">
                    <Icon name="Shield" size={24} />
                    {t.adminPanel}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button variant="destructive" size="sm">
                      <Icon name="UserX" size={16} className="mr-2" />
                      Забанить игрока
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удалить плейс
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Icon name="UserCheck" size={16} className="mr-2" />
                      Управление админами
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeView === 'places' && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-orbitron font-bold text-white">Популярные плейсы</h2>
              <Button 
                onClick={() => setActiveView('home')}
                variant="outline"
                className="border-gaming-blue text-gaming-blue"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                {t.backToHome}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {gamePlaces.map((place) => (
                <Card key={place.id} className="bg-slate-800/50 border-slate-700 hover:border-gaming-blue/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-orbitron font-bold text-white mb-2">{place.name}</h3>
                        <p className="text-slate-400 mb-2">{place.description}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Icon name="User" size={14} />
                          <span>by {place.creator}</span>
                        </div>
                      </div>
                      <div className="text-6xl">
                        {place.name === t.parkour ? '🏃' : '🌀'}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="bg-gaming-blue/20 text-gaming-blue">
                        {place.players}/{place.maxPlayers} {t.players}
                      </Badge>
                      <Button 
                        onClick={() => joinGame(place)}
                        className="bg-gaming-blue hover:bg-gaming-blue/90 font-orbitron"
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        {t.joinGame}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === 'create' && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-orbitron font-bold text-white">Создание плейса</h2>
              <Button 
                onClick={() => setActiveView('home')}
                variant="outline"
                className="border-gaming-purple text-gaming-purple"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                {t.backToHome}
              </Button>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-8xl mb-6">🛠️</div>
                  <h3 className="text-2xl font-orbitron font-bold text-gaming-purple mb-4">
                    Конструктор миров
                  </h3>
                  <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                    Создавай уникальные игровые миры с помощью нашего продвинутого редактора. 
                    Размещай блоки, настраивай физику, добавляй скрипты и делись с друзьями!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gaming-purple/10 p-4 rounded-lg">
                      <Icon name="Boxes" className="w-8 h-8 text-gaming-purple mx-auto mb-2" />
                      <h4 className="text-white font-semibold mb-1">Блоки и объекты</h4>
                      <p className="text-slate-400 text-sm">Сотни различных блоков для строительства</p>
                    </div>
                    <div className="bg-gaming-blue/10 p-4 rounded-lg">
                      <Icon name="Code" className="w-8 h-8 text-gaming-blue mx-auto mb-2" />
                      <h4 className="text-white font-semibold mb-1">Скрипты</h4>
                      <p className="text-slate-400 text-sm">Добавляй логику и интерактивность</p>
                    </div>
                    <div className="bg-gaming-orange/10 p-4 rounded-lg">
                      <Icon name="Share" className="w-8 h-8 text-gaming-orange mx-auto mb-2" />
                      <h4 className="text-white font-semibold mb-1">Публикация</h4>
                      <p className="text-slate-400 text-sm">Делись своими творениями с миром</p>
                    </div>
                  </div>
                  <Button size="lg" className="bg-gaming-purple hover:bg-gaming-purple/90 font-orbitron">
                    <Icon name="Hammer" size={20} className="mr-2" />
                    Запустить редактор
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'website' && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-orbitron font-bold text-white">Создание сайта</h2>
              <Button 
                onClick={() => setActiveView('home')}
                variant="outline"
                className="border-gaming-orange text-gaming-orange"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                {t.backToHome}
              </Button>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-8xl mb-6">🌐</div>
                  <h3 className="text-2xl font-orbitron font-bold text-gaming-orange mb-4">
                    Конструктор сайтов
                  </h3>
                  <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                    Создавай потрясающие сайты без единой строчки кода! 
                    Наш ИИ поможет тебе воплотить любую идею в жизнь.
                  </p>
                  <div className="text-6xl mb-6">🚀</div>
                  <p className="text-gaming-orange font-semibold mb-4">
                    Эта функция скоро будет доступна!
                  </p>
                  <p className="text-slate-500 text-sm mb-6">
                    Следи за обновлениями в нашем сообществе
                  </p>
                  <Button 
                    variant="outline"
                    className="border-gaming-orange text-gaming-orange"
                    onClick={() => window.open('https://t.me/+QgiLIa1gFRY4Y2Iy', '_blank')}
                  >
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Присоединиться к сообществу
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-orbitron font-bold text-white">{t.settings}</h2>
              <Button 
                onClick={() => setActiveView('home')}
                variant="outline"
                className="border-slate-500 text-slate-300"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                {t.backToHome}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white font-orbitron">{t.profile}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-gaming-blue text-white text-2xl">
                        {currentUser.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-white font-bold">{currentUser.displayName}</h3>
                      <p className="text-slate-400">@{currentUser.username}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Отображаемое имя</Label>
                    <Input
                      id="display-name"
                      value={currentUser.displayName}
                      className="bg-slate-700 border-slate-600"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language-select">{t.language}</Label>
                    <Select value={language} onValueChange={(value: 'ru' | 'en' | 'ko') => setLanguage(value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                        <SelectItem value="en">🇺🇸 English</SelectItem>
                        <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white font-orbitron">Игровые настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="graphics">Качество графики</Label>
                    <Select defaultValue="high">
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                            Для слабых устройств
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            Для мощных устройств
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-700">
                    <h4 className="text-white font-semibold mb-3">Управление</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Движение:</span>
                        <span className="text-white font-mono">W A S D</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Прыжок:</span>
                        <span className="text-white font-mono">SPACE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Взаимодействие:</span>
                        <span className="text-white font-mono">E</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Лидерборд:</span>
                        <span className="text-white font-mono">TAB</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-700 space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                    >
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Респавн (сброс позиции)
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-red-500 text-red-500 hover:bg-red-500/10"
                    >
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Покинуть плейс
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PyBlox;