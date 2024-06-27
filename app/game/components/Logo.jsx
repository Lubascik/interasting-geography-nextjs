

import React from 'react'
import Image from 'next/image'
import logoSRB from "/images/logo-srb.svg"
import logoEN from "/images/logo-en.svg"

const Logo = (prop) => {

    const lang = prop.lang

    const logoMap = {
        en: { image: logoEN, alt: "Interesting Geography" },
        sr: { image: logoSRB, alt: "Zanimljiva Geografija" }
    }

    const logo = lang ? logoMap[lang] : logoMap.en;

    return (
        <Image {...prop} src={logo.image} alt={logo.alt} />
    )
}

export default Logo