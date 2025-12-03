const categories = [
  {
    id: "1",
    icon: "😂",
    title: "Mejor Emote",
    description: "El emote que ha destacado por su creatividad y popularidad.",
    image: "/img/ph-1.jpg",
    color: "from-red-600 to-red-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764183196/emoteloop_xg111m.gif", // <-- mirá vó cris, si quieres personalizar el fondo de cada categoría solo cambia este coso jdsjsd
    nominees: [
      {
        name: "excitado",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/EMOTE_01.webp",
        description: "La expresión máxima de la emoción en el chat.",
      },
      {
        name: "lagviejardo",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/EMOTE_02.webp",
        description: "Un clásico que determina cuando alguien está gagá.",
      },
      {
        name: "gata",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/EMOTE_03.webp",
        description: "La definición de euforia o diversión definitiva. ",
      },
      {
        name: "uruguayotranquilo",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/EMOTE_04.webp",
        description: "La consecuencia de tus peores actos.",
      },
    ],
  },
  {
    id: "2",
    icon: "👥",
    title: "Participación en Discord",
    description:"Honrada distinción al miembro de la comunidad que ha tenido el afán de participar activamente en el servidor.",
    image: "/img/ph-1.jpg",
    color: "from-purple-600 to-purple-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764183705/cate-discord_qsflbk.gif",
    nominees: [
      {
        name: "Grox",
        creator: "Grox",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/user_03(thegrox).webp",
        description: "Sabias que en DAYZ…",
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
    description: "Porque en esta comunidad, el arte corre por sus venas. He aquí lo más destacado por su creatividad y calidad.",
    image: "/img/ph-1.jpg",
    color: "from-orange-600 to-orange-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764185578/cate-artwork_qq75dh.gif",
    nominees: [
      {
        name: "6Tarex",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/art_6Tarex.webp",
        description: "Una pieza enigmática, nos muestra a una jóven que se esconde de algo pero ¿De qué?..",
      },
      {
        name: "Guidch",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/art_Guidch.webp",
        description: "Con colores vibrantes él llegó para salvarnos ¿Verdad?. ",
      },
      {
        name: "N0cTurno",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/art_N0cTurno.webp",
        description: "Sombrío pero feliz, intranquilidad pero reconfortante.",
      },
      {
        name: "Renlyn",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/art_Renlyn.webp",
        description: "La expresión que lo dice todo.",
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
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764185833/cate_soty_mpqjlh.gif",
    nominees: [
      {
        name: "El TLAG Español",
        creator: "Papita",
        description: "Un disparo con ritmo para mover el esqueleto.",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/s_Papita_-_El_TL_Espanol.webp",
        audio: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/audios/CANCION_01.mp3",
      },
      {
        name: "Largarto Progre",
        creator: "KZ",
        description: "El tema que fue top 1 en la mayoría de streams.",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/s_Kz_-_Lagarto_Progre.webp",
        audio: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/audios/CANCION_02.mp3",
      },
      {
        name: "El Team LAG",
        creator: "Frieza",
        description: "La prueba del ¿Por qué? Seguiremos siempre siendo una familia.",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/s_Frieza_-_El_TeamLAG.webp",
        audio: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/audios/CANCION_03.mp3",
      },
      {
        name: "EL GAMER DEL DESTINO",
        creator: "TheKratos86",
        description:"THEKRATOS86 EL GAMER DEL DESITNOOOOOOOOOOOOOOOOOOOOOOOOOOOO.",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/s_TheKratos86_-_El_Gamer_del_Destino.webp",
        audio: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/audios/EL_GAMER_DEL_DESTINO.mp3",
        
      },
    ],
  },
  {
    id: "5",
    icon: "🎮",
    title: "LET'S  PLAY DEL AÑO",
    description: "Estas series nos acompañaron durante el año.",
    image: "/img/ph-1.jpg",
    color: "from-green-600 to-green-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764187194/cate_Letplay_ngzf5e.gif",
    nominees: [
      {
        name: "No im not a human",
        creator: "TheNikito",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764131233/Lets_Play_3_The_Nikito_uiluci.webm",
        description: "¿Quién no recuerda las noches donde Nikito le abría las puertas al Uruguayo?",
      },
      {
        name: "LOTR: BFME II: The Rise of the Witch-king",
        creator: "TheKratos86",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764130877/Lets_Play_2_Thekratos_xk2lk6.webm",
        description: "Una serie como nos tiene acostumbrada su creador.",
      },
      {
        name: "Mafia Mobile2",
        creator: "Alejo Gameplayer",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764678176/Lets_Play_4_Alejogameplayer_ed4pvt.webm",
        description: "Una revolución que nos replantea el “Como se deben hacer las series hoy en día”",
      },
      {
        name: "Left 4 Dead 2 Lima Infection",
        creator: "Johan00",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764678111/Lets_Play_1_Johan_jzn9u3.webm",
        description: "El humor y desesperación se apoderan de El JOHAAAAN.",
      },
    ],
  },
  {
    id: "6",
    icon: "👑",
    title: "VIEWER DEL AÑO",
    description: "Ese viewer que nos ha dado su apoyo en cada stream, en cada video, haciéndonos sentir acompañados.",
    image: "/img/ph-1.jpg",
    color: "from-blue-600 to-blue-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764195170/cate_viewe_xbw2fk.gif",
    nominees: [
      {
        name: "Josu Wagner",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/Josuwagner.webp",
        description: "Había una vez un gato atigrado. El gato murió un millón de veces y renació otro millón de veces, tuvo varios dueños pero no quería a ninguno. El gato no le temía a la muerte. Un día el gato fue liberado, era un gato callejero. Él conoció a una gata y los dos gatos vivieron felices juntos. Los años pasaron y la gata se murió de vieja. El gato lloró un millón de veces y después murió. No volvió a revivir.",
      },
      {
        name: "Moonlight",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/Moonlight.webp",
        description: "¿Lo viste? Siempre con comentarios críticos y graciosos.",
      },
      {
        name: "TriggerP71",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/user_01.webp",
        description: "Está en todas, sin TriggerP71 no hay stream ¿O era P72…? ",
      },
      {
        name: "50 CENTAVOS",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/50%20CENTAVOS.webp",
        description: "Le puede parecer malo lo que hacemos pero se queda igual.",
      }
    ],
  },
  {
    id: "7",
    icon: "✂️",
    title: "SHORT DEL AÑO",
    description: "Este formato llegó para quedarse.",
    image: "/img/ph-1.jpg",
    color: "from-pink-600 to-pink-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764195778/cate_short_o44yyg.gif",
    nominees: [
      {
        name: "Mas suerte imposible",
        creator: "TheGrox",
        youtubeId: "AkxhEbW56s8",
        description: "No le confíes tu vida a este sujeto.",
      },
      {
        name: "los pinchos te pinchan",
        creator: "kidfirewantslove",
        youtubeId: "ICiVdXB6QZA",
        description: "No seas bambi y aprendé a jugar DayZ",
      },
      {
        name: "Conocí  al cantante de los palmeras (versión chafa)",
        creator: "LupitoxTV",
        youtubeId: "ta6XDdeHqH0",
        description: "Una charla insostenible, nadie escucha al otro.",
      },
      {
        name: "el hombre que usaba sniper en cs2",
        creator: "LAG",
        youtubeId: "t16YChNnYdk",
        description: "Súbanse al carro que el lagarto los lleva.",
      }
    ],
  },
  {
    id: "8",
    icon: "😱",
    title: "SUSTO DEL AÑO",
    description: "A veces jugar videojuegos de terror genera risas para algunos pero sustos para otros.",
    image: "/img/ph-1.jpg",
    color: "from-teal-600 to-teal-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764196066/cate_susto_qvklka.gif",
    nominees: [
      {
        name: "Lo que vas a ver a continuación",
        creator: "Moonlight",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764126951/20251116_Successfuldifficulttroutbcwarrior-Ielx4pccwo-Iqeuj_Source_dyfvou.webm",
        description: "Cuando el susto no viene precisamente de un enemigo.",
      },
      {
        name: "Entidad Desconocida",
        creator: "LAG",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764776867/Entidad_Desconocida_ndcwbk.webm",
        description: "Capaz estaba ganando",
      },
      {
        name: "Ojos blancos",
        creator: "LAG",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764127888/Susto_3_-_Lag_eltgu6.webm",
        description: "Si sentís que te observan es porque te están observando.",
      },
      {
        name: "No tengo plata",
        creator: "TheNikito",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764128077/Susto_4_-_No_Tengo_Plata_rfaf7d.webm",
        description: "No es un buen momento para asomar el bochín.",
      }
    ],
  },
  {
    id: "9",
    icon: "🤡",
    title: "TROLLEO DEL AÑO",
    description: "Jugar con amigos a veces significa sacrificarlo para reírte de él.",
    image: "/img/ph-1.jpg",
    color: "from-lime-600 to-lime-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764196062/cate_troll_igbzte.gif",
    nominees: [
      {
        name: "Se terminó Carretera 17",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764132433/Trolleo_1_-_Fail_Autito_Hl2_Carretera_17_mz8pce.webm",
        description: "Cuando todo parecía ir “encaminado” pasaron cosas.",
      },
      {
        name: "¿Qué procesador Nikito?",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764132746/Trolleo_2_-_Cinco_n3nq9g.webm",
        description: "El chiste del número 5, nunca falla.",
      },
      {
        name: "13",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764133156/Trolleo_3_-_Trece_wkpnqu.webm",
        description: "Pensá dos veces antes de decir un número.",
      },
      {
        name: "Salto doble",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764133530/Trolleo_4_-_Salto_dfcq9q.webm",
        description: "Cuando GTALoco pensó que se salía con la suya.",
      },
    ],
  },
  {
    id: "10",
    icon: "⏰",
    title: "TIMING DEL AÑO",
    description: "Un momento, un segundo, una conexión.",
    image: "/img/ph-1.jpg",
    color: "from-amber-600 to-amber-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764196066/cate_timing_pqy2kx.gif",
    nominees: [
      {
        creator: "CristianTuVieja",
        name: "Se que esta historia acabara muy mal",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764134143/Timing_1_-_Historia_qd46iz.webm",
        description: "Ya lo decía la canción.",
      },
      {
        creator: "GTALoco & LAG",
        name: "Crowbars cruzados",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764134261/Timing_2_-_Sincronizacion_znholi.webm",
        description: "Conexión mental o semental.",
      },
      {
        creator: "LAG",
        name: "Hombro",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764134407/Timing_3_-_Hombro_p4ufkl.webm",
        description: "Mimetizado con el personaje.",
      },
      {
        creator: "LAG",
        name: "Dina",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764134547/Timing_4_-_Dina_ep0aud.webm",
        description: "Cuando escucha la orden que le das..",
      }
    ],
  },
  {
    id: "11",
    icon: "🏕️",
    title: "TENTADA DEL AÑO",
    description: "Durante todo el año nos reímos como nunca, aquí están los momentos más destacados.",
    image: "/img/ph-1.jpg",
    color: "from-cyan-600 to-cyan-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764195778/cate_tentada_mszv3h.gif",
    nominees: [
      {
        name: "El lore del Trigger",
        creator: "KZ, GTALoco, Dy y Nikito",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764174349/Tentada_1_-_El_Lore_De_Trigger_zgbjtq.webm",
        description: "Un trasfondo oscuro y penumbroso.",
      },
      {
        name: "Varios usuarios de Reddit",
        creator: "Moonlight, LAG y KZ",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764174564/Tentada_2_-_Reddit_Risas_vvrd5b.webm",
        description: "Cuando la imitación se va de las manos.",
      },
      {
        name: "Nenas",
        creator: "Dy, Nikito y LAG",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764174752/Tentada_3_-_Nenas_dr64gm.webm",
        description: "Que raro ese sponsor.",
      },
      {
        name: "No fumar",
        creator: "GTALoco y LAG",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764174837/Tentada_6_-_No_Fumar_f4fysg.webm",
        description: "Por algo estaba el cartel ahí.",
      },
    ],
  },
  {
    id: "12",
    icon: "🏆",
    title: "JUGADA DEL AÑO",
    description: "Muchas veces jugamos mal, otras no tanto. Aquí están las mejores jugadas del año.",
    image: "/img/ph-1.jpg",
    color: "from-gray-600 to-gray-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764194650/cate_jugada_jhw6zi.gif",
    nominees: [
      {
        creator: "KZ",
        name: "CS2 Tincho Ace",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175040/Jugada_Cs2_Tincho_Ace_lwf7os.webm",
        description: "La importancia de que al menos uno esté concentrado.",
      },
      {
        creator: "TheGrox",
        name: "Dayz 2 kills",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175275/Jugada_3_-_2_Kills_bq9viw.webm",
        description: "La cobertura es importante.",
      },
      {
        creator: "TheNikito, GTALoco y Dy",
        name: "Muerte de Gladius",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175437/Jugada_5_-_Dark_Souls_d87ley.webm",   
        description: "El trio verdura esta vez pudo con el enemigo.",
      },
      {
        creator: "LAG",
        name: "Granada Perfecta",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175493/Jugada_6_-_Granada_xjxzye.webm",
        description: "Cálculo y precisión.",
      }
    ],
  },
  {
    id: "13",
    icon: "📸",
    title: "HEADSHOT DEL AÑO",
    description: "Las kills se disfrutan más cuando la acompaña un buen HEADSHOT.",
    image: "/img/ph-1.jpg",
    color: "from-indigo-600 to-indigo-700",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764194645/cate_failanio_xnpyva.gif",
    nominees: [
      {
        creator: "TheGrox",
        name: "DayZ Headshot",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175611/Jugada_1_-_Grox_d7jxnz.webm",
        description: "Sutil pero preciso.",
      },
      {
        creator: "KidFire",
        name: "DayZ Headshot 2",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175664/Jugada_2_-_Headshot_krhbxo.webm",
        description: "Descomunal auditivamente",
      },
      {
        creator: "LAG",
        name: "De una",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175738/Jugada_4_-_2_De_Una_jtapy2.webm",
        description: "2x1 en Mercado",
      },
      {
        creator: "LAG",
        name: "Si me sale me sale",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764175817/Jugada_7_-_Si_Me_Sale_Me_Sale_uohcdt.webm",
        description: "¿Talento o casualidad?.",
      }
    ],
  },
  {
    id: "14",
    icon: "💥",
    title: " FAIL DEL AÑO",
    description: "Aunque no lo parezca, nosotros también nos equivocamos… y esa es la gracia.",
    image: "/img/ph-1.jpg",
    color: "from-red-400 to-red-500",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764194660/cate_fail_n11ddl.gif",
    nominees: [
      {
        creator: "CristianTuVieja",
        name: "Carretera al vacío",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764277665/faill-cristian_rrmjab.webm",
        description: "Hay que saber frenar.",
      },
      {
        creator: "GTA LOCO",
        name: "Las verdaderas HitBOX",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764266292/fail-Gtaloco_kgnz2z.webm",
        description: "Cuando una caja se convierte en enemigo.",
      },
      {
        creator: "TheNikito",
        name: "Ninja defuse",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764266182/fail-Nikito_lelkvv.webm",
        description: "No hay que confiarse con el humo.",
      },
      {
        creator: "KZ",
        name: "Tincho agarra-cabezas",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764265909/fail-Tincho_t3htvy.webm",
        description: "Nunca agarres una cabeza del suelo.",
      }
    ],
  },
  {
    id: "15",
    icon: "📹",
    title: "CLIPAZO DEL AÑO",
    description: "Durante todo el año nos reímos como nunca, aquí están los momentos más destacados.",
    image: "/img/ph-1.jpg",
    color: "from-green-400 to-green-500",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764194786/cate_ciplazo_q30ywg.gif",
    nominees: [
      {
        creator: "TheKratos86",
        name: "Viejo de m*erda",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764275757/clip-Thekratos_jbs0si.webm",
        description: "Nunca subestimes a un ciego.",
      },
      {
        creator: "KidFire",
        name: "Martillazo en la nuca",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764275765/clip-Kidfire_zdp437.webm",
        description: "El poder del martillo.",
      },
      {
        creator: "TheNikito",
        name: "Confiá en el proceso",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764275817/clip-Thenikito_ds9ai6.webm",
        description: "Si tus compañeros de viaje te dicen que confíes, vos confiá.",
      },
      {
        creator: "GTA LOCO",
        name: "Está bueno igual",
        video: "https://res.cloudinary.com/dkjaq3i9p/video/upload/v1764276016/clip-Gtaloco_zjopy5.webm",
        description: "El comentario más normal de GTALoco.",
      }
    ],
  },
  {
    id: "16",
    icon: "🌟",
    title: "CREADOR DEL AÑO",
    description: "Ellos dedican sus horas a la edición, hacen correcciones interminables y perfeccionan lo ya perfecto. Un aplauso a estos creadores.",
    image: "/img/ph-1.jpg",
    color: "from-yellow-400 to-yellow-500",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764194782/cate_creador_j8mlkr.gif",
    nominees: [
      {
        name: "TheKratos86",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/kratos.webp",
        description: "THEKRATOS86 EL GAMER DEL DESTINOO",
      },
      {
        name: "TheGrox",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/user_03(thegrox).webp",
        description: "¿Sabías que en Day Z?",
      },
      {
        name: "KidFire",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/kidfire.webp",
        description: "Años atrás fue promesa, hoy está entre los mejores.",
      },
      {
        name: "GTA LOCO!!!",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/felipe.webp",
        description: "Y ya sabés… es él.",
      }
    ],
  },
  {
    id: "17",
    icon: "👑",
    title: "STREAMER DEL AÑO",
    description: "Sus streams y dedicación nos acompañaron gran parte del este año. Un aplauso a nuestros mejores streamers.",
    image: "/img/ph-1.jpg",
    color: "from-blue-400 to-blue-500",
    tvBackground: "https://res.cloudinary.com/dkjaq3i9p/image/upload/v1764194790/cate_streamer_sokvre.gif",
    nominees: [
      {
        name: "Johan009",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/johan.webp",
        description: "Con un particular acento y buenos gameplays",
      },
      {
        name: "Kz",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/kz.webp",
        description: "El streamer que más varía en su contenido",
      },
      {
        name: "TheNikito",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/thenikito.webp",
        description: "Puede prender a las 2pm o a las 4am, siempre sorprende",
      },
      {
        name: "CristianTuVieja",
        image: "https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/ctv.webp",
        description: "Constante y dedicado pero con contenido de calidad",
      }
    ],
  }
];

export default categories;
