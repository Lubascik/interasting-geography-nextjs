import './game.global.css'

export async function generateMetadata({ params }, parent) {

    const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    const languages = ["sr", "en"]
    let lang = "en";
    let gameID;
    if (params.game) {
        if (params.game[1]) {
            if (v4.test(params.game[1])) {
                gameID = decodeURI(params.game[1])
            }
        }
        if (params.game[0]) {
            if (v4.test(params.game[0])) {
                gameID = decodeURI(params.game[1])
            } else if (languages.includes(params.game[0])) {
                lang = params.game[0]
            }
        }
    }

    const response = await fetch(process.env.baseURL + "/api" + encodeURI(gameID ? "/" + gameID : ""), {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    const gameName = response.status === 200 ? await response.json() : null
    const description =
    {
        en: "Put your worldly wisdom to the test in 'Interesting Geography'! A captivating online game where you can challenge friends and showcase your geography prowess.",
        sr: "Stavite svoje svetsko znanje na test u igri 'Zanimljiva Geografija'! Učestvujte u izazovu protiv prijatelja i pokažite ko je vladar geografskog znanja u ovoj zabavnoj i uzbudljivoj online igri."
    }

    const images =
    {
        en: "ogImageEN.png",
        sr: "ogImageSR.png"
    }

    const title =
    {
        en: "Interesting Geography",
        sr: "Zanimljiva Geografija"
    }

    return {
        title: title[lang],
        description: description[lang],
        //   keywords: ,
        metadataBase: process.env.baseURL,
        openGraph: {
            description: description[lang],
            url: process.env.baseURL + '/game/' + (lang ? lang + "/" : "") + (gameID ? gameID : ""),
            siteName: gameName ? gameName.lobbyName : "Join your friends!",
            images: [
                {
                    url: images[lang],
                    width: 1200,
                    height: 630,
                }
            ],
            locale: 'en_US',
            type: 'website',
        },
    };
}

export default function RootLayout({ children }) {
    return children
}