import { v4 as uuid } from 'uuid';
const songList: {
  [key: number | string]: any;
  id: string;
  name: string;
  singer: string;
  src: string;
}[] = [
  {
    id: uuid(),
    name: 'run it',
    singer: 'Chloe x Halle',
    src: '/songs/musics/runit.mp4',
  },
  {
    id: uuid(),
    name: 'Alone',
    singer: 'Alan Walker',
    src: '/songs/musics/Alan Walker - Alone.mp3',
  },
  {
    id: uuid(),
    name: 'Faded',
    singer: 'Alan Walker',
    src: '/songs/musics/Alan Walker - Faded.mp3',
  },
  {
    id: uuid(),
    name: 'The Spectre',
    singer: 'Alan Walker',
    src: '/songs/musics/Alan Walker - The Spectre.mp3',
  },
  {
    id: uuid(),
    name: 'Attention',
    singer: 'Charlie Puth',
    src: '/songs/musics/Charlie Puth - Attention.mp3',
  },
  {
    id: uuid(),
    name: 'Count On Me',
    singer: 'Bruno Mars',
    src: '/songs/musics/CountOnMe-BrunoMars.mp3',
  },
  {
    id: uuid(),
    name: 'Cry On My Shoulder',
    singer: 'Super Star',
    src: '/songs/musics/Cry On My Shoulder - Super Star.mp3',
  },
  {
    id: uuid(),
    name: 'Shape of You',
    singer: 'Ed Sheeran',
    src: '/songs/musics/Ed Sheeran - Shape of You.mp3',
  },
  {
    id: uuid(),
    name: 'Heal The World',
    singer: 'Michael Jackson',
    src: '/songs/musics/Michael Jackson - Heal The World.mp3',
  },
  {
    id: uuid(),
    name: 'comethru',
    singer: 'Jeremy Zucker',
    src: '/songs/musics/Jeremy Zucker - comethru.mp3',
  },
  {
    id: uuid(),
    name: 'Lemon Tree',
    singer: 'Fools Garden',
    src: '/songs/musics/Lemon Tree - Fools Garden.mp3',
  },
  {
    id: uuid(),
    name: 'Nếu em không về',
    singer: 'Song Luân',
    src: '/songs/musics/NeuEmKhongVe-SongLuan.mp3',
  },
  {
    id: uuid(),
    name: 'That Girl',
    singer: 'Olly Murs',
    src: '/songs/musics/Olly Murs - That Girl.mp3',
  },
  {
    id: uuid(),
    name: 'At My Worst',
    singer: 'Pink Sweat$',
    src: '/songs/musics/Pink Sweat$ - At My Worst.mp3',
  },
  {
    id: uuid(),
    name: 'Play Date',
    singer: 'Melanie Martinez',
    src: '/songs/musics/Play Date - Melanie Martinez.mp3',
  },
  {
    id: uuid(),
    name: 'Beautiful In White',
    singer: 'Shane Filan',
    src: '/songs/musics/Shane Filan - Beautiful In White.mp3',
  },
  {
    id: uuid(),
    name: 'My love',
    singer: 'Westlife',
    src: '/songs/musics/Westlife - My Love.mp3',
  },
  {
    id: uuid(),
    name: 'You Raise Me Up',
    singer: 'Westlife',
    src: '/songs/musics/Westlife - You Raise Me Up.mp3',
  },
  {
    id: uuid(),
    name: 'EDM TRAP QUEEN',
    singer: '',
    src: '/songs/musics/EDM TRAP QUEEN - Sáo Trúc.mp3',
  },
  {
    id: uuid(),
    name: 'Ai rồi cũng sẽ khác',
    singer: 'HÀ NHI x PHÚC TRƯỜNG',
    src: '/songs/musics/AI RỒI CŨNG SẼ KHÁC - HÀ NHI x PHÚC TRƯỜNG.mp3',
  },
];

export default songList;
