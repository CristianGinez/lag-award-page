const categories = [
  {
    id: "1",
    icon: "😂",
    title: "Mejor Emote",
    description: "El emote que ha destacado por su creatividad y popularidad.",
    image: "/img/ph-1.jpg",
    color: "from-red-600 to-red-700",
    votes: "12.5K",
    tvBackground: "/img/colbars.gif", // <-- mirá vó cris, si quieres personalizar el fondo de cada categoría solo cambia este coso jdsjsd
    nominees: [
      {
        name: "excitado",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/EMOTE_01.webp",
        description: "La expresión máxima de la emoción en el chat.",
      },
      {
        name: "lagviejardo",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/EMOTE_02.webp",
        description: "Un clásico que nunca pasa de moda.",
      },
      {
        name: "gata",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/EMOTE_03.webp",
        description: "Misterioso y elegante.",
      },
      {
        name: "uruguayotranquilo",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/EMOTE_04.webp",
        description: "La calma antes de la tormenta.",
      },
    ],
  },
  {
    id: "2",
    icon: "👥",
    title: "Participación en Discord",
    description:"El miembro de la comunidad que ha tenido la mejor participación en el servidor de Discord.",
    image: "/img/ph-1.jpg",
    color: "from-purple-600 to-purple-700",
    votes: "8.3K",
    tvBackground: "/img/colbars.gif",
    nominees: [
      {
        name: "Grox",
        creator: "Grox",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/user_03(thegrox).webp",
        description: "Sabias que en DAYZ",
      },
      {
        name: "moonlight0989",
        creator: "moonlight0989",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/user_02.webp",
        description: "El alma de la fiesta en el general.",
      },
      {
        name: "TriggerP71",
        creator: "TriggerP71",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/user_01.webp",
        description: "Aportando contenido de calidad diariamente.",
      },
      {
        name: "thekratos86",
        creator: "thekratos86",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/user_04.webp",
        description: "Moderación y buen rollo constante.",
      },
    ],
  },
  {
    id: "3",
    icon: "🎨",
    title: "ARTWORK DEL AÑO",
    description: "El artwork que ha destacado por su creatividad y calidad.",
    image: "/img/ph-1.jpg",
    color: "from-orange-600 to-orange-700",
    votes: "7.1K",
    tvBackground: "/img/colbars.gif",
    nominees: [
      {
        name: "6Tarex",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/art_6Tarex.webp",
        description: "Una pieza maestra de composición.",
      },
      {
        name: "Guidch",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/art_Guidch.webp",
        description: "Colores vibrantes y estilo único.",
      },
      {
        name: "N0cTurno",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/art_N0cTurno.webp",
        description: "Oscuro, profundo y detallado.",
      },
      {
        name: "Renlyn",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/art_Renlyn.webp",
        description: "Simplemente hermoso.",
      },
    ],
  },
  {
    id: "4",
    icon: "🎵",
    title: "Canción del Año",
    description: "La canción que ha marcado el año en la comunidad.",
    image: "/img/ph-1.jpg",
    color: "from-yellow-600 to-yellow-700",
    votes: "9.4K",
    tvBackground: "/img/colbars.gif",
    nominees: [
      {
        name: "El TLAG Español",
        creator: "Papita",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/s_Papita_-_El_TL_Espanol.webp",
        audio: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/audios/CANCION_01.mp3",
      },
      {
        name: "Largarto Progre",
        creator: "KZ",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/s_Kz_-_Lagarto_Progre.webp",
        audio: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/audios/CANCION_02.mp3",
      },
      {
        name: "El Team LAG",
        creator: "Frieza",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/s_Frieza_-_El_TeamLAG.webp",
        audio: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/audios/CANCION_03.mp3",
      },
      {
        name: "EL GAMER DEL DESTINO",
        creator: "TheKratos86",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/s_TheKratos86_-_El_Gamer_del_Destino.webp",
        audio: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/audios/EL_GAMER_DEL_DESTINO.mp3",
        description:
          "DEKRATOS86 EL GAMER DEL DESITNOOOOOOOOOOOOOOOOOOOOOOOOOOOO.",
      },
    ],
  },
  {
    id: "5",
    icon: "🎮",
    title: "LET'S  PLAY DEL AÑO",
    description: "El mejor contenido de Lets Play del año.",
    image: "/img/ph-1.jpg",
    color: "from-green-600 to-green-700",
    votes: "11.2K",
    tvBackground: "/img/colbars.gif",
    nominees: [
      {
        name: "No im not a human",
        creator: "TheNikito",
        image: "/img/lag_uconstr_placeholder.png",
        video: "https://ik.imagekit.io/tlag/nominees/Lets%20Play%203%20The%20Nikito.webm/ik-video.mp4?updatedAt=1764120526507",
        description: "Cuando el lag te sorprende en el peor momento.",
      },
      {
        name: "LOTR: BFME II: The Rise of the Witch-king",
        creator: "TheKratos86",
        image: "/img/lag_uconstr_placeholder.png",
        video: "https://ik.imagekit.io/tlag/nominees/Lets%20Play%202%20Thekratos.webm/ik-video.mp4?updatedAt=1764120528782",
        description: "La cara que pones cuando ves un bug épico.",
      },
      {
        name: "Mafia Mobile2",
        creator: "Alejo Gameplayer",
        image: "/img/lag_uconstr_placeholder.png",
        video: "https://ik.imagekit.io/tlag/nominees/Lets%20Play%204%20Alejogameplayer.webm/ik-video.mp4?updatedAt=1764120526335",
        description: "Ese momento incómodo en el stream.",
      },
      {
        name: "Left 4 Dead 2 Lima Infection",
        creator: "Johan00",
        image: "/img/lag_uconstr_placeholder.png",
        video: "https://ik.imagekit.io/tlag/nominees/Lets%20Play%201%20Johan.webm/ik-video.mp4?updatedAt=1764120526447",
        description: "Cuando tu emote favorito se vuelve viral.",
      },
    ],
  },
  {
    id: "6",
    icon: "👑",
    title: "VIEWER DEL AÑO",
    description: "El viewer que ha destacado por su apoyo y participación en el canal.",
    image: "/img/ph-1.jpg",
    color: "from-blue-600 to-blue-700",
    votes: "10.7K",
    nominees: [
      {
        name: "Viewer1",
        image: "/img/viewer1.webp",
        description: "Un viewer muy activo y participativo.",
      },
      {
        name: "Viewer2",
        image: "/img/viewer2.webp",
        description: "Siempre apoyando el canal con buenos comentarios.",
      },
    ],
  },
  {
    id: "7",
    icon: "✂️",
    title: "SHORT DEL AÑO",
    description: "El short que ha destacado por su creatividad y viralidad.",
    image: "/img/ph-1.jpg",
    color: "from-pink-600 to-pink-700",
    votes: "9.9K",
    nominees: [
      {
        name: "Mas suerte imposible",
        creator: "TheGrox",
        image: "https://ik.imagekit.io/tlag/nominados/grox_thumb.png",
        youtubeId: "AkxhEbW56s8",
        description: "Mas suerte imposible",
      },
      {
        name: "los pinchos te pinchan",
        creator: "kidfirewantslove",
        image: "https://ik.imagekit.io/tlag/nominados/kidfire_thumb.png",
        youtubeId: "ICiVdXB6QZA",
        description: "los pinchos te pinchan",
      },
      {
        name: "Conocí  al cantante de los palmeras (versión chafa)",
        creator: "LupitoxTV",
        image: "https://ik.imagekit.io/tlag/nominados/lupitox_thumb.png",
        youtubeId: "ta6XDdeHqH0",
        description: "Conocí al baterista de los palmeras",
      },
      {
        name: "el hombre que usaba sniper en cs2",
        creator: "LAG",
        image: ":https://ik.imagekit.io/tlag/nominados/lag_thumb.png",
        youtubeId: "t16YChNnYdk",
        description: "el hombre que usaba sniper en cs2",
      }
    ],
  },
  {
    id: "8",
    icon: "😱",
    title: "SUSTO DEL AÑO",
    description: "El momento más aterrador y sorprendente del año.",
    image: "/img/ph-1.jpg",
    color: "from-teal-600 to-teal-700",
    votes: "8.8K",
    nominees: [
      {
        name: "Susto1",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764126951/20251116_Successfuldifficulttroutbcwarrior-Ielx4pccwo-Iqeuj_Source_dyfvou.webm",
        description: "Un momento aterrador y sorprendente.",
      },
      {
        name: "Susto2",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764127467/Susto_2_-_Grito_Desgarrador_atpyjm.webm",
        description: "Un susto que te dejará sin aliento.",
      },
      {
        name: "Susto3",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764127888/Susto_3_-_Lag_eltgu6.webm",
        description: "Una aparición terrorífica.",
      },
      {
        name: "Susto4",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764128077/Susto_4_-_No_Tengo_Plata_rfaf7d.webm",
        description: "Un salto de miedo inesperado.",
      }
    ],
  },
  {
    id: "9",
    icon: "🤡",
    title: "TROLLEO DEL AÑO",
    description: "El trolleo más épico y memorable del año.",
    image: "/img/ph-1.jpg",
    color: "from-lime-600 to-lime-700",
    votes: "7.6K",
    nominees: [
      {
        name: "FAIL AUTITO HL2 CARRETERA 17",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764132433/Trolleo_1_-_Fail_Autito_Hl2_Carretera_17_mz8pce.webm",
        description: "Un trolleo épico y memorable.",
      },
      {
        name: "5",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764132746/Trolleo_2_-_Cinco_n3nq9g.webm",
        description: "Por el culo te la hinco eeeehehe",
      },
      {
        name: "13",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764133156/Trolleo_3_-_Trece_wkpnqu.webm",
        description: "Mientras mas me la agarras mas me crece ehehehe",
      },
      {
        name: "Salto",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764133530/Trolleo_4_-_Salto_dfcq9q.webm",
        description: "un cumpleaños...",
      },
    ],
  },
  {
    id: "10",
    icon: "⏰",
    title: "TIMING DEL AÑO",
    description: "El momento con el mejor timing del año.",
    image: "/img/ph-1.jpg",
    color: "from-amber-600 to-amber-700",
    votes: "6.4K",
    nominees: [
      {
        creator: "CristianTuVieja",
        name: "Se que esta historia acabara muy mal",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764134143/Timing_1_-_Historia_qd46iz.webm",
        description: "I hate that woman!",
      },
      {
        creator: "LAG",
        name: "Crowbars cruzados",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764134261/Timing_2_-_Sincronizacion_znholi.webm",
        description: "Un timing que dejó a todos impresionados.",
      },
      {
        creator: "LAG",
        name: "Hombro",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764134407/Timing_3_-_Hombro_p4ufkl.webm",
        description: "Un momento que no pudo haber sido mejor sincronizado.",
      },
      {
        creator: "LAG",
        name: "Dina",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764134547/Timing_4_-_Dina_ep0aud.webm",
        description: "Un timing que causó risas y asombro.",
      }
    ],
  },
  {
    id: "11",
    icon: "🏕️",
    title: "TENTADA DEL AÑO",
    description: "La tentada más épica y memorable del año.",
    image: "/img/ph-1.jpg",
    color: "from-cyan-600 to-cyan-700",
    votes: "5.2K",
    nominees: [
      {
        name: "El lore del Trigger",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764174349/Tentada_1_-_El_Lore_De_Trigger_zgbjtq.webm",
        description: "Una tentada épica y memorable.",
      },
      {
        name: "Varios usuarios de Reddit",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764174564/Tentada_2_-_Reddit_Risas_vvrd5b.webm",
        description: "Varios usuarios de Reddit.",
      },
      {
        name: "Nenas",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764174752/Tentada_3_-_Nenas_dr64gm.webm",
        description: "Tiene Nenas.",
      },
      {
        name: "No fumar",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764174837/Tentada_6_-_No_Fumar_f4fysg.webm",
        description: "Otra tentada épica y memorable.",
      },
    ],
  },
  {
    id: "12",
    icon: "🏆",
    title: "JUGADA DEL AÑO",
    description: "La jugada más impresionante y destacada del año.",
    image: "/img/ph-1.jpg",
    color: "from-gray-600 to-gray-700",
    votes: "4.0K",
    nominees: [
      {
        creator: "KZ",
        name: "CS2 Tincho Ace",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175040/Jugada_Cs2_Tincho_Ace_lwf7os.webm",
        description: "Una jugada impresionante y destacada.",
      },
      {
        creator: "TheGrox",
        name: "Dayz 2 kills",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175275/Jugada_3_-_2_Kills_bq9viw.webm",
        description: "Una jugada que dejó a todos boquiabiertos.",
      },
      {
        creator: "TheNikito",
        name: "Muerte de Gladius",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175437/Jugada_5_-_Dark_Souls_d87ley.webm",   
        description: "Una jugada que demostró habilidad y destreza.",
      },
      {
        creator: "LAG",
        name: "Granada Perfecta",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175493/Jugada_6_-_Granada_xjxzye.webm",
        description: "Una jugada que destacó por su estrategia y ejecución.",
      }
    ],
  },
  {
    id: "13",
    icon: "📸",
    title: "HEADSHOT DEL AÑO",
    description: "El headshot más épico y memorable del año.",
    image: "/img/ph-1.jpg",
    color: "from-indigo-600 to-indigo-700",
    votes: "3.5K",
    nominees: [
      {
        creator: "TheGrox",
        name: "DayZ Headshot",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175611/Jugada_1_-_Grox_d7jxnz.webm",
        description: "Uno limpio.",
      },
      {
        creator: "KidFire",
        name: "DayZ Headshot2",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175664/Jugada_2_-_Headshot_krhbxo.webm",
        description: "Corchazo",
      },
      {
        creator: "LAG",
        name: "De una",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175664/Jugada_2_-_Headshot_krhbxo.webm",
        description: "Scoutazo",
      },
      {
        creator: "LAG",
        name: "Headshot4",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175664/Jugada_2_-_Headshot_krhbxo.webm",
        description: "Un headshot que destacó por su rapidez y eficacia.",
      }
    ],
  },
  {
    id: "14",
    icon: "💥",
    title: " FAIL DEL AÑO",
    description: "El fail más divertido y memorable del año.",
    image: "/img/ph-1.jpg",
    color: "from-red-400 to-red-500",
    votes: "2.8K",
    nominees: [
      {
        name: "Fail1",
        image: "/img/fail1.webp",
        description: "Un fail divertido y memorable.",
      },
    ],
  },
  {
    id: "15",
    icon: "📹",
    title: "CLIPAZO DEL AÑO",
    description: "El clip más épico y memorable del año.",
    image: "/img/ph-1.jpg",
    color: "from-green-400 to-green-500",
    votes: "2.3K",
    nominees: [
      {
        name: "Clipazo1",
        image: "/img/clipazo1.webp",
        description: "Un clip épico y memorable.",
      },
    ],
  },
  {
    id: "16",
    icon: "🌟",
    title: "CREADOR DEL AÑO",
    description: "El creador de contenido que ha destacado por su dedicación y calidad durante el año.",
    image: "/img/ph-1.jpg",
    color: "from-yellow-400 to-yellow-500",
    votes: "1.8K",
    nominees: [
      {
        name: "TheKratos86",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/kratos.webp",
        description: "THEKRATOS86 EL GAMER DEL DESTINOO",
      },
      {
        name: "TheGrox",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/user_03(thegrox).webp",
        description: "Sabias que en DAYZ",
      },
      {
        name: "KidFire",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/kidfire.webp",
        description: "Hola si miren mis videos ",
      },
      {
        name: "GTA LOCO!!!",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/felipe.webp",
        description: "Yakuza",
      }
    ],
  },
  {
    id: "17",
    icon: "👑",
    title: "STREAMER DEL AÑO",
    description: "El streamer que ha destacado por su carisma y contenido durante el año.",
    image: "/img/ph-1.jpg",
    color: "from-blue-400 to-blue-500",
    votes: "1.2K",
    nominees: [
      {
        name: "Johan009",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/johan.webp",
        description: "El maldito Johan",
      },
      {
        name: "Kz",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/kz.webp",
        description: "El tincho KZ",
      },
      {
        name: "TheNikito",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/thenikito.webp",
        description: "El Alejo Gameplayer",
      },
      {
        name: "CristianTuVieja",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/ctv.webp",
        description: "El pe",
      }
    ],
  }
];

export default categories;
