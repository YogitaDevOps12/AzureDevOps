import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const categories = ['For you', 'Trending', 'Design', 'Technology', 'Music', 'Live', 'Travel', 'Gaming']
const videos = [
  { id: 1, title: 'The quiet art of making a great workspace', channel: 'Common Ground', views: '1.2M views', age: '3 days ago', duration: '12:48', category: 'Design', art: 'linear-gradient(135deg,#bf735f,#243f3b 66%)', avatar: 'CG', accent: '#ed6a5a' },
  { id: 2, title: 'I spent 30 days building a tiny city', channel: 'Mina Lee', views: '842K views', age: '1 week ago', duration: '18:04', category: 'Design', art: 'linear-gradient(135deg,#a8b58b,#35463c 60%)', avatar: 'ML', accent: '#8b9d77' },
  { id: 3, title: 'A field guide to the future of music', channel: 'Second Wave', views: '2.4M views', age: '2 weeks ago', duration: '24:31', category: 'Music', art: 'linear-gradient(135deg,#bda156,#352c33 65%)', avatar: 'SW', accent: '#d3a84a' },
  { id: 4, title: 'How the internet is becoming a place again', channel: 'The New Everyday', views: '310K views', age: '4 days ago', duration: '09:16', category: 'Technology', art: 'linear-gradient(135deg,#5c94a1,#1b2934 65%)', avatar: 'NE', accent: '#6e9ca8' },
  { id: 5, title: 'Cooking dinner for 100 strangers', channel: 'Table Stories', views: '623K views', age: '5 days ago', duration: '16:52', category: 'Trending', art: 'linear-gradient(135deg,#d78a58,#422f26 65%)', avatar: 'TS', accent: '#d87d55' },
  { id: 6, title: 'Tokyo at 5:17 AM', channel: 'Field Notes', views: '1.8M views', age: '3 weeks ago', duration: '21:09', category: 'Travel', art: 'linear-gradient(135deg,#ad6578,#202b3e 65%)', avatar: 'FN', accent: '#b56b7a' },
  { id: 7, title: 'The satisfying physics of a perfect game', channel: 'Play / Think', views: '492K views', age: '2 days ago', duration: '14:22', category: 'Gaming', art: 'linear-gradient(135deg,#7182ba,#262b4c 65%)', avatar: 'PT', accent: '#7182ba' },
  { id: 8, title: 'Live from the rooftop: Sunday sessions', channel: 'Nora & Friends', views: '12K watching', age: 'Live now', duration: 'LIVE', category: 'Live', art: 'linear-gradient(135deg,#be655a,#362432 65%)', avatar: 'NF', accent: '#be655a' },
]

const makeIcon = (name) => ({ size, fill, ...props }) => <span className={`icon icon-${name}`} aria-hidden="true" {...props} />
const Bell = makeIcon('bell'), Bookmark = makeIcon('bookmark'), Compass = makeIcon('compass'), History = makeIcon('history'), Home = makeIcon('home'), Menu = makeIcon('menu'), MoreHorizontal = makeIcon('more'), Play = makeIcon('play'), Search = makeIcon('search'), Settings = makeIcon('settings'), Share2 = makeIcon('share'), ThumbsUp = makeIcon('like'), TrendingUp = makeIcon('trend'), Upload = makeIcon('upload'), UserRound = makeIcon('user'), X = makeIcon('close'), Youtube = makeIcon('play')

function App() {
  const [category, setCategory] = useState('For you')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [liked, setLiked] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const shown = videos.filter((video) => {
    const inCategory = category === 'For you' || category === 'Trending' || video.category === category
    const inSearch = `${video.title} ${video.channel}`.toLowerCase().includes(search.toLowerCase())
    return inCategory && inSearch
  })
  const watch = (video) => { setSelected(video); setLiked(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className="app-shell">
    <header className="topbar">
      <button className="icon-button menu-button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button>
      <button className="brand" onClick={() => setSelected(null)}><span className="brand-mark"><Youtube size={19} fill="currentColor" /></span>pulse</button>
      <label className="search-wrap"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search videos, channels, and more" />{search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}</label>
      <button className="search-mobile" aria-label="Search"><Search size={20} /></button>
      <div className="header-actions"><button className="icon-button upload" aria-label="Upload"><Upload size={20} /></button><button className="icon-button notification" aria-label="Notifications"><Bell size={20} /><i /></button><button className="profile-avatar" aria-label="Your profile">AK</button></div>
    </header>
    <div className="layout">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <nav><p className="nav-label">Browse</p><button className="nav-item active"><Home size={18} />Home</button><button className="nav-item"><Compass size={18} />Explore</button><button className="nav-item"><TrendingUp size={18} />Trending</button><p className="nav-label spaced">Your library</p><button className="nav-item"><History size={18} />History</button><button className="nav-item"><Bookmark size={18} />Watch later</button><button className="nav-item"><ThumbsUp size={18} />Liked videos</button></nav>
        <div className="sidebar-bottom"><div className="creator-card"><span>+</span><div><b>Create something</b><small>Share your point of view</small></div></div><button className="nav-item"><Settings size={18} />Settings</button><p className="legal">About &nbsp; Press &nbsp; Terms<br />Privacy &nbsp; Help</p></div>
      </aside>
      <main className="main-content">{selected ? <Watch video={selected} liked={liked} setLiked={setLiked} subscribed={subscribed} setSubscribed={setSubscribed} back={() => setSelected(null)} /> : <><section className="welcome-row"><div><p className="eyebrow">Thursday, September 3</p><h1>Good things to watch.</h1></div><button className="following"><UserRound size={16} />Following⌄</button></section><div className="categories">{categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}</div><section className="video-grid">{shown.map((video, index) => <Card key={video.id} video={video} featured={index === 0 && category === 'For you'} onClick={() => watch(video)} />)}</section>{shown.length === 0 && <div className="empty"><Search size={28} /><h2>No videos found</h2><p>Try a different search or category.</p></div>}</>}</main>
    </div>
  </div>
}

function Card({ video, featured, onClick }) { return <article className={`video-card ${featured ? 'featured' : ''}`} onClick={onClick} tabIndex="0" onKeyDown={(event) => event.key === 'Enter' && onClick()}><div className="thumbnail" style={{ background: video.art }}><div className="shade" /><span className={video.duration === 'LIVE' ? 'duration live' : 'duration'}>{video.duration}</span><span className="play-overlay"><Play size={22} fill="currentColor" /></span></div><div className="video-meta"><span className="avatar" style={{ background: video.accent }}>{video.avatar}</span><div className="video-copy"><h2>{video.title}</h2><p>{video.channel}</p><p>{video.views} <i>•</i> {video.age}</p></div><button className="more" aria-label="More options" onClick={(event) => event.stopPropagation()}><MoreHorizontal size={19} /></button></div></article> }
function Watch({ video, liked, setLiked, subscribed, setSubscribed, back }) { return <div className="watch"><button className="back" onClick={back}>⌄ &nbsp;Back to browse</button><div className="player" style={{ background: video.art }}><div className="player-overlay"><button className="big-play"><Play size={25} fill="currentColor" /></button><div className="player-title">{video.title}</div><div className="progress"><span /></div><div className="player-controls"><Play size={17} fill="currentColor" /><span>02:18 / {video.duration}</span><em />HD <MoreHorizontal size={18} /></div></div></div><div className="watch-info"><div><p className="eyebrow">{video.category} · {video.age}</p><h1>{video.title}</h1><p className="watch-stats">{video.views} · A story from {video.channel}</p></div><div className="watch-actions"><button className={liked ? 'action selected' : 'action'} onClick={() => setLiked(!liked)}><ThumbsUp size={16} fill={liked ? 'currentColor' : 'none'} />{liked ? 'Liked' : 'Like'}</button><button className="action"><Share2 size={16} />Share</button><button className="action"><Bookmark size={16} />Save</button></div></div><div className="channel-row"><span className="avatar large" style={{ background: video.accent }}>{video.avatar}</span><div><b>{video.channel}</b><small>128K subscribers</small></div><button className={subscribed ? 'subscribe subscribed' : 'subscribe'} onClick={() => setSubscribed(!subscribed)}>{subscribed ? 'Subscribed' : 'Subscribe'}</button></div></div> }

createRoot(document.getElementById('root')).render(<App />)
