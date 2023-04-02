import { v4 as uuid } from 'uuid';
export interface beans {
  id: number;
  name: string;
  avatar: string;
  beanType: {
    name: string;
    path: string;
    description: string;
  };
  description: string;
  background: string;
  attributes: {
    id: string | number;
    name: string;
    value: string;
  }[];
  textColorBlack?: boolean;
  customClassName?: string;
}
const beansData: beans[] = [
  {
    id: 0,
    name: 'Toshi',
    avatar: '/images/bean-avatars/toshi.png',
    beanType: {
      name: 'red bean',
      path: '/images/bean-types/red.png',
      description:
        'Red BEANZ bring positive vibes to the garden. Most of them are helpful sidekicks, and even the most maverick ones are dedicated to fighting for the garden.',
    },
    description: `Toshi is a natural-born leader who loves to laugh. Easygoing and confident, he's a friend that you can always rely on, through good times and bad.`,
    background: 'bg-red-bean',
    attributes: [
      {
        id: 0,
        name: 'type',
        value: 'red bean',
      },
      {
        id: 1,
        name: 'eyes',
        value: 'dots',
      },
      {
        id: 2,
        name: 'mouth',
        value: 'smile',
      },
      {
        id: 3,
        name: 'clothing',
        value: 'IKZ HOODIE UP',
      },
      {
        id: 4,
        name: 'hand',
        value: 'ledger',
      },
      {
        id: 5,
        name: 'headgear',
        value: 'BEAN BASEBALL CAP',
      },
      {
        id: 6,
        name: 'shoe',
        value: 'BLACK HIGH TOPS',
      },
    ],
  },
  {
    id: 1,
    name: 'Gus',
    avatar: '/images/bean-avatars/gus.png',
    beanType: {
      name: 'blue bean',
      path: '/images/bean-types/blue.png',
      description: `Blue BEANZ are a menace to all. They love to troll and cause trouble whenever they can. You won't find a better partner-in-crime (or a more annoying prankster).`,
    },
    description: `Gus can't seem to stay out of trouble. If you hear an Azuki yell out in anger, most likely you'd see this little fellow scurrying away gleefully. Love him or hate him, life would simply be boring without Gus around!`,
    background: 'bg-blue-bean',
    attributes: [
      {
        id: 0,
        name: 'type',
        value: 'blue bean',
      },
      {
        id: 1,
        name: 'eyes',
        value: 'stare',
      },
      {
        id: 2,
        name: 'eyebrows',
        value: 'angry',
      },
      {
        id: 3,
        name: 'mouth',
        value: 'gus',
      },
      {
        id: 4,
        name: 'face',
        value: 'NOSTRIL - STUBBLES',
      },
      {
        id: 5,
        name: 'clothing',
        value: 'OLIVE BOMBER OVER HOODIE',
      },
      {
        id: 6,
        name: 'offhand',
        value: 'SPRAY PAINT',
      },
    ],
  },
  {
    id: 2,
    name: 'Tao',
    avatar: '/images/bean-avatars/tao.png',
    beanType: {
      name: 'lentil',
      path: '/images/bean-types/lentil.png',
      description: `Lentils are tough, skilled, and aggressive fighters. These BEANZ are trained to kick ass from the day they sprout. Better to have a lentil friend than a lentil foe`,
    },
    description: `Tao has a short fuse, and it doesn't take much to anger her. Her brothers and sister are all fighters, meaning that family reunions can become all-out brawls! With her warrior instincts and sharp blade, you'd be wise not to cross her.`,
    background: 'bg-lentil',
    attributes: [
      {
        id: 0,
        name: 'type',
        value: 'lentil',
      },
      {
        id: 1,
        name: 'eyes',
        value: 'HALF-OPEN',
      },
      {
        id: 2,
        name: 'eyebrows',
        value: 'DETERMINED',
      },
      {
        id: 3,
        name: 'mouth',
        value: 'uwu',
      },
      {
        id: 4,
        name: 'clothing',
        value: 'GREEN YUKATA',
      },
      {
        id: 5,
        name: 'headgear',
        value: 'POINTY STRAW HAT',
      },
    ],
  },
  {
    id: 3,
    name: 'link',
    avatar: '/images/bean-avatars/link.png',
    beanType: {
      name: 'black',
      path: '/images/bean-types/black.png',
      description: `Black BEANZ are intelligent and curious by nature. These BEANZ never stop learning and always have something insightful to share.`,
    },
    description: `Link is very intellectually curious and can often be found tapping away on her laptop. Highly analytical, she has a keen eye for detail and a near photographic memory.`,
    background: 'bg-black-bean',
    attributes: [
      {
        id: 0,
        name: 'type',
        value: 'black bean',
      },
      {
        id: 1,
        name: 'eyes',
        value: 'dots',
      },
      {
        id: 2,
        name: 'face',
        value: 'BIG GLASSES',
      },
      {
        id: 3,
        name: 'headgear',
        value: 'beanie',
      },
    ],
  },
  {
    id: 4,
    name: 'johnny g.',
    avatar: '/images/bean-avatars/johnny.png',
    beanType: {
      name: 'coffee',
      path: '/images/bean-types/coffee.png',
      description: `Coffee BEANZ are the life of the party. They never seem to get tired and are always up for a good time.`,
    },
    description: `Johnny Grind is full of chaotic energy. Always with a cup of coffee in hand, he tends to drive the other BEANZ a little crazy. He means well, but the other BEANZ sometimes wish he'd take it down a notch (or five).`,
    background: 'bg-coffee',
    attributes: [
      {
        id: 0,
        name: 'type',
        value: 'coffee bean',
      },
      {
        id: 1,
        name: 'eyes',
        value: 'SLEEP-DEPRIVED',
      },
      { id: 2, name: 'eyebrows', value: 'BUSHY' },
      {
        id: 3,
        name: 'mouth',
        value: 'WIDE TOOTHY SMILE',
      },
      {
        id: 4,
        name: 'clothing',
        value: 'WHITE BUSINESS ATTIRE',
      },
      {
        id: 5,
        name: 'offhand',
        value: 'COFFEE CUP',
      },
    ],
  },
  {
    id: 5,
    name: 'penny',
    avatar: '/images/bean-avatars/penny.png',
    beanType: {
      name: 'pinto',
      path: '/images/bean-types/pinto.png',
      description: `Pinto BEANZ are wacky oddballs. They have truly eccentric personalities and aren't afraid to be a little different .`,
    },
    description: `Penny is... unique. She doesn't need others for entertainment, she does just fine entertaining herself. She runs about muttering and squeaking randomly. No one is sure what goes through Penny's mind, but she seems happy.`,
    background: 'bg-pinto',
    textColorBlack: true,
    customClassName: 'rotate-2',
    attributes: [
      {
        id: 0,
        name: 'type',
        value: 'pinto bean',
      },
      { id: 1, name: 'mouth', value: ':O' },
      {
        id: 2,
        name: 'eyes',
        value: 'stare',
      },
      {
        id: 3,
        name: 'clothing',
        value: 'YELLOW SCRUNCHED HOODIE',
      },
      {
        id: 4,
        name: 'hand',
        value: 'sake',
      },
    ],
  },
  {
    id: 6,
    name: 'ash',
    avatar: '/images/bean-avatars/ash.png',
    beanType: {
      name: 'purple',
      path: '/images/bean-types/purple.png',
      description: `Purple BEANZ are max chill. They are the only BEANZ that can get red and blue BEANZ to get along. Perfect companion for a chill hang.`,
    },
    description: `Ash is the most relaxed bean in the garden. Nothing seems to faze him and he's always calm in times of chaos. Others tend to envy his chill demeanor and find themselves drawn to his cool vibes.`,
    background: 'bg-purple-bean',
    attributes: [
      {
        id: 0,
        name: 'type',
        value: 'AYOCOTE MORADO BEAN',
      },
      {
        id: 1,
        name: 'eyes',
        value: 'side eye',
      },
      {
        id: 2,
        name: 'eyebrows',
        value: 'CONCERNED',
      },
      {
        id: 3,
        name: 'mouth',
        value: 'serious',
      },
      {
        id: 4,
        name: 'clothing',
        value: 'WHITE NORAGI',
      },
      {
        id: 5,
        name: 'offhand',
        value: 'fan',
      },
      {
        id: 6,
        name: 'headgear',
        value: 'White Bucket Hat',
      },
    ],
  },
  {
    id: 7,
    name: 'pip',
    avatar: '/images/bean-avatars/pip.png',
    beanType: {
      name: 'blackeye',
      path: '/images/bean-types/blackeye.png',
      description: `Black eyed peas are mostly quiet and introverted. Even when they don't say much, they speak volumes.`,
    },
    description: `Pip is the happiest when she's by herself. She enjoys solitude yet still likes to hang out with a close-knit group of friends from time to time. Pip is a bean of few words, but when she speaks, she's full of wisdom.`,
    background: 'bg-blackeye',
    textColorBlack: true,
    attributes: [
      {
        id: uuid(),
        name: 'type',
        value: 'black eye bean',
      },
      {
        id: uuid(),
        name: 'eyes',
        value: 'closed',
      },
      {
        id: uuid(),
        name: 'mouth',
        value: 'smile',
      },
      {
        id: uuid(),
        name: 'clothing',
        value: 'OVERSIZED BLUE T-SHIRT WITH WHITE CROSS-BODY BAG',
      },
      {
        id: uuid(),
        name: 'headgear',
        value: 'CAT HEADPHONES',
      },
    ],
  },
  {
    id: 8,
    name: 'ed',
    avatar: '/images/bean-avatars/ed.png',
    beanType: {
      name: 'edamame',
      path: '/images/bean-types/edamame.png',
      description: `Edamame BEANZ love to work out! They are great workout buddies, personal trainers, and endurance athletes.`,
    },
    description: `Ed never skips leg day. He's the happiest when working out with other edamame beefcakes at the gym, ripping sets, and getting shredded. If there's a mirror around, you bet Ed is going to check out his guns because he works hard for that bean bod!`,
    background: 'bg-edamame',
    attributes: [
      {
        id: uuid(),
        name: 'type',
        value: 'edamame',
      },
      {
        id: uuid(),
        name: 'eyes',
        value: 'stare',
      },
      {
        id: uuid(),
        name: 'eyebrows',
        value: 'determine',
      },
      {
        id: uuid(),
        name: 'mouth',
        value: ':C',
      },
      {
        id: uuid(),
        name: 'clothing',
        value: 'BLACK TANK TOP',
      },
      {
        id: uuid(),
        name: 'hand',
        value: 'dumbbell',
      },
      {
        id: uuid(),
        name: 'offhand',
        value: 'dumbbell',
      },
      {
        id: uuid(),
        name: 'headgear',
        value: 'SWEATBAND',
      },
      {
        id: uuid(),
        name: 'shoe',
        value: 'YELLOW KICKS',
      },
    ],
  },
  {
    id: 9,
    name: 'frida',
    avatar: '/images/bean-avatars/frida.png',
    beanType: {
      name: 'tutti',
      path: '/images/bean-types/tutti.png',
      description: `For a creative few, the world is their canvas. Jelly BEANZ are often creatives, artists, writers, and musicians.`,
    },
    description: `Frida is a creative force who finds inspiration in the most unlikely places. Although drawing is her first love, she also has a musical side. Her art brims with color, joy, and life - just like Frida herself!`,
    background: 'bg-tutti',
    textColorBlack: true,
    attributes: [
      {
        id: uuid(),
        name: 'type',
        value: 'jelly bean',
      },
      {
        id: uuid(),
        name: 'eyes',
        value: 'lashes',
      },
      {
        id: uuid(),
        name: 'eyebrows',
        value: 'Surprised',
      },
      {
        id: uuid(),
        name: 'mouth',
        value: 'smile',
      },
      {
        id: uuid(),
        name: 'clothing',
        value: 'Jacket and Rainbow Scarf',
      },
      {
        id: uuid(),
        name: 'offhand',
        value: 'pencil',
      },
    ],
  },
  {
    id: 10,
    name: 'sun',
    avatar: '/images/bean-avatars/sun.png',
    beanType: {
      name: 'gold',
      path: '/images/bean-types/gold.png',
      description: `Gold BEANZ are shiny warrior guardians, rarely spotted amidst the lush foliage of the garden.`,
    },
    description: `Legends tell of a tiny gold warrior with impressive fighting abilities. Even though he loves the spotlight, he is a fiercely loyal companion who will always have your back.`,
    background: 'bg-gold',
    attributes: [
      {
        id: uuid(),
        name: 'type',
        value: 'gold',
      },
      {
        id: uuid(),
        name: 'eyes',
        value: 'dots',
      },
      {
        id: uuid(),
        name: 'eyebrows',
        value: 'angry',
      },
      {
        id: uuid(),
        name: 'headgear',
        value: 'Monkey King Crown',
      },
      {
        id: uuid(),
        name: 'clothing',
        value: 'Monkey King Vest',
      },
      {
        id: uuid(),
        name: 'offhand',
        value: 'Monkey King Staff',
      },
    ],
  },
  {
    id: 11,
    name: 'kami',
    avatar: '/images/bean-avatars/kami.png',
    beanType: {
      name: 'spirit',
      path: '/images/bean-types/spirit.png',
      description: `We don't know much about them… but looks rare.`,
    },
    description: `???`,
    background: 'bg-spirit',
    textColorBlack: true,
    attributes: [
      {
        id: uuid(),
        name: 'type',
        value: 'spirit',
      },
      {
        id: uuid(),
        name: 'eyes',
        value: 'Spirit - Determined',
      },
      {
        id: uuid(),
        name: 'clothing',
        value: 'kami',
      },
    ],
  },
];

export default beansData;
