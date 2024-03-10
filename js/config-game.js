//LOCATION
const zoneRadius = 1000000;
const START_POINT = {
    lat: 49.0030723,
    lng: 12.0952392
};

//CLOTHING
const hats = ['images/none.png', 'images/cap.png', 'images/hat.png', 'images/beanie.png', ]; // Paths to hat images
const glasses = ['images/none.png', 'images/sunglasses.png', 'images/glasses.png', 'images/skiglasses.png']; //More Images
const beards = ['images/none.png', 'images/moustache.png', 'images/goatee.png', 'images/necklace.png']; //More Images
const clothes = ['images/none.png', 'images/overall.png', 'images/skirt.png', 'images/shorts.png']; // Paths to clothes images

//ENTITIES
const entities = {
    alien: {
        name: 'Alien',
        img: "images/alien.png"
    },
    armadillo: {
        name: 'Gürteltier Günther',
        img: "images/armadillo.png"
    },
    eel: {
        name: 'Aal Aalfred',
        img: "images/eel.png"
    },
    owl: {
        name: 'Eule Eugenia',
        img: "images/owl.png"
    },
    mole: {
        name: 'Maulwurf Mara',
        img: "images/mole.png"
    },
    sloth: {
        name: 'Faultier Fred',
        img: "images/sloth.png"
    },
    raven: {
        name: 'Rabe Raban',
        img: "images/raven.png",
        img_crystal: "images/ravencrystal.png"
    },
    ufo: {
        name: 'UFO',
        img: "images/ufo.png",
        img_smoke: "images/ufo_smoke.png"
    },
    wheel: {
        name: "Rad",
        img: "images/wheel.png"
    },
    accu: {
        name: "Akku",
        img: "images/accu.png"
    },
    headlight: {
        name: "Scheinwerfer",
        img: "images/headlight.png"
    },
    steeringwheel: {
        name: "Lenkrad",
        img: "images/steeringwheel.png"
    },
    navigation: {
        name: "Navigationsgerät",
        img: "images/navigation.png"
    },
    turbine: {
        name: "Antrieb",
        img: "images/turbine.png"
    },
    corn: {
        name: "Mais",
        img: "images/corn.png"
    },
    football: {
        name: "Fußball",
        img: "images/football.png"
    },
    basketball: {
        name: "Basketball",
        img: "images/basketball.png"
    },
    volleyball: {
        name: "Volleyball",
        img: "images/volleyball.png"
    },
    bowlingball: {
        name: "Bowlingkugel",
        img: "images/bowlingball.png"
    },
    melon: {
        name: "Melone",
        img: "images/melon.png"
    },
    crystalball: {
        name: "Kristallkugel",
        img: "images/crystalball.png"
    },
    sun: {
        name: "Die Sonne",
        img: "images/sun.png",
        description: "Diese Karte ist der Jackpot im Tarot. Die Sonne verheißt pure echte Lebensfreude, Zuversicht und Glück. Jetzt kann nichts mehr schiefgehen."
    },
    moon: {
        name: "Der Mond",
        img: "images/moon.png",
        description: "Oh oh! Geheimnisse! Der Mond steht für etwas Verborgenes oder Unterdrücktes. Nicht alles ist so, wie es scheint."
    },
    star: {
        name: "Der Stern",
        img: "images/star.png",
        description: "Inspiration pur! Welchen Wunsch würden Sie sich gerne erfüllen? Auf einmal ergeben sich positive Möglichkeiten. Der Stern verbreitet Hoffnung und kann Ihnen die ein oder andere Erleuchtung bescheren."
    },
    fortune: {
        name: "Das Rad des Schicksals",
        img: "images/fortune.png",
        description: "Ein Kreis schließt sich. Das Rad des Schicksals bringt Vergangenheit und Zukunft in den Einklang. Glückliche Fügungen bahnen sich an."
    },
};

const parts = {
    wheel: {
        name: "Räder",
        img: "images/wheel.png"
    },
    accu: {
        name: "Akku",
        img: "images/accu.png"
    },
    headlight: {
        name: "Scheinwerfer",
        img: "images/headlight.png"
    },
    steeringwheel: {
        name: "Lenkrad",
        img: "images/steeringwheel.png"
    },
    navigation: {
        name: "Navigationsgerät",
        img: "images/navigation.png"
    },
    turbine: {
        name: "Antrieb",
        img: "images/turbine.png"
    }
};


//MARKER DATA
const markersData = [{
        id: "1",
        preScan: {
            speaker: entities.alien.name,
            text: "Kannst du mir helfen?"
        },
        postScan: {
            speaker: entities.alien.name,
            text: "Danke! Komme zurück, wenn du genug Teile gesammelt hast!"
        },
        completed: {
            speaker: entities.alien.name,
            text: "Du hast die Teile gefunden?"
        },
        photo: {
            speaker: entities.alien.name,
            text: "Lass uns noch ein Abschiedsfoto machen!"
        },
    },
    {
        id: "2",
        preScan: {
            speaker: entities.armadillo.name,
            text: "Hast du dich verlaufen?",
            button: "Gespräch starten"
        },
        postScan: {
            speaker: entities.armadillo.name,
            text: "Ich hoffe, ich konnte dir helfen!"
        }
    },
    {
        id: "3",
        preScan: {
            speaker: entities.eel.name,
            text: "Bzzz...was gibts?"
        },
        postScan: {
            speaker: entities.eel.name,
            text: "Bzzz...viel Erfolg!"
        }
    },
    {
        id: "4",
        preScan: {
            speaker: entities.owl.name,
            text: "Huch? Was machst du denn hier?"
        },
        postScan: {
            speaker: entities.owl.name,
            text: "Du bist schlauer als du aussiehst."
        }
    },
    {
        id: "5",
        preScan: {
            speaker: entities.mole.name,
            text: "Ist da jemand?"
        },
        postScan: {
            speaker: entities.mole.name,
            text: "Jetzt hab ich Kopfweh..."
        }
    },
    {
        id: "6",
        preScan: {
            speaker: entities.sloth.name,
            text: "Haaaaallooooooo..."
        },
        postScan: {
            speaker: entities.sloth.name,
            text: "Ich schlaaaaf mal weeeiter..."
        }
    },
    {
        id: "7",
        preScan: {
            speaker: entities.raven.name,
            text: "Ich hab dich bereits kommen sehen."
        },
        postScan: {
            speaker: entities.raven.name,
            text: "Deine Zukunft sieht vielversprechend aus."
        }
    },
];

//DIALOGUES -> SCENE + MARKER ID is always the first scene when scanning a marker, 
const dialogues = {
    //ALIEN DIALOGUE
    scene1: [{
            speaker: entities.alien.name,
            text: "Entschuldigung...",
            image: entities.alien.img
        },
        {
            speaker: entities.alien.name,
            text: "Mein Raumschiff ist abgestürzt...",
            image: entities.ufo.img_smoke,
        },
        {
            speaker: entities.alien.name,
            text: "...und einige Raumschiffteile fehlen...",
            image: entities.alien.img
        },
        {
            speaker: entities.alien.name,
            text: "...ich glaube, sie sind im Maisfeld verstreut...",
            image: entities.alien.img
        },
        {
            speaker: entities.alien.name,
            text: "...kannst du mir helfen, sie zu finden?",
            image: entities.alien.img
        },
        {
            speaker: entities.alien.name,
            text: "Und hier ist es ganz schön kalt.",
            image: entities.alien.img
        },
        {
            speaker: entities.alien.name,
            text: "Hast du vielleicht etwas Kleidung für mich?",
            image: entities.alien.img,
            nextScreen: '#customScreen'
        }
    ],
    scene10: [{
            speaker: entities.alien.name,
            text: "Dankeschön!",
            image: entities.alien.img,
        },
        {
            speaker: entities.alien.name,
            text: "Ich hoffe, ich kann bald wieder nach Hause fliegen...",
            image: entities.alien.img,
            nextScreen: '#scannerScreen'
        }
    ],
    scene11: [{
            speaker: entities.alien.name,
            text: "Du hast es wirklich geschafft?",
            image: entities.alien.img,
        },
        {
            speaker: entities.alien.name,
            text: "Mal sehen, ob sich das Raumschiff damit reparieren lässt!",
            image: entities.alien.img,
        },
        {
            speaker: entities.alien.name,
            text: "Hmm...",
            image: entities.ufo.img_smoke,
        },
        {
            speaker: entities.alien.name,
            text: "...gleich hab ich's...",
            image: entities.ufo.img_smoke,
        },
        {
            speaker: entities.alien.name,
            text: "Ja! Es funktioniert wieder!",
            image: entities.ufo.img,
        },
        {
            speaker: entities.alien.name,
            text: "Ich bin dir so dankbar!",
            image: entities.alien.img,
        },
        {
            speaker: entities.alien.name,
            text: "Jetzt kann ich endlich nach Hause fliegen!",
            image: entities.alien.img
        },
        {
            speaker: entities.alien.name,
            text: "Wollen wir noch ein Abschiedsfoto machen?",
            image: entities.alien.img,
            nextScreen: '#scannerScreen'
        }
    ],
    //ARMADILLO DIALOGUE
    scene2: [{
            speaker: entities.armadillo.name,
            text: "Hallo!",
            image: entities.armadillo.img,
        },
        {
            speaker: entities.armadillo.name,
            text: "Suchst du etwas?",
            image: entities.armadillo.img,
        },
        {
            speaker: entities.armadillo.name,
            text: "Ein abgestürztes Raumschiff...",
            image: entities.armadillo.img,
        },
        {
            speaker: entities.armadillo.name,
            text: "Ich habe hier vorhin zwei Räder gefunden!",
            image: entities.armadillo.img,
        },
        {
            speaker: entities.armadillo.name,
            text: "Ich liebe alles, was rund ist!",
            image: entities.armadillo.img,
        },
        {
            speaker: entities.armadillo.name,
            text: "Aber da muss ich erstmal suchen!",
            image: entities.armadillo.img,
        },
        {
            speaker: entities.armadillo.name,
            text: "Hilfst du mir?",
            image: entities.armadillo.img,
            nextScreen: '#memoryScreen'
        },
    ],
    scene20: [{
            speaker: entities.armadillo.name,
            text: "Da sind sie ja!",
            image: parts.wheel.img,
        },
        {
            speaker: entities.armadillo.name,
            text: "Ich schenk dir die Räder!",
            image: entities.armadillo.img,
        },
        {
            speaker: entities.armadillo.name,
            text: "Viel Erfolg!",
            image: entities.armadillo.img,
            nextScreen: '#scannerScreen'
        }
    ],
    //EEL DIALOGUE
    scene3: [{
            speaker: entities.eel.name,
            text: "bzzz... Hallo .. bzzz!",
            image: entities.eel.img,
        },
        {
            speaker: entities.eel.name,
            text: "Kann ich dir helfen?",
            image: entities.eel.img,
        },
        {
            speaker: entities.eel.name,
            text: "Ein UFO-Absturz?",
            image: entities.eel.img,
        },
        {
            speaker: entities.eel.name,
            text: "Ach deswegen ist dieser Akku vom Himmel gefallen.",
            image: entities.eel.img,
        },
        {
            speaker: entities.eel.name,
            text: "Aber er ist leer",
            image: entities.eel.img,
        },
        {
            speaker: entities.eel.name,
            text: "Ich kann ihn aber für dich aufladen... bzzz",
            image: entities.eel.img,
            nextScreen: '#puzzleScreen'
        }
    ],
    scene30: [{
            speaker: entities.eel.name,
            text: "bzzz... Jetzt ist der Akku wieder aufgeladen!",
            image: entities.eel.img,
        },
        {
            speaker: entities.eel.name,
            text: "Hier hast du den Akku... bzzz",
            image: parts.accu.img
        },
        {
            speaker: entities.eel.name,
            text: "Wünsch dem Alien eine gute Reise von mir!",
            image: entities.eel.img,
            nextScreen: '#scannerScreen'
        },
    ],
    //OWL DIALOGUE
    scene4: [{
            speaker: entities.owl.name,
            text: "Wie hast du mich denn gefunden?",
            image: entities.owl.img,
        },
        {
            speaker: entities.owl.name,
            text: "Ich bekomme selten Besuch am Tag.",
            image: entities.owl.img,
        },
        {
            speaker: entities.owl.name,
            text: "Ein Außerirdischer ist hier abgestürzt?",
            image: entities.owl.img,
        },
        {
            speaker: entities.owl.name,
            text: "In unserem Maisfeld?",
            image: entities.owl.img,
        },
        {
            speaker: entities.owl.name,
            text: "Jetzt wo du es sagst...",
            image: entities.owl.img,
        },
        {
            speaker: entities.owl.name,
            text: "...ich hab diese Scheinwerfer gefunden.",
            image: parts.headlight.img,
        },
        {
            speaker: entities.owl.name,
            text: "Aber bevor ich sie dir zeige...",
            image: entities.owl.img,
        },
        {
            speaker: entities.owl.name,
            text: "...würde ich gerne wissen, ob du dich auch...",
            image: entities.owl.img,
        },
        {
            speaker: entities.owl.name,
            text: "...so gut im Weltall auskennst wie ich.",
            image: entities.owl.img,
            nextScreen: '#quizScreen'
        },
    ],
    scene40: [{
            speaker: entities.owl.name,
            text: "Du weißt mehr als ich dachte...",
            image: entities.owl.img,
        },
        {
            speaker: entities.owl.name,
            text: "Hier sind die Scheinwerfer!",
            image: parts.headlight.img,
        },
        {
            speaker: entities.owl.name,
            text: "Und viel Erfolg weiterhin!",
            image: entities.owl.img,
            nextScreen: '#scannerScreen'
        }

    ],
    //MOLE DIALOGUE
    scene5: [{
            speaker: entities.mole.name,
            text: "Hallo? Ist da wer?",
            image: entities.mole.img,
        },
        {
            speaker: entities.mole.name,
            text: "Schau mal, was ich gefunden hab...",
            image: entities.mole.img,
        },
        {
            speaker: entities.mole.name,
            text: "Ein Lenkrad!",
            image: parts.steeringwheel.img,
        },
        {
            speaker: entities.mole.name,
            text: "Du suchst genau so etwas?",
            image: entities.mole.img,
        },
        {
            speaker: entities.mole.name,
            text: "WAAAS EIN RAUMSCHIFF?",
            image: entities.mole.img,
        },
        {
            speaker: entities.mole.name,
            text: "ICH MUSS MICH VERSTECKEN!",
            image: entities.mole.img,
            nextScreen: '#whackamoleScreen'
        },
    ],
    scene50: [{
            speaker: entities.mole.name,
            text: "Aua...",
            image: entities.mole.img,
        },
        {
            speaker: entities.mole.name,
            text: "Hier hast du das Lenkrad!",
            image: parts.steeringwheel.img,
        },
        {
            speaker: entities.mole.name,
            text: "Jetzt hab ich Kopfweh...",
            image: entities.mole.img,
            nextScreen: '#scannerScreen'
        }
    ],
    //SLOTH DIALOGUE
    scene6: [{
            speaker: entities.sloth.name,
            text: "Haaaaallooooooo...",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Meeeeein Naaamee...",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "...ist Freeeeed.",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Wuuuuuusstest duuuu,",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "...daaaaaass Faauuuultieere...",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "...bis zuuu 20 Stuuunden...",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "...am Taaaag schlaaaafen.",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Ich bin gaaaanz müüüüüde.",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Kaaaaannst duuu mir...",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "...vielleeeeicht beeim...",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "...Schaaaafe zääählen heeelfen?",
            image: entities.sloth.img,
            nextScreen: '#sheepScreen'
        }
    ],
    scene60: [{
            speaker: entities.sloth.name,
            text: "Ohhhh, da bin ich wohl eingenickt...",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Hast du alle Schafe zählen können?",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Naaja, ich bin sowieso eingeschlaaaafen.",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Du suchst etwas?",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Ich habe tatsächlich dieses Teil hier gefunden...",
            image: entities.navigation.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Sieht aus wie ein Navigationsgerät.",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Jedenfalls brauche ich es ohnehin nicht.",
            image: entities.sloth.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Hier, du kannst es haben.",
            image: entities.navigation.img,
        },
        {
            speaker: entities.sloth.name,
            text: "Ich schlaaaaf mal weeeiter...",
            image: entities.sloth.img,
            nextScreen: "#scannerScreen"
        }
    ],
    //RAVEN DIALOGUE
    scene7: [{
            speaker: entities.raven.name,
            text: "Ich wusste, dass du kommst.",
            image: entities.raven.img_crystal,
        },
        {
            speaker: entities.raven.name,
            text: "Du suchst etwas, habe ich Recht?",
            image: entities.raven.img_crystal,
        },
        {
            speaker: entities.raven.name,
            text: "Ich helfe dir gerne.",
            image: entities.raven.img_crystal,
        },
        {
            speaker: entities.raven.name,
            text: "Aber du trägst etwas besonderes in dir.",
            image: entities.raven.img_crystal,
        },
        {
            speaker: entities.raven.name,
            text: "Wenn du nichts dagegen hast...",
            image: entities.raven.img_crystal,
        },
        {
            speaker: entities.raven.name,
            text: "...würde ich zuvor gerne in deine Zukunft schauen.",
            image: entities.raven.img_crystal,
        },
        {
            speaker: entities.raven.name,
            text: "Darf ich?",
            image: entities.raven.img_crystal,
            nextScreen: '#tarotScreen'
        }
    ],
    scene70: [{
            speaker: entities.raven.name,
            text: "Interessant.",
            image: entities.raven.img,
        },
        {
            speaker: entities.raven.name,
            text: "Ich hoffe, du kannst auch etwas damit anfangen.",
            image: entities.raven.img,
        },
        {
            speaker: entities.raven.name,
            text: "Nun brauchst du meine Hilfe, richtig?.",
            image: entities.raven.img,
        },
        {
            speaker: entities.raven.name,
            text: "Ein Alien?",
            image: entities.raven.img,
        },
        {
            speaker: entities.raven.name,
            text: "Naja, die Existenz außerirdischen Lebens verwundert mich nicht.",
            image: entities.raven.img,
        },
        {
            speaker: entities.raven.name,
            text: "Aber mit einem Zusammentreffen hätte ich so früh nicht gerechnet.",
            image: entities.raven.img,
        },
        {
            speaker: entities.raven.name,
            text: "Ich habe tatsächlich diesen Antrieb hier gefunden.",
            image: entities.turbine.img,
        },
        {
            speaker: entities.raven.name,
            text: "Ich dachte erst, er stammt von einem Flugzeug.",
            image: entities.raven.img,
        },
        {
            speaker: entities.raven.name,
            text: "Naja, einen Reisenden möchte ich nicht aufhalten.",
            image: entities.raven.img,
        },
        {
            speaker: entities.raven.name,
            text: "Hier hast du den Antrieb!",
            image: entities.turbine.img,
        },
        {
            speaker: entities.raven.name,
            text: "Und nun tu, was du für richtig hältst.",
            image: entities.raven.img,
            nextScreen: "#scannerScreen"
        }
    ]
};